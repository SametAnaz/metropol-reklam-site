import { auth } from './firebase';
import { db } from './firestore';
import { collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Kullanıcı rollerini tanımlayalım
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// Email'i doküman ID'sine çevir
const emailToDocId = (email) => {
  return email.replace(/[.#$[\]]/g, '_');
};

// Yeni kullanıcı kaydı (otomatik olarak USER rolü atanır)
export const registerUser = async (email, password) => {
  try {
    // 1. Önce Firebase Authentication'da kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Email'i doküman ID'si olarak kullan
    const docId = emailToDocId(email);

    // 2. Sonra Firestore'da users koleksiyonuna kullanıcı bilgilerini kaydet
    const userDoc = {
      uid: user.uid,
      email: user.email,
      role: USER_ROLES.USER, // Varsayılan rol
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Email'i ID olarak kullanarak dokümanı oluştur
    await setDoc(doc(db, 'users', docId), userDoc);

    return { 
      success: true, 
      user: {
        ...user,
        ...userDoc,
        createdAt: new Date(), // Client tarafında kullanmak için
        updatedAt: new Date()
      }
    };
  } catch (error) {
    console.error('Kullanıcı kaydı hatası:', error);
    return { success: false, error: error.message };
  }
};

// Kullanıcı girişi (rol kontrolü ile)
export const loginUser = async (email, password) => {
  try {
    // 1. Firebase Authentication ile giriş yap
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Email'i doküman ID'si olarak kullan
    const docId = emailToDocId(email);

    // 2. Firestore'dan kullanıcı rolünü ve ek bilgileri al
    const userDocRef = doc(db, 'users', docId);
    const userDoc = await getDoc(userDocRef);
    
    console.log('Firestore user doc:', userDoc.data()); // Debug için

    if (!userDoc.exists()) {
      console.log('User document does not exist, creating...'); // Debug için
      // Eğer Firestore'da kullanıcı yoksa, varsayılan bilgilerle oluştur
      const defaultUserData = {
        uid: user.uid,
        email: user.email,
        role: USER_ROLES.USER,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(userDocRef, defaultUserData);
      
      return {
        success: true,
        user: {
          ...user,
          ...defaultUserData,
          createdAt: new Date(), // Client tarafında kullanmak için
          updatedAt: new Date()
        }
      };
    }

    const userData = userDoc.data();
    
    return { 
      success: true, 
      user: {
        ...user,
        ...userData,
        createdAt: userData.createdAt?.toDate(), // Timestamp'i Date'e çevir
        updatedAt: userData.updatedAt?.toDate()
      }
    };
  } catch (error) {
    console.error('Giriş hatası:', error);
    return { success: false, error: error.message };
  }
};

// Kullanıcı çıkışı
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Çıkış hatası:', error);
    return { success: false, error: error.message };
  }
};

// Kullanıcı rolünü kontrol et
export const getUserRole = async (email) => {
  try {
    if (!email) {
      console.log('No email provided'); // Debug için
      return null;
    }

    const docId = emailToDocId(email);
    const userDocRef = doc(db, 'users', docId);
    const userDoc = await getDoc(userDocRef);
    
    console.log('User document data:', userDoc.data()); // Debug için

    if (!userDoc.exists()) {
      console.log('User document does not exist'); // Debug için
      return null;
    }

    return userDoc.data().role;
  } catch (error) {
    console.error('Rol kontrolü hatası:', error);
    return null;
  }
};

// Kullanıcının admin olup olmadığını kontrol et
export const isAdmin = async (email) => {
  try {
    if (!email) {
      console.log('No email provided for admin check'); // Debug için
      return false;
    }

    const docId = emailToDocId(email);
    const userDocRef = doc(db, 'users', docId);
    const userDoc = await getDoc(userDocRef);
    
    console.log('Admin check document data:', userDoc.data()); // Debug için

    if (!userDoc.exists()) {
      console.log('User document does not exist for admin check'); // Debug için
      return false;
    }

    const isUserAdmin = userDoc.data().role === USER_ROLES.ADMIN;
    console.log('Is user admin?', isUserAdmin); // Debug için

    return isUserAdmin;
  } catch (error) {
    console.error('Admin kontrolü hatası:', error);
    return false;
  }
}; 