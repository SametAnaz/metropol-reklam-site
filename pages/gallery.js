import { useState, useEffect } from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import MainLayout from '../components/layouts/MainLayout';
import AnimatedSection from '../components/ui/AnimatedSection';
import useSWR from 'swr';
import axios from 'axios';
import { ALL_CATEGORIES } from '../lib/categories';

// API fetcher fonksiyonu
const fetcher = url => axios.get(url).then(res => res.data);

// Kategori filtresi seçenekleri - merkezi kategori listesini kullan
const categories = ALL_CATEGORIES;

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const imagesPerPage = 8;
  
  // API'dan verileri çek
  const { data, error, isLoading } = useSWR(
    `/api/gallery?page=${currentPage}&limit=${imagesPerPage}${selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''}`,
    fetcher
  );
  
  const galleryImages = data?.images || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const totalCount = data?.pagination?.totalCount || 0;

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    setSelectedImage(galleryImages[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Sayfa değiştiğinde scroll yap
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  return (
    <MainLayout>
      <NextSeo
        title="Galeri | Metropol Reklam Kuşadası - Çalışmalarımız"
        description="Metropol Reklam'ın gerçekleştirdiği 115+ tabela, dijital baskı, araç giydirme ve reklam projelerini galerimizde inceleyin. Kuşadası'nın en kapsamlı reklam galerisi."
        canonical="https://metropolreklam.net/gallery"
        openGraph={{
          url: 'https://metropolreklam.net/gallery',
          title: 'Metropol Reklam Galerisi | Projelerimiz ve Çalışmalarımız',
          description: 'Tabela, dijital baskı, araç giydirme ve daha fazlası. Metropol Reklam\'ın başarılı projelerini keşfedin.',
          images: [
            {
              url: 'https://metropolreklam.net/portfolio/kutuharf.jpg',
              width: 1200,
              height: 630,
              alt: 'Metropol Reklam Galeri',
            },
          ],
        }}
        additionalMetaTags={[{
          name: 'keywords',
          content: 'metropol reklam galeri, tabela çalışmaları, dijital baskı örnekleri, araç giydirme galeri, kuşadası reklam firması, tabela galerisi'
        }]}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Galeri</h1>
            <p className="text-xl max-w-2xl mx-auto">
              115+ proje ile yılların tecrübesiyle gerçekleştirdiğimiz çalışmalarımızı keşfedin
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Çalışmalarımız</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Metropol Reklam olarak gerçekleştirdiğimiz 115+ projeyi ve başarılı çalışmalarımızı sizlerle paylaşıyoruz
              </p>
              
              {/* Kategori Filtreleme */}
              <div className="mt-8">
                <label htmlFor="category-filter" className="text-gray-600 font-medium block mb-2">
                  Kategori Seçin:
                </label>
                <select 
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1); // Kategori değişince ilk sayfadan başlat
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </AnimatedSection>

          {/* Masonry Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-red-500 text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p>Galeri verileri yüklenirken bir hata oluştu.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  Yeniden Dene
                </button>
              </div>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Bu kategoride henüz resim bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryImages.map((image, index) => (
                <AnimatedSection key={`${currentPage}-${image.id}`} animation="fade-up" delay={index * 100}>
                  <div 
                    className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                    onClick={() => openLightbox(image, index)}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={image.blobUrl || image.imagePath}
                        alt={image.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{image.title}</h3>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex flex-col items-center space-y-4">
            {/* Sayfa Bilgisi */}
            <div className="text-gray-600 text-sm">
              <span className="font-medium">{data ? (currentPage - 1) * imagesPerPage + 1 : 0}-{data ? Math.min(currentPage * imagesPerPage, totalCount) : 0}</span> / {totalCount} fotoğraf
              <span className="ml-4">Sayfa <span className="font-medium">{currentPage}</span> / {totalPages}</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              {/* Önceki Sayfa */}
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                ← Önceki
              </button>

              {/* Sayfa Numaraları */}
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Sadece mevcut sayfa etrafındaki sayfaları göster
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          page === currentPage
                            ? 'bg-gradient-to-r from-orange-500 to-blue-500 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 3 ||
                    page === currentPage + 3
                  ) {
                    return (
                      <span key={page} className="px-2 py-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Sonraki Sayfa */}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Sonraki →
              </button>
            </div>

            {/* Hızlı Sayfa Atlama */}
            {totalPages > 5 && (
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">Sayfaya git:</span>
                <select
                  value={currentPage}
                  onChange={(e) => goToPage(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <option key={page} value={page}>
                      Sayfa {page}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative">
              <Image
                src={selectedImage.blobUrl || selectedImage.imagePath}
                alt={selectedImage.title}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                <p className="text-sm text-gray-300">{currentIndex + 1} / {galleryImages.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Sizin Projeniz de Burada Olabilir</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Hayalinizdeki reklam projesini birlikte gerçekleştirelim. Ücretsiz keşif ve danışmanlık için hemen iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-orange-500 to-blue-500 hover:opacity-90 text-white px-8 py-3 rounded-md text-lg font-medium transition-opacity duration-200"
              >
                Proje Teklifi Alın
              </a>
              <a
                href="/portfolio"
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-200"
              >
                Portföyümüzü İnceleyin
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </MainLayout>
  );
}
