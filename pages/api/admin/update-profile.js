import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/db";

export default async function handler(req, res) {
  // Only accept PUT requests
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user.isActive) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { name, email, title, bio } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        email,
        title,
        bio,
      },
    });

    // Return the updated user (excluding sensitive fields)
    const { password, ...userWithoutPassword } = updatedUser;
    return res.status(200).json({ 
      message: 'Profile updated successfully',
      user: userWithoutPassword
    });
    
  } catch (error) {
    console.error("Profile update API error:", error);
    
    // Handle potential errors
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    return res.status(500).json({ message: 'Server error' });
  }
}
