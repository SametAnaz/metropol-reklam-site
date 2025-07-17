import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID required' });
    }
    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        accountStatus: true,
        createdAt: true,
        emailVerified: true,
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only allow active users to access data
    if (user.id !== session.user.id && !session.user.isActive) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get user's additional data
    const userData = {
      ...user,
      subscriptions: [],  // Add subscriptions when implemented
      notifications: [],  // Add notifications when implemented
      lastActivity: new Date(),
    };

    // Update user's last activity
    await prisma.user.update({
      where: { id: userId },
      data: { updatedAt: new Date() }
    });

    // Return sanitized user data
    return res.status(200).json({
      success: true,
      data: {
        ...userData,
      }
    });

  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cleanup user data'
    });
  }
} 