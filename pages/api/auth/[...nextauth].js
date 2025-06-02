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

// Kullanıcı bilgilerini topla
const collectUserInfo = async (req) => {
  try {
    // IP adresini al - Multiple sources for better accuracy
    const getClientIP = (req) => {
      const forwarded = req.headers['x-forwarded-for'];
      const real = req.headers['x-real-ip'];
      const clientIP = req.headers['cf-connecting-ip']; // Cloudflare
      const connectionRemote = req.connection?.remoteAddress;
      const socketRemote = req.socket?.remoteAddress;
      
      if (forwarded) {
        // x-forwarded-for can contain multiple IPs, take the first one
        return forwarded.split(',')[0].trim();
      }
      
      return real || clientIP || connectionRemote || socketRemote || 'unknown';
    };
    
    const ip = getClientIP(req);
    console.log('Detected IP:', ip);
    
    // User-Agent'ı parse et
    const userAgent = req.headers['user-agent'] || '';
    console.log('User Agent:', userAgent);
    
    // Device detection
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android.*Tablet|Kindle|Silk/i.test(userAgent);
    const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
    
    // Browser detection
    let browser = 'unknown';
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari';
    else if (userAgent.includes('Edg')) browser = 'Edge';
    else if (userAgent.includes('OPR') || userAgent.includes('Opera')) browser = 'Opera';
    
    // OS detection
    let os = 'unknown';
    if (userAgent.includes('Windows NT')) os = 'Windows';
    else if (userAgent.includes('Mac OS X')) os = 'macOS';
    else if (userAgent.includes('Linux') && !userAgent.includes('Android')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';
    
    console.log('Device Info:', { type: deviceType, browser, os });
    
    // Konum bilgisi için IP-based geolocation - Multiple attempts
    let locationData = {
      country: 'unknown',
      city: 'unknown',
      region: 'unknown'
    };

    // Skip geolocation for local IPs
    const isLocalIP = ip === 'unknown' || 
                      ip.startsWith('127.') || 
                      ip.startsWith('192.168.') || 
                      ip.startsWith('10.') || 
                      ip.includes('::1') ||
                      ip === 'localhost';

    if (!isLocalIP) {
      try {
        console.log('Attempting geolocation for IP:', ip);
        
        // Primary geolocation service
        const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city,status,message`, {
          timeout: 5000
        });
        
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          console.log('Geolocation response:', geoData);
          
          if (geoData.status === 'success') {
            locationData = {
              country: geoData.country || 'unknown',
              city: geoData.city || 'unknown',
              region: geoData.regionName || 'unknown'
            };
            console.log('Geolocation successful:', locationData);
          } else {
            console.warn('Geolocation failed:', geoData.message);
          }
        } else {
          console.warn('Geolocation API request failed:', geoResponse.status);
        }
      } catch (geoError) {
        console.warn('Geolocation error:', geoError.message);
        
        // Fallback to a different service
        try {
          console.log('Trying fallback geolocation service...');
          const fallbackResponse = await fetch(`https://ipapi.co/${ip}/json/`, {
            timeout: 3000
          });
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            console.log('Fallback geolocation response:', fallbackData);
            
            if (fallbackData.country_name) {
              locationData = {
                country: fallbackData.country_name || 'unknown',
                city: fallbackData.city || 'unknown',
                region: fallbackData.region || 'unknown'
              };
              console.log('Fallback geolocation successful:', locationData);
            }
          }
        } catch (fallbackError) {
          console.warn('Fallback geolocation also failed:', fallbackError.message);
        }
      }
    } else {
      console.log('Skipping geolocation for local IP:', ip);
      // Development environment için daha anlamlı bilgiler
      locationData = {
        country: 'TR', // Türkiye (varsayılan olarak)
        city: 'Local Development',
        region: 'Development Environment'
      };
    }

    const collectedInfo = {
      registrationInfo: {
        ip: ip,
        deviceInfo: {
          type: deviceType,
          browser: browser,
          os: os,
          userAgent: userAgent
        },
        location: locationData,
        timestamp: new Date().toISOString(),
        headers: {
          acceptLanguage: req.headers['accept-language'] || '',
          acceptEncoding: req.headers['accept-encoding'] || '',
          host: req.headers.host || '',
          referer: req.headers.referer || ''
        }
      }
    };

    console.log('Final collected user info:', collectedInfo);
    return collectedInfo;

  } catch (error) {
    console.error('Error collecting user info:', error);
    return {
      registrationInfo: {
        ip: 'unknown',
        deviceInfo: { type: 'unknown', browser: 'unknown', os: 'unknown', userAgent: '' },
        location: { country: 'unknown', city: 'unknown', region: 'unknown' },
        timestamp: new Date().toISOString(),
        headers: {}
      }
    };
  }
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
          // Firebase auth ile giriş yap
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          if (userCredential.user) {
            // Firestore'dan admin role kontrolü yap
            const docId = emailToDocId(credentials.email);
            const userDoc = await getDoc(doc(db, 'users', docId));
            
            let userRole = ROLES.USER;
            if (userDoc.exists()) {
              const userData = userDoc.data();
              userRole = userData.role || ROLES.USER;
              console.log('Admin login - user role from Firestore:', userRole);
            } else {
              console.log('Admin login - user not found in Firestore');
              return null;
            }

            // Admin role kontrolü
            if (userRole !== ROLES.ADMIN) {
              console.log('Admin login failed - insufficient privileges:', userRole);
              return null;
            }

            console.log('Admin login successful for:', credentials.email);
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              name: userCredential.user.displayName || credentials.email.split('@')[0],
              role: ROLES.ADMIN,
              uid: userCredential.user.uid,
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
        action: { label: "Action", type: "text" },
        acceptTerms: { label: "Accept Terms", type: "checkbox" }
      },
      async authorize(credentials, req) {
        try {
        console.log('NextAuth authorize called with:', { 
          email: credentials?.email, 
            action: credentials?.action,
            acceptTerms: credentials?.acceptTerms
        });

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email ve şifre gerekli');
        }

          let userCredential;
          const docId = emailToDocId(credentials.email);
          
          if (credentials.action === 'signup') {
            console.log('Creating new user...');
            
            // Kullanıcı sözleşmesi kontrolü
            if (!credentials.acceptTerms || credentials.acceptTerms !== 'true') {
              throw new Error('Kullanıcı sözleşmesini kabul etmeniz gerekiyor');
            }

            // Kullanıcı bilgilerini topla
            console.log('Collecting user info...');
            const userInfoData = await collectUserInfo(req);
            console.log('User info collected:', userInfoData);
            
            try {
              // Kullanıcıyı Firebase Auth'da oluştur
              console.log('Creating Firebase Auth user...');
            userCredential = await createUserWithEmailAndPassword(
              auth,
              credentials.email,
              credentials.password
            );
              console.log('Firebase Auth user created:', userCredential.user.uid);

              // Firestore'a kullanıcı bilgilerini kaydet (geliştirilmiş)
              const userData = {
                uid: userCredential.user.uid,
                email: credentials.email,
                role: ROLES.USER,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                // Güvenlik ve izleme bilgileri
                ...userInfoData,
                // Login history için array
                loginHistory: [],
                // Hesap durumu
                accountStatus: 'active',
                termsAccepted: true,
                termsAcceptedAt: new Date().toISOString()
              };

              console.log('Attempting to save user data to Firestore...');
              console.log('Document ID:', docId);
              console.log('User data:', userData);
              
              await setDoc(doc(db, 'users', docId), userData);
              console.log('User created successfully with security info');

              return {
                id: userCredential.user.uid,
                email: credentials.email,
                name: credentials.email.split('@')[0],
                role: ROLES.USER
              };
            } catch (firebaseError) {
              console.error('Firebase signup error:', firebaseError);
              console.error('Error code:', firebaseError.code);
              console.error('Error message:', firebaseError.message);
              
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
                const userData = userDoc.data();
                userRole = userData.role || ROLES.USER;
                
                console.log('User found in Firestore, updating login history...');
                
                // Login history'ye yeni giriş ekle
                const loginInfo = await collectUserInfo(req);
                console.log('Login info collected:', loginInfo);
                
                // Optimize edilmiş login entry - sadece değişen bilgileri sakla
                const baseDeviceInfo = userData.registrationInfo?.deviceInfo;
                const baseLocation = userData.registrationInfo?.location;
                
                const newLoginEntry = {
                  timestamp: new Date().toISOString(),
                  ip: loginInfo.registrationInfo.ip,
                  // Sadece değişen device bilgilerini sakla
                  ...(baseDeviceInfo?.userAgent !== loginInfo.registrationInfo.deviceInfo.userAgent && {
                    userAgent: loginInfo.registrationInfo.deviceInfo.userAgent
                  }),
                  ...(baseDeviceInfo?.browser !== loginInfo.registrationInfo.deviceInfo.browser && {
                    browser: loginInfo.registrationInfo.deviceInfo.browser
                  }),
                  ...(baseDeviceInfo?.os !== loginInfo.registrationInfo.deviceInfo.os && {
                    os: loginInfo.registrationInfo.deviceInfo.os
                  }),
                  ...(baseDeviceInfo?.type !== loginInfo.registrationInfo.deviceInfo.type && {
                    deviceType: loginInfo.registrationInfo.deviceInfo.type
                  }),
                  // Sadece değişen location bilgilerini sakla
                  ...(baseLocation?.country !== loginInfo.registrationInfo.location.country && {
                    country: loginInfo.registrationInfo.location.country
                  }),
                  ...(baseLocation?.city !== loginInfo.registrationInfo.location.city && {
                    city: loginInfo.registrationInfo.location.city
                  }),
                  ...(baseLocation?.region !== loginInfo.registrationInfo.location.region && {
                    region: loginInfo.registrationInfo.location.region
                  }),
                  // Sadece farklı header bilgilerini sakla
                  ...(userData.registrationInfo?.headers?.acceptLanguage !== loginInfo.registrationInfo.headers.acceptLanguage && {
                    language: loginInfo.registrationInfo.headers.acceptLanguage
                  })
                };

                // Login history array'ını güncelle (son 10 girişi sakla)
                const updatedLoginHistory = [
                  newLoginEntry,
                  ...(userData.loginHistory || [])
                ].slice(0, 10);

                console.log('Optimized login entry:', newLoginEntry);
                console.log('Updating login history:', updatedLoginHistory);

                // Firestore'da login history'yi güncelle
                await setDoc(doc(db, 'users', docId), {
                  loginHistory: updatedLoginHistory,
                  lastLoginAt: serverTimestamp(),
                  updatedAt: serverTimestamp()
                }, { merge: true });

                console.log('Login history updated successfully');

              } else {
                console.log('User not found in Firestore, creating document...');
                // Firestore'da kullanıcı yoksa oluştur
                const userInfoData = await collectUserInfo(req);
                const userData = {
                  uid: userCredential.user.uid,
                  email: credentials.email,
                  role: ROLES.USER,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp(),
                  ...userInfoData,
                  loginHistory: [],
                  accountStatus: 'active'
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
          throw error; // Error'u throw et ki frontend'de yakalansın
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback - token:', token, 'user:', user);
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.uid = user.id;
      }
      console.log('JWT callback final token:', token);
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback - session before:', session, 'token:', token);
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.uid = token.uid || token.id;
      }
      console.log('Session callback - final session:', session);
      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development',
}); 