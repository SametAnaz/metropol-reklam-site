import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function GalleryManagement() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imagePath: '',
    category: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('/api/admin/gallery');
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Galeri verileri alınamadı');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingImage) {
      // Düzenleme işlemi
      try {
        const response = await axios.put('/api/admin/gallery', { 
          ...formData, 
          id: editingImage.id 
        });
        
        toast.success('Resim güncellendi!');
        fetchImages();
        resetForm();
      } catch (error) {
        console.error('Error updating image:', error);
        toast.error(error.response?.data?.message || 'Güncelleme sırasında bir hata oluştu');
      }
    } else {
      // Yeni resim ekleme
      if (!selectedFile) {
        toast.error('Lütfen bir resim seçin');
        return;
      }
      
      setIsUploading(true);
      setUploadProgress(0);
      
      try {
        // İki adımda yükleme:
        
        // 1. Önce doğrudan Vercel Blob'a yükleyelim
        const filename = `gallery/${Date.now()}-${selectedFile.name.replace(/\s+/g, '-')}`;
        
        // Upload progress için config
        const config = {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        };
        
        // Doğrudan Blob API'sine yükleme
        const formBlob = new FormData();
        formBlob.append('file', selectedFile);
        
        const blobResponse = await axios.post(`/api/blob/upload?filename=${encodeURIComponent(filename)}`, selectedFile, {
          headers: {
            'Content-Type': selectedFile.type,
          },
          ...config,
        });
        
        const blobData = blobResponse.data;
        console.log('Blob upload successful:', blobData);
        
        // 2. Şimdi veritabanına kaydedelim
        const galleryData = {
          title: formData.title,
          description: formData.description || '',
          imagePath: filename,
          blobUrl: blobData.url,
          category: formData.category || '',
          isActive: formData.isActive,
          order: formData.order || 0
        };
        
        const dbResponse = await axios.post('/api/admin/gallery', galleryData);
        
        toast.success('Resim başarıyla yüklendi');
        fetchImages();
        resetForm();
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(
          error.response?.data?.message || 
          error.response?.data?.error || 
          'Resim yüklenirken bir hata oluştu'
        );
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Bu resmi silmek istediğinizden emin misiniz?')) {
      try {
        const response = await axios.delete(`/api/gallery/delete/${id}`);
        toast.success('Resim başarıyla silindi');
        fetchImages();
      } catch (error) {
        console.error('Error deleting image:', error);
        toast.error(error.response?.data?.message || 'Resim silinirken bir hata oluştu');
      }
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description || '',
      imagePath: image.imagePath,
      category: image.category || '',
      order: image.order
    });
    setShowForm(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingImage(null);
    setFormData({ 
      title: '', 
      description: '', 
      imagePath: '', 
      category: '', 
      order: 0,
      isActive: true
    });
    setSelectedFile(null);
    setMessage('');
  };

  if (loading) return <div className="text-center">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Galeri Yönetimi</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Yeni Resim Ekle
        </button>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('hata') || message.includes('alınamadı') || message.includes('silinemedi') 
          ? 'bg-red-100 text-red-700' 
          : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {showForm && (
        <div className="mb-6 p-6 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">
            {editingImage ? 'Resim Düzenle' : 'Yeni Resim Ekle'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Başlık *
              </label>
              <input
                type="text"
                placeholder="Resim başlığı"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Açıklama
              </label>
              <textarea
                placeholder="Resim açıklaması"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={3}
              />
            </div>
            
            {editingImage ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resim Yolu
                </label>
                <input
                  type="text"
                  placeholder="/gallery/resim-adi.jpg"
                  value={formData.imagePath}
                  onChange={(e) => setFormData({...formData, imagePath: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resim Dosyası *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required={!editingImage}
                />
                {selectedFile && (
                  <p className="text-xs text-green-600 mt-1">
                    {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                  </p>
                )}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Kategori Seçin</option>
                <option value="Tabela">Tabela</option>
                <option value="Dijital Baskı">Dijital Baskı</option>
                <option value="Araç Giydirme">Araç Giydirme</option>
                <option value="Kutu Harf">Kutu Harf</option>
                <option value="Yönlendirme">Yönlendirme</option>
                <option value="Promosyon">Promosyon</option>
                <option value="Okul">Okul</option>
                <option value="Totem">Totem</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sıra Numarası
              </label>
              <input
                type="number"
                placeholder="0"
                value={formData.order}
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                Aktif
              </label>
            </div>
            
            {isUploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <p className="text-xs text-gray-500 mt-1">Yükleniyor: %{uploadProgress}</p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button 
                type="submit" 
                disabled={isUploading}
                className={`bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {editingImage 
                  ? 'Güncelle' 
                  : isUploading 
                    ? 'Yükleniyor...' 
                    : 'Kaydet'
                }
              </button>
              <button 
                type="button" 
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-48 mb-3">
              <Image
                src={image.blobUrl || image.imagePath}
                alt={image.title}
                fill
                className="object-cover rounded"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{image.title}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{image.description}</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>Kategori: {image.category || 'Belirtilmemiş'}</p>
              <p>Sıra: {image.order}</p>
              <p className={`font-medium ${image.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {image.isActive ? 'Aktif' : 'Pasif'}
              </p>
            </div>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => handleEdit(image)}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(image.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Henüz galeri resmi eklenmemiş.</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 bg-gradient-to-r from-orange-500 to-blue-500 text-white px-6 py-2 rounded hover:opacity-90 transition-opacity"
          >
            İlk Resmi Ekle
          </button>
        </div>
      )}
    </div>
  );
}
