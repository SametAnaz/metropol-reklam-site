/**
 * Bu dosya Next.js uygulamasının başlangıç noktasıdır.
 * Burada çeşitli bileşenleri ve kontrolleri yapabiliriz.
 */

import { useEffect } from 'react';

// Bu bileşen çeşitli BLOB_READ_WRITE_TOKEN sorunlarını kontrol eder
export default function BlobDebugger() {
  useEffect(() => {
    // BLOB_READ_WRITE_TOKEN değişkenini kontrol et
    const token = process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!token) {
      console.warn('⚠️ BLOB_READ_WRITE_TOKEN çevresel değişkeni bulunamadı!');
      console.warn('Vercel Blob Storage için gereken token mevcut değil.');
      console.warn('Lütfen .env.local dosyanızda BLOB_READ_WRITE_TOKEN tanımlandığından emin olun.');
    } else {
      console.log('✅ BLOB_READ_WRITE_TOKEN mevcut.');
    }
  }, []);

  return null;
}
