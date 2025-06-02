import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { 
  collection, 
  getDocs, 
  query, 
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../../../lib/firebase/firestore';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  // Admin yetkisi kontrolü
  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ message: 'Yetkisiz erişim' });
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    const usersRef = collection(db, 'users');
    
    // Toplam kullanıcı sayısı
    const allUsersSnapshot = await getDocs(usersRef);
    const totalUsers = allUsersSnapshot.size;

    // Aktif kullanıcılar
    const activeUsersQuery = query(usersRef, where('accountStatus', '==', 'active'));
    const activeUsersSnapshot = await getDocs(activeUsersQuery);
    const activeUsers = activeUsersSnapshot.size;

    // Admin kullanıcılar
    const adminUsersQuery = query(usersRef, where('role', '==', 'admin'));
    const adminUsersSnapshot = await getDocs(adminUsersQuery);
    const adminUsers = adminUsersSnapshot.size;

    // Son 7 günde kayıt olan kullanıcılar
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentUsersQuery = query(
      usersRef, 
      where('createdAt', '>=', sevenDaysAgo),
      orderBy('createdAt', 'desc')
    );
    const recentUsersSnapshot = await getDocs(recentUsersQuery);
    const recentUsers = recentUsersSnapshot.size;

    // Son aktif kullanıcılar (son 24 saat)
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    const recentActiveQuery = query(
      usersRef,
      where('lastLoginAt', '>=', twentyFourHoursAgo),
      orderBy('lastLoginAt', 'desc'),
      limit(10)
    );
    const recentActiveSnapshot = await getDocs(recentActiveQuery);
    
    const recentActiveUsers = [];
    recentActiveSnapshot.forEach((doc) => {
      recentActiveUsers.push({
        id: doc.id,
        email: doc.data().email,
        lastLoginAt: doc.data().lastLoginAt,
        role: doc.data().role
      });
    });

    // Hesap durumu dağılımı
    const accountStatusStats = {};
    allUsersSnapshot.forEach((doc) => {
      const status = doc.data().accountStatus || 'active';
      accountStatusStats[status] = (accountStatusStats[status] || 0) + 1;
    });

    // Rol dağılımı
    const roleStats = {};
    allUsersSnapshot.forEach((doc) => {
      const role = doc.data().role || 'user';
      roleStats[role] = (roleStats[role] || 0) + 1;
    });

    const stats = {
      totalUsers,
      activeUsers,
      adminUsers,
      recentUsers,
      recentActiveCount: recentActiveUsers.length,
      recentActiveUsers,
      accountStatusStats,
      roleStats,
      inactiveUsers: totalUsers - activeUsers,
      userGrowthWeek: recentUsers
    };

    return res.status(200).json({ stats });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return res.status(500).json({ 
      message: 'İstatistikler yüklenirken hata oluştu',
      error: error.message 
    });
  }
} 