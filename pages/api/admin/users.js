import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from '@prisma/client';

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

const prisma = new PrismaClient();

// Kullanıcıları listeleme
async function handleGet(req, res) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        emailVerified: true,
        createdAt: true,
        accountStatus: true
      }
    });
    
    return res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Kullanıcılar yüklenirken hata oluştu' });
  }
}

// Kullanıcı güncelleme
async function handlePut(req, res, session) {
  console.log('handlePut called with session:', session.user.email);
  const { userId, updates } = req.body;
  console.log('Update request:', { userId, updates });

  if (!userId) {
    return res.status(400).json({ message: 'Kullanıcı ID gerekli' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    // Kendini güncellemeyi engelle
    if (user.id === session.user.id) {
      return res.status(400).json({ message: 'Kendi hesabınızı güncelleyemezsiniz' });
    }

    // Admin kullanıcıları güncellenemez
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Admin kullanıcıları güncellenemez' });
    }

    // Sadece hesap durumu güncellenebilir
    if (!updates.accountStatus) {
      return res.status(400).json({ message: 'Geçerli bir hesap durumu belirtilmeli' });
    }

    // Geçerli hesap durumları
    const validStatuses = ['active', 'suspended', 'banned'];
    if (!validStatuses.includes(updates.accountStatus)) {
      return res.status(400).json({ message: 'Geçersiz hesap durumu' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        accountStatus: updates.accountStatus,
        updatedAt: new Date()
      }
    });

    return res.status(200).json({ 
      message: 'Kullanıcı hesap durumu başarıyla güncellendi',
      updatedFields: {
        accountStatus: updatedUser.accountStatus,
        updatedAt: updatedUser.updatedAt
      }
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
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    // Kendini silmeyi engelle
    if (user.id === session.user.id) {
      return res.status(400).json({ message: 'Kendi hesabınızı silemezsiniz' });
    }

    // Admin kullanıcıları silinemez
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Admin kullanıcıları silinemez' });
    }

    await prisma.user.delete({
      where: { id: userId }
    });

    return res.status(200).json({ 
      message: 'Kullanıcı başarıyla silindi',
      deletedUser: { id: userId, email: user.email }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Kullanıcı silinirken hata oluştu' });
  }
} 