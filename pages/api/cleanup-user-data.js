import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID required' });
    }

    // Email'i doküman ID'sine çevir
    const emailToDocId = (email) => {
      return email.replace(/[.#$[\]]/g, '_');
    };

    const docId = emailToDocId(userId);
    console.log('Cleaning up user data for:', docId);

    // Kullanıcı verisini al
    const userDoc = await getDoc(doc(db, 'users', docId));
    
    if (!userDoc.exists()) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = userDoc.data();
    const baseRegistrationInfo = userData.registrationInfo;

    // Login history'yi optimize et
    const optimizedLoginHistory = (userData.loginHistory || []).map((entry, index) => {
      if (index === 0) {
        // En son girişi tam olarak sakla (referans için)
        return {
          timestamp: entry.timestamp,
          ip: entry.ip,
          // Sadece base'den farklı olanları sakla
          ...(baseRegistrationInfo?.deviceInfo?.userAgent !== entry.deviceInfo?.userAgent && {
            userAgent: entry.deviceInfo?.userAgent
          }),
          ...(baseRegistrationInfo?.deviceInfo?.browser !== entry.deviceInfo?.browser && {
            browser: entry.deviceInfo?.browser
          }),
          ...(baseRegistrationInfo?.deviceInfo?.os !== entry.deviceInfo?.os && {
            os: entry.deviceInfo?.os
          }),
          ...(baseRegistrationInfo?.deviceInfo?.type !== entry.deviceInfo?.type && {
            deviceType: entry.deviceInfo?.type
          }),
          ...(baseRegistrationInfo?.location?.country !== entry.location?.country && {
            country: entry.location?.country
          }),
          ...(baseRegistrationInfo?.location?.city !== entry.location?.city && {
            city: entry.location?.city
          }),
          ...(baseRegistrationInfo?.location?.region !== entry.location?.region && {
            region: entry.location?.region
          })
        };
      } else {
        // Diğer girişleri minimal tut
        return {
          timestamp: entry.timestamp,
          ip: entry.ip
        };
      }
    }).slice(0, 10); // Son 10 girişi sakla

    // Temizlenmiş veriyi güncelle
    await setDoc(doc(db, 'users', docId), {
      ...userData,
      loginHistory: optimizedLoginHistory,
      updatedAt: new Date()
    });

    console.log('User data cleaned up successfully');
    
    res.status(200).json({
      success: true,
      message: 'User data cleaned up successfully',
      optimizedEntries: optimizedLoginHistory.length,
      dataReduction: `${userData.loginHistory?.length || 0} -> ${optimizedLoginHistory.length}`
    });

  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cleanup user data'
    });
  }
} 