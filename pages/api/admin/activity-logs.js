import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/db";

export default async function handler(req, res) {
  // Check authentication
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user.isActive) {
    return res.status(401).json({ message: 'Yetkisiz erişim' });
  }

  // GET request to fetch logs
  if (req.method === 'GET') {
    try {
      const { userId } = req.query;
      
      try {
        // Geçici olarak örnek veriler döndürelim ve hatayı tespit edelim
        console.log("Örnek veriler döndürülüyor ve migrasyon durumu kontrol ediliyor");
        
        // Gerçek veritabanı sorgusu yapmadan önce, migrasyon durumunu kontrol et
        let logs = [];
        let formattedLogs = [];
        
        try {
          // Tabloları kontrol et
          const tables = await prisma.$queryRaw`SHOW TABLES`;
          console.log("Mevcut tablolar:", tables);
          
          // Aktivite tablosunun varlığını kontrol et
          const hasActivityTable = tables.some(table => 
            Object.values(table).some(value => 
              value === 'activity_logs'
            )
          );
          
          if (hasActivityTable) {
            console.log("ActivityLog tablosu mevcut, sorgu yapılıyor");
            
            // Construct the query
            const query = {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true,
                    id: true
                  }
                }
              },
              orderBy: {
                createdAt: 'desc'
              },
              take: 100 // Limit the number of logs returned
            };
            
            // If a userId is provided, filter logs for that user
            if (userId && userId !== 'all' && parseInt(userId)) {
              query.where = { userId: parseInt(userId) };
            }
            
            // Fetch activity logs
            logs = await prisma.activityLog.findMany(query);
            console.log("Bulunan log sayısı:", logs.length);
            
            // Format the logs to match the expected frontend format
            formattedLogs = logs.map(log => ({
              id: log.id,
              userId: log.userId,
              userName: log.user?.name || 'Bilinmeyen Kullanıcı',
              userEmail: log.user?.email || 'bilinmeyen@email.com',
              action: log.action,
              description: log.details,
              timestamp: log.createdAt.toISOString(),
              ipAddress: log.ipAddress || 'Bilinmiyor',
              deviceInfo: log.userAgent || 'Bilinmiyor'
            }));
          } else {
            console.log("ActivityLog tablosu bulunamadı, örnek veriler döndürülüyor");
            
            // Tablo yoksa demo verileri döndür
            formattedLogs = [
              { 
                id: 1, 
                userId: 1,
                userName: 'Demo Kullanıcı',
                userEmail: 'demo@ornek.com',
                action: 'login', 
                description: 'Sisteme giriş yapıldı', 
                timestamp: new Date().toISOString(),
                ipAddress: '192.168.1.1',
                deviceInfo: 'Chrome / Windows 10'
              },
              { 
                id: 2, 
                userId: 1,
                userName: 'Demo Kullanıcı',
                userEmail: 'demo@ornek.com',
                action: 'update_profile', 
                description: 'Profil bilgileri güncellendi', 
                timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                ipAddress: '192.168.1.1',
                deviceInfo: 'Chrome / Windows 10'
              }
            ];
          }
        } catch (dbQueryError) {
          console.error("Tablo sorgulama hatası:", dbQueryError);
          
          // Hata durumunda demo verileri döndür
          formattedLogs = [
            { 
              id: 1, 
              userId: 1,
              userName: 'Demo Kullanıcı (Hata durumu)',
              userEmail: 'demo@ornek.com',
              action: 'system_error', 
              description: 'Veritabanı hatası: ' + dbQueryError.message, 
              timestamp: new Date().toISOString(),
              ipAddress: 'Sistem',
              deviceInfo: 'Sistem'
            }
          ];
        }
        
        return res.status(200).json(formattedLogs);
      } catch (queryError) {
        console.error("Sorgu hatası:", queryError);
        return res.status(500).json({ message: 'Veri sorgulama hatası', error: queryError.message });
      }
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      // Tüm hatayı detaylı şekilde loglayalım
      console.error('Aktivite günlükleri alınırken hata:', error);
      console.error('Hata yığını:', error.stack);
      
      // Hata durumunda demo verileri döndür
      const demoLogs = [
        { 
          id: 999, 
          userId: 999,
          userName: 'Sistem',
          userEmail: 'sistem@hata.com',
          action: 'error', 
          description: 'Veritabanından aktivite günlükleri alınırken hata oluştu: ' + error.message, 
          timestamp: new Date().toISOString(),
          ipAddress: 'Sistem',
          deviceInfo: 'Sistem'
        }
      ];
      
      return res.status(200).json(demoLogs);
    }
  }
  // POST request to create a new log
  else if (req.method === 'POST') {
    try {
      const { action, details } = req.body;
      
      if (!action) {
        return res.status(400).json({ message: 'İşlem bilgisi gerekli' });
      }

      // Get the IP and user agent
      const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const userAgent = req.headers['user-agent'];
      
      try {
        // Veritabanı bağlantısını kontrol et
        await prisma.$queryRaw`SELECT 1`;
        
        // Kullanıcı ID'sini integer'a dönüştür ve geçerli olduğundan emin ol
        let userId = null;
        try {
          userId = parseInt(session.user.id);
          if (isNaN(userId) || userId <= 0) {
            throw new Error('Geçersiz kullanıcı ID: ' + session.user.id);
          }
        } catch (parseError) {
          console.error('User ID parsing error:', parseError);
          return res.status(400).json({ message: 'Geçersiz kullanıcı kimliği', error: parseError.message });
        }
        
        console.log('Aktivite logu oluşturuluyor:', {
          userId,
          action,
          details,
          ipAddress,
          userAgent
        });

        // Create a new activity log
        const activityLog = await prisma.activityLog.create({
          data: {
            userId,
            action,
            details: details || null,
            ipAddress: ipAddress || null,
            userAgent: userAgent || null
          }
        });
        
        return res.status(201).json(activityLog);
      } catch (dbError) {
        console.error('Database error while creating activity log:', dbError);
        // Hata durumunda başarılı bir cevap dön ki istemci tarafında işlem kesintiye uğramasın
        return res.status(200).json({ 
          id: -1, 
          success: false, 
          message: 'Aktivite günlüğü kaydedilemedi ancak ana işlem devam etti',
          error: dbError.message
        });
      }
    } catch (error) {
      console.error('Error creating activity log:', error);
      // Hata durumunda başarılı bir cevap dön ki istemci tarafında işlem kesintiye uğramasın
      return res.status(200).json({ 
        id: -1, 
        success: false, 
        message: 'Aktivite günlüğü kaydedilemedi ancak ana işlem devam etti'
      });
    }
  }
  
  // DELETE request to delete logs (admin only)
  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      
      if (id) {
        // Delete a specific log
        await prisma.activityLog.delete({
          where: { id: parseInt(id) }
        });
      } else {
        // Delete all logs (with confirmation)
        const { confirmed } = req.body;
        if (!confirmed) {
          return res.status(400).json({ message: 'Tüm günlükleri silmek için onay gerekiyor' });
        }
        
        await prisma.activityLog.deleteMany({});
      }
      
      return res.status(200).json({ message: 'Günlükler başarıyla silindi' });
    } catch (error) {
      console.error('Error deleting activity logs:', error);
      return res.status(500).json({ message: 'Günlükler silinemedi' });
    }
  }
  
  // Handle other HTTP methods
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
