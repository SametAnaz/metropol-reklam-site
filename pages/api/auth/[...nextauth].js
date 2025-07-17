import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from '@/lib/generated/prisma';
import bcrypt from 'bcryptjs';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "admin-credentials",
      name: 'Admin Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) {
          throw new Error('No user found with this email');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        // If user is not active, prevent login
        if (!user.isActive) {
          throw new Error('Your account is not active. Please contact the administrator.');
        }
        
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          isActive: user.isActive
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isActive = user.isActive;
        // isActive kullanıcıları admin olarak işaretleyin
        token.isAdmin = user.isActive;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isActive = token.isActive;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // URL kontrolü yaparak güvenli bir şekilde döndür
      try {
        // Tam URL mi yoksa göreceli yol mu kontrol et
        if (url.startsWith('http://') || url.startsWith('https://')) {
          const urlObj = new URL(url);
          return url;
        } else if (url.startsWith('/')) {
          // Göreceli yol ise baseUrl ile birleştir
          return `${baseUrl}${url}`;
        }
        return baseUrl;
      } catch (e) {
        console.error("Redirect error:", e);
        return baseUrl;
      }
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  events: {
    async signOut({ session, token }) {
      return { url: '/' }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);