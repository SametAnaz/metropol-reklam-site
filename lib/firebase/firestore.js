import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from './firebase';
import {
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';

// Firestore instance'ını oluştur
const db = getFirestore(app);

// Users koleksiyonunu kontrol et ve yoksa oluştur
const initializeFirestore = async () => {
  try {
    // Users koleksiyonunu kontrol et
    const usersRef = collection(db, 'users');
    await getDocs(usersRef); // Koleksiyon var mı diye kontrol et
    console.log('Firestore users koleksiyonu hazır');
  } catch (error) {
    console.error('Firestore başlatma hatası:', error);
  }
};

// Firestore'u başlat
initializeFirestore();

export { db };

/**
 * Create a new document in the specified collection
 * @param {string} collectionName - The collection name
 * @param {Object} data - The data to add
 * @returns {Promise<string>} - The ID of the created document
 */
export const createDocument = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    const docData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collectionRef, docData);
    return docRef.id;
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Get a document by ID
 * @param {string} collectionName - The collection name
 * @param {string} docId - The document ID
 * @returns {Promise<Object|null>} - The document data or null if not found
 */
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error getting document ${docId} from ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Update a document by ID
 * @param {string} collectionName - The collection name
 * @param {string} docId - The document ID
 * @param {Object} data - The data to update
 * @returns {Promise<boolean>} - True if updated successfully
 */
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const updateData = {
      ...data,
      updatedAt: serverTimestamp(),
    };
    
    await updateDoc(docRef, updateData);
    return true;
  } catch (error) {
    console.error(`Error updating document ${docId} in ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Delete a document by ID
 * @param {string} collectionName - The collection name
 * @param {string} docId - The document ID
 * @returns {Promise<boolean>} - True if deleted successfully
 */
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting document ${docId} from ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Get all documents from a collection
 * @param {string} collectionName - The collection name
 * @param {Object} options - Query options (orderByField, orderDirection, limitCount)
 * @returns {Promise<Array>} - Array of documents
 */
export const getDocuments = async (collectionName, options = {}) => {
  try {
    const {
      orderByField = 'createdAt',
      orderDirection = 'desc',
      limitCount = 100,
    } = options;
    
    const collectionRef = collection(db, collectionName);
    const q = query(
      collectionRef,
      orderBy(orderByField, orderDirection),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const documents = [];
    
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    
    return documents;
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Query documents from a collection with filtering
 * @param {string} collectionName - The collection name
 * @param {Array} filters - Array of filter objects [{ field, operator, value }]
 * @param {Object} options - Query options (orderByField, orderDirection, limitCount)
 * @returns {Promise<Array>} - Array of documents
 */
export const queryDocuments = async (collectionName, filters = [], options = {}) => {
  try {
    const {
      orderByField = 'createdAt',
      orderDirection = 'desc',
      limitCount = 100,
    } = options;
    
    const collectionRef = collection(db, collectionName);
    
    let queryConstraints = [];
    
    // Add filters
    filters.forEach((filter) => {
      queryConstraints.push(where(filter.field, filter.operator, filter.value));
    });
    
    // Add ordering and limit
    queryConstraints.push(orderBy(orderByField, orderDirection));
    queryConstraints.push(limit(limitCount));
    
    const q = query(collectionRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);
    
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    
    return documents;
  } catch (error) {
    console.error(`Error querying documents from ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Check if a document exists
 * @param {string} collectionName - The collection name
 * @param {string} docId - The document ID
 * @returns {Promise<boolean>} - True if the document exists
 */
export const documentExists = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error(`Error checking if document ${docId} exists in ${collectionName}:`, error);
    throw error;
  }
}; 