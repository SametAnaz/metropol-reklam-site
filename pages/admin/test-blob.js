// Bu basit test sayfası, Vercel Blob Storage entegrasyonunun doğru çalışıp çalışmadığını kontrol etmek için kullanılır

import { useState, useRef } from 'react';
import { put } from '@vercel/blob';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function TestBlobPage() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [blobResult, setBlobResult] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!file) {
      toast.error('Lütfen önce bir dosya seçin');
      return;
    }
    
    setIsUploading(true);
    
    try {
      const filename = `test/${Date.now()}-${file.name}`;
      
      // Client-side upload to Blob API
      const response = await axios.post(`/api/blob/upload?filename=${encodeURIComponent(filename)}`, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
      
      const result = response.data;
      setBlobResult(result);
      toast.success('Dosya başarıyla yüklendi!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Dosya yüklenirken bir hata oluştu');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Vercel Blob Storage Test</h1>
      
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Dosya Yükle</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Bir dosya seçin</label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="block w-full text-gray-700 border border-gray-300 rounded p-2"
          />
          {file && (
            <p className="mt-2 text-sm text-green-600">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>
        
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            !file || isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          {isUploading ? 'Yükleniyor...' : 'Yükle'}
        </button>
      </div>
      
      {blobResult && (
        <div className="mt-6 bg-green-50 p-6 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Yükleme Başarılı!</h3>
          <div className="space-y-2 text-gray-700">
            <p><strong>URL:</strong> <a href={blobResult.url} target="_blank" rel="noreferrer" className="text-blue-500 break-all">{blobResult.url}</a></p>
            <p><strong>Boyut:</strong> {(blobResult.size / 1024).toFixed(2)} KB</p>
            <p><strong>MIME Tipi:</strong> {blobResult.contentType}</p>
            <p><strong>Oluşturulma:</strong> {new Date(blobResult.uploadedAt).toLocaleString()}</p>
          </div>
          
          <div className="mt-4">
            <img 
              src={blobResult.url} 
              alt="Yüklenen resim" 
              className="max-w-full h-auto rounded shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                toast.error('Bu dosya bir resim değil veya görüntülenemedi');
              }}
            />
          </div>
        </div>
      )}
      
      <div className="mt-10 p-4 bg-yellow-50 rounded-lg text-gray-700 text-sm">
        <p className="font-semibold">Bu test sayfası geliştirme aşamasında kullanılmak üzere tasarlanmıştır.</p>
        <p className="mt-2">Canlı ortama geçmeden önce kaldırmayı unutmayın.</p>
      </div>
    </div>
  );
}
