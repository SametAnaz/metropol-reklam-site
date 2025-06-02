import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query, 
  orderBy,
  getDoc
} from 'firebase/firestore';
import { db } from '../../../lib/firebase/firestore';

export default async function handler(req, res) {
  console.log('API called with method:', req.method);
  
  try {
    const session = await getServerSession(req, res, authOptions);
    console.log('Session:', session);
    
    // Session kontrolü
    if (!session || !session.user) {
      console.log('No session or user found');
      return res.status(401).json({ message: 'Giriş gerekli' });
    }
    
    // Admin yetkisi kontrolü
    if (session.user.role !== 'admin') {
      console.log('User role:', session.user.role);
      return res.status(401).json({ message: 'Admin yetkisi gerekli' });
    }

    const { method } = req;

    switch (method) {
      case 'GET':
        return await handleGet(req, res);
      case 'PUT':
        return await handlePut(req, res, session);
      case 'DELETE':
        return await handleDelete(req, res, session);
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
}

// Kullanıcıları listeleme
async function handleGet(req, res) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const users = [];
    snapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Kullanıcılar yüklenirken hata oluştu' });
  }
}

// Kullanıcı güncelleme (sadece hesap durumu)
async function handlePut(req, res, session) {
  console.log('handlePut called with session:', session.user.email);
  const { userId, updates } = req.body;
  console.log('Update request:', { userId, updates });

  if (!userId) {
    return res.status(400).json({ message: 'Kullanıcı ID gerekli' });
  }

  try {
    // Session'dan user ID'yi al (uid veya id olabilir)
    const sessionUserId = session.user.uid || session.user.id;
    console.log('Session user ID:', sessionUserId);
    
    // Kendini güncellemeyi engelle - Hem document ID hem de UID kontrol et
    if (userId === sessionUserId) {
      return res.status(400).json({ message: 'Kendi hesabınızı güncelleyemezsiniz' });
    }

    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    const userData = userDoc.data();
    console.log('User data:', userData);

    // Session user'ın UID'si ile target user'ın UID'sini de kontrol et
    if (userData.uid === sessionUserId) {
      return res.status(400).json({ message: 'Kendi hesabınızı güncelleyemezsiniz' });
    }

    // Admin kullanıcıları güncellenemez
    if (userData.role === 'admin') {
      return res.status(403).json({ message: 'Admin kullanıcıları güncellenemez' });
    }

    // Sadece hesap durumu güncellenebilir
    const allowedUpdates = {
      accountStatus: updates.accountStatus,
      updatedAt: new Date(),
      updatedBy: session.user.email
    };

    // Sadece hesap durumu güncellenmişse işlem yap
    if (!updates.accountStatus) {
      return res.status(400).json({ message: 'Geçerli bir hesap durumu belirtilmeli' });
    }

    // Geçerli hesap durumları
    const validStatuses = ['active', 'suspended', 'banned'];
    if (!validStatuses.includes(updates.accountStatus)) {
      return res.status(400).json({ message: 'Geçersiz hesap durumu' });
    }

    console.log('Updating user with:', allowedUpdates);
    await updateDoc(userRef, allowedUpdates);

    return res.status(200).json({ 
      message: 'Kullanıcı hesap durumu başarıyla güncellendi',
      updatedFields: allowedUpdates
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Kullanıcı güncellenirken hata oluştu' });
  }
}

// Kullanıcı silme
async function handleDelete(req, res, session) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'Kullanıcı ID gerekli' });
  }

  try {
    // Session'dan user ID'yi al (uid veya id olabilir)
    const sessionUserId = session.user.uid || session.user.id;
    
    // Kendini silmeyi engelle - Hem document ID hem de UID kontrol et
    if (userId === sessionUserId) {
      return res.status(400).json({ message: 'Kendi hesabınızı silemezsiniz' });
    }

    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    const userData = userDoc.data();

    // Session user'ın UID'si ile target user'ın UID'sini de kontrol et
    if (userData.uid === sessionUserId) {
      return res.status(400).json({ message: 'Kendi hesabınızı silemezsiniz' });
    }

    // Admin kullanıcıları silinemez
    if (userData.role === 'admin') {
      return res.status(403).json({ message: 'Admin kullanıcıları silinemez' });
    }

    await deleteDoc(userRef);

    return res.status(200).json({ 
      message: 'Kullanıcı başarıyla silindi',
      deletedUser: { id: userId, email: userData.email }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Kullanıcı silinirken hata oluştu' });
  }
} 