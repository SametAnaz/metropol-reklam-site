import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase/firebase';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // Only include Google provider if credentials are properly configured
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && 
        process.env.GOOGLE_CLIENT_ID !== '481863979305-your_google_client_id.apps.googleusercontent.com' ? 
      [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })] : []),
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
      id: 'customer-credentials',
      name: 'Customer Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" }
      },
      async authorize(credentials) {
        console.log('NextAuth authorize called with:', { 
          email: credentials?.email, 
          action: credentials?.action 
        });

        if (!credentials?.email || !credentials?.password) {
          console.error('Missing email or password');
          throw new Error('Email ve şifre gerekli');
        }

        try {
          let userCredential;
          
          if (credentials.action === 'signup') {
            console.log('Attempting to create user...');
            userCredential = await createUserWithEmailAndPassword(
              auth,
              credentials.email,
              credentials.password
            );
            console.log('User created successfully');
          } else {
            console.log('Attempting to sign in user...');
            userCredential = await signInWithEmailAndPassword(
              auth,
              credentials.email,
              credentials.password
            );
            console.log('User signed in successfully');
          }

          if (userCredential.user) {
            const user = {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              name: userCredential.user.displayName || credentials.email.split('@')[0],
              role: 'customer',
            };
            console.log('Returning user:', user);
            return user;
          }
          
          console.error('No user in credential');
          return null;
        } catch (error) {
          console.error('Firebase auth error:', error);
          
          // Firebase error codes'larını daha iyi handle edelim
          if (error.code) {
            throw new Error(error.code);
          }
          
          throw new Error(error.message || 'Authentication failed');
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
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
        session.user.role = token.role || 'customer'; // Default customer role
      }
      return session;
    }
  },
  debug: true, // Development debug modu
};

export default NextAuth(authOptions); 