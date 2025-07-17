import { PutBlobResult, list, put, del } from '@vercel/blob';

/**
 * Vercel Blob Storage için yardımcı fonksiyonlar
 */

/**
 * Resim yükleme
 * @param {File|Buffer} file - Yüklenecek dosya veya buffer
 * @param {string} filename - Dosya adı
 * @param {string} contentType - Dosya içerik tipi
 * @returns {Promise<PutBlobResult>}
 */
export async function uploadImage(file, filename, contentType) {
  try {
    console.log(`Uploading to Vercel Blob: ${filename} (${contentType})`);
    
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN is not defined');
      throw new Error('BLOB_READ_WRITE_TOKEN is not defined');
    }
    
    const blob = await put(filename, file, {
      contentType,
      access: 'public',
    });
    
    console.log(`Successfully uploaded to Vercel Blob: ${blob.url}`);
    return blob;
  } catch (error) {
    console.error('Image upload error:', error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
}

/**
 * Resim silme
 * @param {string} url - Silinecek resim URL'i
 * @returns {Promise<void>}
 */
export async function deleteImage(url) {
  try {
    await del(url);
  } catch (error) {
    console.error('Image delete error:', error);
    throw new Error('Image delete failed');
  }
}

/**
 * Resimleri listeleme
 * @param {string} prefix - Klasör öneki
 * @returns {Promise<Array>}
 */
export async function listImages(prefix = 'gallery/') {
  try {
    const blobs = await list({ prefix });
    return blobs.blobs;
  } catch (error) {
    console.error('Image list error:', error);
    throw new Error('Image list failed');
  }
}
