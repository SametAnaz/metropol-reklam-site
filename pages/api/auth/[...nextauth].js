import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase/firestore';

const ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// Email'i doküman ID'sine çevir
const emailToDocId = (email) => {
  return email.replace(/[.#$[\]]/g, '_');
};

export default NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      id: 'admin-credentials',
      name: 'Admin Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          if (userCredential.user) {
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              name: userCredential.user.displayName,
              role: 'admin',
            };
          }
          return null;
        } catch (error) {
          console.error("Admin authentication error:", error);
          return null;
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" }
      },
      async authorize(credentials) {
        try {
          console.log('NextAuth authorize called with:', {
            email: credentials?.email,
            action: credentials?.action
          });

          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email ve şifre gerekli');
          }

          let userCredential;
          const docId = emailToDocId(credentials.email);

          if (credentials.action === 'signup') {
            console.log('Creating new user...');
            
            try {
              // Kullanıcıyı Firebase Auth'da oluştur
              userCredential = await createUserWithEmailAndPassword(
                auth,
                credentials.email,
                credentials.password
              );

              // Firestore'a kullanıcı bilgilerini kaydet
              const userData = {
                uid: userCredential.user.uid,
                email: credentials.email,
                role: ROLES.USER,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
              };

              await setDoc(doc(db, 'users', docId), userData);
              console.log('User created successfully');

              return {
                id: userCredential.user.uid,
                email: credentials.email,
                name: credentials.email.split('@')[0],
                role: ROLES.USER
              };
            } catch (firebaseError) {
              console.error('Firebase signup error:', firebaseError);
              
              // Firebase hatalarını daha iyi handle edelim
              if (firebaseError.code === 'auth/email-already-in-use') {
                throw new Error('Bu email adresi zaten kullanımda');
              } else if (firebaseError.code === 'auth/weak-password') {
                throw new Error('Şifre çok zayıf. En az 6 karakter olmalıdır');
              } else if (firebaseError.code === 'auth/invalid-email') {
                throw new Error('Geçersiz email adresi');
              } else {
                throw new Error('Kayıt sırasında bir hata oluştu: ' + firebaseError.message);
              }
            }

          } else {
            console.log('Signing in user...');
            
            try {
              // Firebase ile giriş yap
              userCredential = await signInWithEmailAndPassword(
                auth,
                credentials.email,
                credentials.password
              );

              // Firestore'dan kullanıcı bilgilerini al
              const userDoc = await getDoc(doc(db, 'users', docId));
              
              let userRole = ROLES.USER;
              if (userDoc.exists()) {
                userRole = userDoc.data().role || ROLES.USER;
              } else {
                // Firestore'da kullanıcı yoksa oluştur
                const userData = {
                  uid: userCredential.user.uid,
                  email: credentials.email,
                  role: ROLES.USER,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp()
                };
                await setDoc(doc(db, 'users', docId), userData);
              }

              console.log('User signed in successfully with role:', userRole);

              return {
                id: userCredential.user.uid,
                email: credentials.email,
                name: credentials.email.split('@')[0],
                role: userRole
              };
            } catch (firebaseError) {
              console.error('Firebase signin error:', firebaseError);
              
              if (firebaseError.code === 'auth/user-not-found') {
                throw new Error('Bu email ile kayıtlı kullanıcı bulunamadı');
              } else if (firebaseError.code === 'auth/wrong-password') {
                throw new Error('Şifre hatalı');
              } else if (firebaseError.code === 'auth/invalid-email') {
                throw new Error('Geçersiz email adresi');
              } else if (firebaseError.code === 'auth/too-many-requests') {
                throw new Error('Çok fazla deneme. Lütfen daha sonra tekrar deneyin');
              } else {
                throw new Error('Giriş sırasında bir hata oluştu: ' + firebaseError.message);
              }
            }
          }
        } catch (error) {
          console.error('Authorization error:', error);
          return null; // NextAuth expects null on failure
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Google ile giriş yapan kullanıcılar customer rolü alsın
      if (account.provider === 'google') {
        user.role = 'customer';
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      // Google ile giriş yapan kullanıcılar için customer rolü ata
      if (account?.provider === 'google' && !token.role) {
        token.role = 'customer';
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development',
}); 