import { useState } from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import MainLayout from '../components/layouts/MainLayout';
import AnimatedSection from '../components/ui/AnimatedSection';

// Galeri fotoğrafları - 50 adet
const galleryImages = [
  { id: 1, src: '/portfolio/kutuharf.jpg', title: 'Modern kutu harf tabela uygulaması' },
  { id: 2, src: '/portfolio/neon_tabela.jpg', title: 'Neon ışıklı motivasyon tabelası' },
  { id: 3, src: '/portfolio/cephe_giydirme.jpg', title: 'Büyük ölçekli cephe giydirme projesi' },
  { id: 4, src: '/portfolio/dijital_baski.jpg', title: 'Yüksek kaliteli dijital baskı çalışması' },
  { id: 5, src: '/portfolio/arac_giydirme.jpg', title: 'Kurumsal araç giydirme hizmeti' },
  { id: 6, src: '/portfolio/arac_kaplama2.jpg', title: 'Ticari araç reklam kaplama' },
  { id: 7, src: '/portfolio/arac_kaplama3.jpg', title: 'Kişisel araç tasarım uygulaması' },
  { id: 8, src: '/portfolio/sahne_konsept.jpg', title: 'Etkinlik sahne tasarım ve kurulum' },
  { id: 9, src: '/portfolio/konsept1.jpg', title: 'Özel konsept masa oyunu tasarımı' },
  { id: 10, src: '/portfolio/okul_tabela1.jpg', title: 'Okul giriş tabelası montajı' },
  { id: 11, src: '/portfolio/ataturk_kosesi.jpg', title: 'Atatürk köşesi özel tasarım' },
  { id: 12, src: '/portfolio/okul_tabela2.jpg', title: 'Okul iç mekan yönlendirme sistemi' },
  // Ek fotoğraflar için placeholder'lar
  { id: 13, src: '/portfolio/kutuharf.jpg', title: 'Pleksi kutu harf detay çalışması' },
  { id: 14, src: '/portfolio/neon_tabela.jpg', title: 'LED neon tabela gece görünümü' },
  { id: 15, src: '/portfolio/cephe_giydirme.jpg', title: 'İnşaat cephe reklam uygulaması' },
  { id: 16, src: '/portfolio/dijital_baski.jpg', title: 'Banner ve afiş baskı örnekleri' },
  { id: 17, src: '/portfolio/arac_giydirme.jpg', title: 'Filo araç giydirme projesi' },
  { id: 18, src: '/portfolio/arac_kaplama2.jpg', title: 'Minibüs reklam kaplama' },
  { id: 19, src: '/portfolio/arac_kaplama3.jpg', title: 'Özel tasarım araç folyo' },
  { id: 20, src: '/portfolio/sahne_konsept.jpg', title: 'Konser sahne backdrop tasarımı' },
  { id: 21, src: '/portfolio/konsept1.jpg', title: 'Promosyon ürün özel tasarım' },
  { id: 22, src: '/portfolio/okul_tabela1.jpg', title: 'Anadolu lisesi tabela montajı' },
  { id: 23, src: '/portfolio/ataturk_kosesi.jpg', title: 'Devlet dairesi Atatürk köşesi' },
  { id: 24, src: '/portfolio/okul_tabela2.jpg', title: 'Üniversite kampüs yönlendirme' },
  { id: 25, src: '/portfolio/kutuharf.jpg', title: 'Alüminyum kutu harf imalatı' },
  { id: 26, src: '/portfolio/neon_tabela.jpg', title: 'Restoran neon tabela çalışması' },
  { id: 27, src: '/portfolio/cephe_giydirme.jpg', title: 'AVM cephe reklam projesi' },
  { id: 28, src: '/portfolio/dijital_baski.jpg', title: 'Mesh afiş baskı uygulaması' },
  { id: 29, src: '/portfolio/arac_giydirme.jpg', title: 'Kamyon kasası reklam giydirme' },
  { id: 30, src: '/portfolio/arac_kaplama2.jpg', title: 'Taksi reklam kaplama çalışması' },
  { id: 31, src: '/portfolio/arac_kaplama3.jpg', title: 'Motosiklet özel folyo kaplama' },
  { id: 32, src: '/portfolio/sahne_konsept.jpg', title: 'Düğün sahne dekor tasarımı' },
  { id: 33, src: '/portfolio/konsept1.jpg', title: 'Kurumsal hediye kutu tasarımı' },
  { id: 34, src: '/portfolio/okul_tabela1.jpg', title: 'İlkokul tabela yenileme projesi' },
  { id: 35, src: '/portfolio/ataturk_kosesi.jpg', title: 'Belediye binası Atatürk köşesi' },
  { id: 36, src: '/portfolio/okul_tabela2.jpg', title: 'Özel okul iç tasarım projesi' },
  { id: 37, src: '/portfolio/kutuharf.jpg', title: 'Paslanmaz çelik kutu harf' },
  { id: 38, src: '/portfolio/neon_tabela.jpg', title: 'Kafe bar neon aydınlatma' },
  { id: 39, src: '/portfolio/cephe_giydirme.jpg', title: 'Otel cephe tanıtım projesi' },
  { id: 40, src: '/portfolio/dijital_baski.jpg', title: 'Etkinlik poster baskı çalışması' },
  { id: 41, src: '/portfolio/arac_giydirme.jpg', title: 'Otobüs reklam giydirme hizmeti' },
  { id: 42, src: '/portfolio/arac_kaplama2.jpg', title: 'Van araç reklam kaplama' },
  { id: 43, src: '/portfolio/arac_kaplama3.jpg', title: 'Spor araç tuning folyo' },
  { id: 44, src: '/portfolio/sahne_konsept.jpg', title: 'Festival sahne kurulum projesi' },
  { id: 45, src: '/portfolio/konsept1.jpg', title: 'Özel etkinlik ürün tasarımı' },
  { id: 46, src: '/portfolio/okul_tabela1.jpg', title: 'Meslek lisesi tabela projesi' },
  { id: 47, src: '/portfolio/ataturk_kosesi.jpg', title: 'Hastane Atatürk köşesi tasarımı' },
  { id: 48, src: '/portfolio/okul_tabela2.jpg', title: 'Kreş renkli duvar tasarımı' },
  { id: 49, src: '/portfolio/kutuharf.jpg', title: 'LED ışıklı kutu harf montajı' },
  { id: 50, src: '/portfolio/neon_tabela.jpg', title: 'Gece kulübü neon tabela sistemi' }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <MainLayout>
      <NextSeo
        title="Galeri | Metropol Reklam Kuşadası - Çalışmalarımız"
        description="Metropol Reklam'ın gerçekleştirdiği tabela, dijital baskı, araç giydirme ve reklam projelerini galerimizde inceleyin. Kuşadası'nın en kapsamlı reklam galerisi."
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
              Yılların tecrübesiyle gerçekleştirdiğimiz projelerimizi ve çalışmalarımızı keşfedin
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
                Metropol Reklam olarak gerçekleştirdiğimiz çeşitli projelerimizi ve başarılı çalışmalarımızı sizlerle paylaşıyoruz
              </p>
            </div>
          </AnimatedSection>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <AnimatedSection key={image.id} animation="fade-up" delay={index * 50}>
                <div 
                  className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                  onClick={() => openLightbox(image, index)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={image.src}
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
                src={selectedImage.src}
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
