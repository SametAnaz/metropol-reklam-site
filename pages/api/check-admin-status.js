import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase/firestore';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Email'i doküman ID'sine çevir
    const emailToDocId = (email) => {
      return email.replace(/[.#$[\]]/g, '_');
    };

    const docId = emailToDocId(session.user.email);
    console.log('Checking admin status for:', session.user.email, 'DocId:', docId);

    // Kullanıcı verisini al
    const userDoc = await getDoc(doc(db, 'users', docId));
    
    if (!userDoc.exists()) {
      return res.status(404).json({ 
        message: 'User not found in Firestore',
        email: session.user.email,
        docId: docId
      });
    }

    const userData = userDoc.data();
    console.log('Current user data:', userData);

    if (req.method === 'GET') {
      // Sadece kontrol et
      return res.status(200).json({
        success: true,
        user: {
          email: userData.email,
          role: userData.role,
          uid: userData.uid,
          isAdmin: userData.role === 'admin'
        },
        session: {
          email: session.user.email,
          role: session.user.role
        }
      });
    }

    if (req.method === 'POST') {
      // Admin rolü ver (sadece development için)
      if (process.env.NODE_ENV !== 'development') {
        return res.status(403).json({ message: 'Only allowed in development' });
      }

      await setDoc(doc(db, 'users', docId), {
        ...userData,
        role: 'admin',
        updatedAt: new Date().toISOString()
      });

      console.log('User role updated to admin');
      
      return res.status(200).json({
        success: true,
        message: 'User role updated to admin',
        user: {
          email: userData.email,
          role: 'admin',
          uid: userData.uid
        }
      });
    }

  } catch (error) {
    console.error('Admin status check error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check admin status',
      details: error.message
    });
  }
} 