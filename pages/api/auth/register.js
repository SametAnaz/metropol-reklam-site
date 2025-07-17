import { PrismaClient } from '@/lib/generated/prisma';
import bcrypt from 'bcryptjs';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Get user's IP address
    const forwarded = req.headers["x-forwarded-for"];
    const ip = forwarded ? forwarded.split(', ')[0] : req.socket.remoteAddress;
    
    // Get user agent info
    const userAgent = req.headers["user-agent"];

    // Create user - inactive by default
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        isActive: false, // Inactive by default until manually approved
        ipAddress: ip,
        userAgent: userAgent,
        // We'll get more detailed device info from userAgent
        deviceInfo: JSON.stringify({
          browser: userAgent?.split('(')[0] || 'Unknown',
          os: userAgent?.split('(')[1]?.split(')')[0] || 'Unknown'
        }),
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
