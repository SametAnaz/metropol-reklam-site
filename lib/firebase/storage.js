import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Upload a file to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} path - The storage path to upload to
 * @param {Function} progressCallback - Optional callback for upload progress
 * @returns {Promise<string>} - The download URL of the uploaded file
 */
export const uploadFile = async (file, path, progressCallback = null) => {
  try {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progressCallback) {
            progressCallback(progress);
          }
        },
        (error) => {
          console.error('Upload error:', error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            console.error('Get download URL error:', error);
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};

/**
 * Delete a file from Firebase Storage
 * @param {string} fileUrl - The URL of the file to delete
 * @returns {Promise<boolean>} - True if deleted successfully
 */
export const deleteFile = async (fileUrl) => {
  try {
    // Extract the path from the URL
    // This assumes the URL is in the format: https://firebasestorage.googleapis.com/v0/b/[project-id].appspot.com/o/[encoded-file-path]?[token]
    const encodedPath = fileUrl.split('/o/')[1].split('?')[0];
    const decodedPath = decodeURIComponent(encodedPath);
    
    const storageRef = ref(storage, decodedPath);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('File deletion error:', error);
    throw error;
  }
};

/**
 * Generate a unique file path for storage
 * @param {string} folderPath - The folder path to store the file in
 * @param {string} fileName - The original file name
 * @returns {string} - A unique file path
 */
export const generateFilePath = (folderPath, fileName) => {
  const timestamp = Date.now();
  const extension = fileName.split('.').pop();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${folderPath}/${timestamp}-${randomString}.${extension}`;
};

/**
 * Get image dimensions from a file
 * @param {File} file - The image file
 * @returns {Promise<{width: number, height: number}>} - The image dimensions
 */
export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}; 