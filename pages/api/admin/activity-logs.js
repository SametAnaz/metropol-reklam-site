import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user.isActive) {
      return res.status(401).json({ message: 'Yetkisiz erişim' });
    }

    // Get user ID from query params if provided
    const { userId } = req.query;
    
    // In a real application, you would fetch actual activity logs from your database
    // This is a placeholder for demonstration purposes
    
    // Sample activity data - in a real app this would come from the database
    const activities = [
      { 
        id: 1, 
        userId: 1,
        userName: 'Samet Anaz',
        userEmail: 'sametanax@gmail.com',
        action: 'login', 
        description: 'Sisteme giriş yapıldı', 
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        ipAddress: '192.168.1.1',
        deviceInfo: 'Chrome / Windows 10'
      },
      { 
        id: 2, 
        userId: 1,
        userName: 'Samet Anaz',
        userEmail: 'sametanax@gmail.com',
        action: 'update_profile', 
        description: 'Profil bilgileri güncellendi', 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        ipAddress: '192.168.1.1',
        deviceInfo: 'Chrome / Windows 10'
      },
      { 
        id: 3, 
        userId: 2,
        userName: 'Nurullah Anaz',
        userEmail: 'metropolreklam@hotmail.com',
        action: 'gallery_upload', 
        description: 'Yeni galeri resmi yüklendi', 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        ipAddress: '192.168.1.1',
        deviceInfo: 'Chrome / Windows 10'
      },
      { 
        id: 4, 
        userId: 3,
        userName: 'Test User',
        userEmail: 'aaaa@aaa',
        action: 'change_password', 
        description: 'Şifre değiştirildi', 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        ipAddress: '192.168.1.1',
        deviceInfo: 'Chrome / Windows 10'
      },
      { 
        id: 5, 
        userId: 2,
        userName: 'Nurullah Anaz',
        userEmail: 'metropolreklam@hotmail.com',
        action: 'login', 
        description: 'Sisteme giriş yapıldı', 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        ipAddress: '192.168.1.2',
        deviceInfo: 'Safari / macOS'
      },
    ];

    // Filter by user ID if provided
    let result = activities;
    if (userId && userId !== 'all') {
      result = activities.filter(activity => activity.userId === parseInt(userId));
    }

    // Sort by timestamp (newest first)
    result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return res.status(200).json(result);

  } catch (error) {
    console.error('Error fetching activity logs:', error);
    return res.status(500).json({ message: 'Aktivite günlükleri alınamadı' });
  }
}
