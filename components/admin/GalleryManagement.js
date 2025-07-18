import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ALL_CATEGORIES, getCategoryNameById, getCategoryIdByName } from '../../lib/categories';

export default function GalleryManagement() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imagePath: '',
    category: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchImages(pagination.page, pagination.limit, categoryFilter);
  }, []);

  const fetchImages = async (page = 1, limit = 12, category = 'all') => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/gallery?page=${page}&limit=${limit}${category !== 'all' ? `&category=${category}` : ''}`);
      
      // Handle response with new pagination format
      if (response.data.data && response.data.pagination) {
        setImages(response.data.data);
        setPagination({
          page: response.data.pagination.page,
          limit: response.data.pagination.limit,
          total: response.data.pagination.total,
          totalPages: response.data.pagination.totalPages
        });
      } else {
        // Handle legacy response format (backward compatibility)
        setImages(response.data);
        setPagination(prev => ({
          ...prev,
          page: 1,
          total: response.data.length,
          totalPages: Math.ceil(response.data.length / prev.limit)
        }));
      }
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
        
        // Aktivite logu oluştur (hata durumunda işlemi durdurmayacak şekilde)
        try {
          await axios.post('/api/admin/activity-logs', {
            action: 'gallery_update',
            details: `Galeri resmi güncellendi: ${formData.title} (ID: ${editingImage.id})`
          });
        } catch (logError) {
          console.error('Güncelleme aktivite günlüğü oluşturma hatası:', logError);
          // Ana işlemin devam etmesine izin ver
        }
        
        toast.success('Resim güncellendi!');
        fetchImages(pagination.page, pagination.limit, categoryFilter); // Maintain current page
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
        
        // Log the activity (hata durumunda işlemi durdurmayacak şekilde)
        try {
          await axios.post('/api/admin/activity-logs', {
            action: 'gallery_upload',
            details: `Yeni galeri resmi yüklendi: ${formData.title}`
          });
          console.log('Aktivite günlüğü başarıyla kaydedildi');
        } catch (logError) {
          // Aktivite günlüğü kaydedilmezse bile ana işlemin devam etmesini sağla
          console.error('Aktivite günlüğü kaydedilirken hata:', logError);
          // Hata ile devam et, kullanıcı deneyimini bozmayalım
        }
        
        toast.success('Resim başarıyla yüklendi');
        fetchImages(1, pagination.limit, categoryFilter); // Reset to first page after adding
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
        // Resmin başlığını bul (log için)
        const imageToDelete = images.find(img => img.id === id);
        const imageTitle = imageToDelete ? imageToDelete.title : 'Bilinmeyen resim';
        
        // Resmi sil
        const response = await axios.delete(`/api/gallery/delete/${id}`);
        
        // Aktivite logu oluştur (hata durumunda işlemi durdurmayacak şekilde)
        try {
          await axios.post('/api/admin/activity-logs', {
            action: 'gallery_delete',
            details: `Galeri resmi silindi: ${imageTitle} (ID: ${id})`
          });
        } catch (logError) {
          console.error('Silme aktivite günlüğü oluşturma hatası:', logError);
          // Ana işlemin devam etmesine izin ver
        }
        
        toast.success('Resim başarıyla silindi');
        
        // If this was the last item on the page, go to the previous page
        // unless we're already on the first page
        if (images.length === 1 && pagination.page > 1) {
          fetchImages(pagination.page - 1, pagination.limit, categoryFilter);
        } else {
          fetchImages(pagination.page, pagination.limit, categoryFilter);
        }
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
      order: image.order,
      isActive: image.isActive
    });
    setShowForm(true);
    
    // Sayfa en üste otomatik kaydırma
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Yumuşak kaydırma animasyonu
      });
    }, 100); // Formun açılması için kısa bir gecikme
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination(prev => ({...prev, page: newPage}));
    fetchImages(newPage, pagination.limit, categoryFilter);
  };
  
  // Handle page size change
  const handlePageSizeChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setPagination(prev => ({...prev, page: 1, limit: newLimit}));
    fetchImages(1, newLimit, categoryFilter);
  };
  
  // Handle category filter change
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategoryFilter(newCategory);
    setPagination(prev => ({...prev, page: 1})); // Reset to first page
    fetchImages(1, pagination.limit, newCategory);
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

  if (loading && pagination.page === 1) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Galeri Yönetimi</h2>
          <p className="text-sm text-gray-600">
            {pagination.total > 0 
              ? `Toplam ${pagination.total} resim` 
              : 'Henüz resim eklenmemiş'}
          </p>
        </div>
        <div className="flex space-x-4">
          <div className="w-48">
            <label htmlFor="categoryFilter" className="sr-only">Kategori Filtresi</label>
            <select
              id="categoryFilter"
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">Tüm Kategoriler</option>
              {ALL_CATEGORIES
                .filter(cat => cat.id !== 'all')
                .map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              }
            </select>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setFormData(prev => ({
                ...prev,
                order: (pagination.total || images.length) + 1 // Otomatik sıra numarası ayarla
              }));
            }}
            className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
          >
            Yeni Resim Ekle
          </button>
        </div>
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
                {ALL_CATEGORIES
                  .filter(cat => cat.id !== 'all') // "Tümü" kategorisini hariç tut
                  .map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>
            
            <div className="flex space-x-4">
              <div className="w-32">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sıra Numarası
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  min="0"
                />
              </div>
              
              <div className="flex-grow">
                <label htmlFor="isActive" className="block text-sm font-medium text-gray-700 mb-1">
                  Durum
                </label>
                <div className="relative inline-block w-full">
                  <div 
                    className="block w-14 h-8 bg-gray-300 rounded-full shadow-inner cursor-pointer"
                    onClick={() => setFormData({...formData, isActive: !formData.isActive})}
                  >
                    <div 
                      className={`absolute w-6 h-6 rounded-full transition-transform duration-300 ease-in-out top-1 ${
                        formData.isActive 
                          ? 'bg-green-500 transform translate-x-7' 
                          : 'bg-red-500 transform translate-x-1'
                      }`}
                    />
                  </div>
                  <input 
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="sr-only"
                  />
                  <span className="ml-16 text-sm text-gray-700">{formData.isActive ? 'Aktif' : 'Pasif'}</span>
                </div>
              </div>
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
              <p>Kategori: {image.category ? getCategoryNameById(image.category) : 'Belirtilmemiş'}</p>
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
      
      {/* Pagination Component */}
      {pagination.total > 0 && (
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="text-sm text-gray-700">
                Gösterilen: <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> - <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> / <span className="font-medium">{pagination.total}</span> resim
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="pageSizeGallery" className="text-sm text-gray-700">
                  Sayfa başına:
                </label>
                <select
                  id="pageSizeGallery"
                  name="pageSizeGallery"
                  value={pagination.limit}
                  onChange={handlePageSizeChange}
                  className="block w-20 pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                >
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="48">48</option>
                </select>
              </div>
            </div>
            
            {pagination.totalPages > 1 && (
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {/* Previous Page Button */}
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${pagination.page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <span className="sr-only">Önceki</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Page Numbers */}
                {[...Array(Math.min(5, pagination.totalPages))].map((_, idx) => {
                  // Calculate page numbers to show (current page in the middle when possible)
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    // If 5 or fewer pages, show all pages
                    pageNum = idx + 1;
                  } else if (pagination.page <= 3) {
                    // If current page is near start, show first 5 pages
                    pageNum = idx + 1;
                  } else if (pagination.page >= pagination.totalPages - 2) {
                    // If current page is near end, show last 5 pages
                    pageNum = pagination.totalPages - 4 + idx;
                  } else {
                    // Otherwise, show 2 pages before and after current page
                    pageNum = pagination.page - 2 + idx;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        pagination.page === pageNum
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                {/* Next Page Button */}
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${pagination.page === pagination.totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <span className="sr-only">Sonraki</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            )}
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-12">
          {categoryFilter !== 'all' ? (
            <>
              <p className="text-gray-500">Bu kategoride resim bulunamadı.</p>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={() => handleCategoryChange({ target: { value: 'all' } })}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Tüm Kategorileri Göster
                </button>
                <button
                  onClick={() => {
                    setShowForm(true);
                    setFormData(prev => ({
                      ...prev,
                      category: categoryFilter,
                      order: 1
                    }));
                  }}
                  className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-6 py-2 rounded hover:opacity-90 transition-opacity"
                >
                  Bu Kategoriye Resim Ekle
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-500">Henüz galeri resmi eklenmemiş.</p>
              <button
                onClick={() => {
                  setShowForm(true);
                  setFormData(prev => ({
                    ...prev,
                    order: 1 // İlk resim için sıra numarası 1 olarak ayarla
                  }));
                }}
                className="mt-4 bg-gradient-to-r from-orange-500 to-blue-500 text-white px-6 py-2 rounded hover:opacity-90 transition-opacity"
              >
                İlk Resmi Ekle
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
