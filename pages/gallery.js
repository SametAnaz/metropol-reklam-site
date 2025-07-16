import { useState } from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import MainLayout from '../components/layouts/MainLayout';
import AnimatedSection from '../components/ui/AnimatedSection';

// Galeri fotoğrafları - 107 adet
const galleryImages = [
  // Araç Giydirme
  { id: 1, src: '/gallery/arac-giydirme1.jpeg', title: 'Profesyonel araç giydirme hizmeti' },
  { id: 2, src: '/gallery/arac-giydirme2.jpeg', title: 'Ticari araç reklam kaplama' },
  
  // Atatürk Köşesi
  { id: 3, src: '/gallery/ataturk-kosesi1.jpeg', title: 'Modern Atatürk köşesi tasarımı' },
  { id: 4, src: '/gallery/ataturk-kosesi2.jpeg', title: 'Okul Atatürk köşesi uygulaması' },
  { id: 5, src: '/gallery/ataturk-kosesi3.jpeg', title: 'Işıklı Atatürk köşesi montajı' },
  { id: 6, src: '/gallery/ataturk-kosesi4.jpeg', title: 'Kurumsal Atatürk köşesi tasarımı' },
  { id: 7, src: '/gallery/ataturk-kosesi5.jpeg', title: 'Özel Atatürk köşesi projesi' },
  { id: 8, src: '/gallery/ataturk-kosesi6.jpeg', title: 'Belediye Atatürk köşesi' },
  { id: 9, src: '/gallery/ataturk-kosesi7.jpeg', title: 'Hastane Atatürk köşesi tasarımı' },
  { id: 10, src: '/gallery/ataturk-kosesi8.jpeg', title: 'Devlet dairesi Atatürk köşesi' },
  
  // Baskı
  { id: 11, src: '/gallery/baski1.jpeg', title: 'Yüksek kaliteli dijital baskı' },
  
  // Cephe Giydirme
  { id: 12, src: '/gallery/cephe-giydirme1.jpeg', title: 'Büyük ölçekli cephe giydirme' },
  { id: 13, src: '/gallery/cephe-giydirme2.jpeg', title: 'İnşaat cephe reklam projesi' },
  { id: 14, src: '/gallery/cephe-giydirme3.jpeg', title: 'AVM cephe tanıtım çalışması' },
  { id: 15, src: '/gallery/cephe-giydirme4.jpeg', title: 'Otel cephe reklam uygulaması' },
  { id: 16, src: '/gallery/cephe-giydirme5.jpeg', title: 'Ticari bina cephe giydirme' },
  
  // Dijital Baskı
  { id: 17, src: '/gallery/dijital-baski1.jpeg', title: 'Profesyonel dijital baskı hizmeti' },
  { id: 18, src: '/gallery/dijital-baski2.jpeg', title: 'Banner ve afiş baskı çalışması' },
  { id: 19, src: '/gallery/dijital-baski3.jpeg', title: 'Yüksek çözünürlük baskı teknolojisi' },
  { id: 20, src: '/gallery/dijital-baski4.jpeg', title: 'Outdoor baskı uygulaması' },
  { id: 21, src: '/gallery/dijital-baski5.jpeg', title: 'Mesh afiş baskı projesi' },
  { id: 22, src: '/gallery/dijital-baski6.jpeg', title: 'Branda baskı çalışması' },
  
  // Işıklı Krom
  { id: 23, src: '/gallery/isikli-krom1.jpeg', title: 'Işıklı krom harf uygulaması' },
  { id: 24, src: '/gallery/isikli-krom2.jpeg', title: 'Premium krom tabela sistemi' },
  
  // Işıklı Kutu Harf
  { id: 25, src: '/gallery/isikli-kutu-harf1.jpeg', title: 'Modern ışıklı kutu harf' },
  { id: 26, src: '/gallery/isikli-kutu-harf2.jpeg', title: 'LED kutu harf montajı' },
  { id: 27, src: '/gallery/isikli-kutu-harf3.jpeg', title: 'Pleksi ışıklı kutu harf' },
  { id: 28, src: '/gallery/isikli-kutu-harf4.jpeg', title: 'Alüminyum kutu harf sistemi' },
  { id: 29, src: '/gallery/isikli-kutu-harf5.jpeg', title: 'Paslanmaz kutu harf uygulaması' },
  { id: 30, src: '/gallery/isikli-kutu-harf6.jpeg', title: 'Özel tasarım kutu harf' },
  { id: 31, src: '/gallery/isikli-kutu-harf7.jpeg', title: 'Kurumsal kutu harf projesi' },
  { id: 32, src: '/gallery/isikli-kutu-harf8.jpeg', title: 'Renkli LED kutu harf' },
  { id: 33, src: '/gallery/isikli-kutu-harf9.jpeg', title: 'Büyük boy kutu harf sistemi' },
  
  // Işıklı Tabela
  { id: 34, src: '/gallery/isikli-tabela1.jpeg', title: 'Profesyonel ışıklı tabela' },
  
  // Işıklı Vinil
  { id: 35, src: '/gallery/isikli-vinil1.jpeg', title: 'Işıklı vinil tabela uygulaması' },
  { id: 36, src: '/gallery/isikli-vinil2.jpeg', title: 'Vinil germe ışıklı sistem' },
  { id: 37, src: '/gallery/isikli-vinil3.jpeg', title: 'Modern vinil tabela tasarımı' },
  
  // Işıklı Yönlendirme
  { id: 38, src: '/gallery/isikli-yonlendirme.jpeg', title: 'Işıklı yönlendirme sistemi' },
  { id: 39, src: '/gallery/isikli-yonlendirme2.jpeg', title: 'LED yönlendirme tabelası' },
  { id: 40, src: '/gallery/isikli-yonlendirme3.jpeg', title: 'İç mekan yönlendirme sistemi' },
  
  // Işıksız Krom
  { id: 41, src: '/gallery/isiksiz-krom1.jpeg', title: 'Işıksız krom harf uygulaması' },
  { id: 42, src: '/gallery/isiksiz-krom2.jpeg', title: 'Paslanmaz krom tabela' },
  
  // Işıksız Kutu Harf
  { id: 43, src: '/gallery/isiksiz-kutu-harf1.jpeg', title: 'Işıksız kutu harf sistemi' },
  
  // Işıksız Vinil
  { id: 44, src: '/gallery/isiksiz-vinil1.jpeg', title: 'Işıksız vinil tabela' },
  { id: 45, src: '/gallery/isiksiz-vinil2.jpeg', title: 'Ekonomik vinil çözüm' },
  { id: 46, src: '/gallery/isiksiz-vinil3.jpeg', title: 'Dış mekan vinil tabela' },
  { id: 47, src: '/gallery/isiksiz-vinil4.jpeg', title: 'Ticari vinil tabela uygulaması' },
  
  // İsimlik
  { id: 48, src: '/gallery/isimlik1.jpeg', title: 'Profesyonel isimlik tasarımı' },
  
  // Kurumsal
  { id: 49, src: '/gallery/kurumsal1.jpeg', title: 'Kurumsal tabela projesi' },
  { id: 50, src: '/gallery/kurumsal2.jpeg', title: 'Şirket tanıtım tabelası' },
  { id: 51, src: '/gallery/kurumsal3.jpeg', title: 'Ofis tabela sistemi' },
  { id: 52, src: '/gallery/kurumsal4.jpeg', title: 'Mağaza tabela uygulaması' },
  { id: 53, src: '/gallery/kurumsal5.jpeg', title: 'İşletme tanıtım tabelası' },
  { id: 54, src: '/gallery/kurumsal6.jpeg', title: 'Ticari tabela çözümü' },
  
  // Kutu Harf
  { id: 55, src: '/gallery/kutu-harf1.jpeg', title: 'Klasik kutu harf uygulaması' },
  { id: 56, src: '/gallery/kutu-harf2.jpeg', title: 'Modern kutu harf tasarımı' },
  
  // LED Tabela
  { id: 57, src: '/gallery/led-tabela1.jpeg', title: 'LED ekran tabela sistemi' },
  { id: 58, src: '/gallery/led-tabela2.jpeg', title: 'Dijital LED tabela uygulaması' },
  
  // Menü
  { id: 59, src: '/gallery/menu1.jpeg', title: 'Restoran menü tabelası' },
  { id: 60, src: '/gallery/menu2.jpeg', title: 'Cafe menü tabela tasarımı' },
  
  // Neon
  { id: 61, src: '/gallery/neon1.jpeg', title: 'Neon tabela uygulaması' },
  
  // Okul
  { id: 62, src: '/gallery/okul1.jpeg', title: 'Okul giriş tabelası' },
  { id: 63, src: '/gallery/okul2.jpeg', title: 'Eğitim kurumu tabelası' },
  { id: 64, src: '/gallery/okul3.jpeg', title: 'Okul yönlendirme sistemi' },
  { id: 65, src: '/gallery/okul4.jpeg', title: 'Sınıf tabela uygulaması' },
  { id: 66, src: '/gallery/okul5.jpeg', title: 'Okul bilgilendirme tabelası' },
  { id: 67, src: '/gallery/okul6.jpeg', title: 'Eğitim kurumu tanıtım tabelası' },
  { id: 68, src: '/gallery/okul7.jpeg', title: 'Okul kapı tabelası' },
  { id: 69, src: '/gallery/okul8.jpeg', title: 'Kampüs yönlendirme sistemi' },
  { id: 70, src: '/gallery/okul9.jpeg', title: 'Özel okul tabela projesi' },
  
  // Promosyon
  { id: 71, src: '/gallery/promosyon1.jpeg', title: 'Promosyon ürün tasarımı' },
  { id: 72, src: '/gallery/promosyon2.jpeg', title: 'Kurumsal hediye ürünleri' },
  { id: 73, src: '/gallery/promosyon3.jpeg', title: 'Özel tasarım promosyon' },
  { id: 74, src: '/gallery/promosyon4.jpeg', title: 'Reklam promosyon ürünleri' },
  { id: 75, src: '/gallery/promosyon5.jpeg', title: 'Tanıtım ürün tasarımı' },
  { id: 76, src: '/gallery/promosyon6.jpeg', title: 'Etkinlik promosyon ürünleri' },
  { id: 77, src: '/gallery/promosyon7.jpeg', title: 'Marka promosyon çalışması' },
  { id: 78, src: '/gallery/promosyon8.jpeg', title: 'Özel promosyon tasarımı' },
  { id: 79, src: '/gallery/promosyon9.jpeg', title: 'Şirket promosyon ürünleri' },
  { id: 80, src: '/gallery/promosyon10.jpeg', title: 'Reklam amaçlı promosyon' },
  { id: 81, src: '/gallery/promosyon11.jpeg', title: 'Pazarlama promosyon ürünleri' },
  { id: 82, src: '/gallery/promosyon12.jpeg', title: 'Hediye promosyon tasarımı' },
  
  // Random
  { id: 83, src: '/gallery/random1.jpeg', title: 'Özel tasarım reklam projesi' },
  { id: 84, src: '/gallery/random2.jpeg', title: 'Yaratıcı tabela çözümü' },
  { id: 85, src: '/gallery/random3.jpeg', title: 'İnovatif reklam uygulaması' },
  { id: 86, src: '/gallery/random4.jpeg', title: 'Özgün tasarım projesi' },
  { id: 87, src: '/gallery/random5.jpeg', title: 'Kreatif reklam çalışması' },
  { id: 88, src: '/gallery/random6.jpeg', title: 'Farklı konsept uygulama' },
  { id: 89, src: '/gallery/random7.jpeg', title: 'Özel reklam projesi' },
  { id: 90, src: '/gallery/random8.jpeg', title: 'Benzersiz tasarım çalışması' },
  { id: 91, src: '/gallery/random9.jpeg', title: 'Modern reklam uygulaması' },
  { id: 92, src: '/gallery/random10.jpeg', title: 'Artistik tabela tasarımı' },
  { id: 93, src: '/gallery/random11.jpeg', title: 'Yaratıcı görsel çözüm' },
  { id: 94, src: '/gallery/random12.jpeg', title: 'İlginç tasarım projesi' },
  { id: 95, src: '/gallery/random13.jpeg', title: 'Özel konsept uygulaması' },
  
  // Tişört Baskı
  { id: 96, src: '/gallery/tisort-baski1.jpeg', title: 'Özel tişört baskı hizmeti' },
  { id: 97, src: '/gallery/tisort-baski2.jpeg', title: 'Kurumsal tişört tasarımı' },
  { id: 98, src: '/gallery/tisort-baski3.jpeg', title: 'Etkinlik tişört baskısı' },
  
  // Totem
  { id: 99, src: '/gallery/totem-vinil-germe1.jpeg', title: 'Totem vinil germe uygulaması' },
  { id: 100, src: '/gallery/totem1.jpeg', title: 'Modern totem tabela' },
  { id: 101, src: '/gallery/totem2.jpeg', title: 'Yönlendirme totem sistemi' },
  { id: 102, src: '/gallery/totem3.jpeg', title: 'Bilgilendirme totem tabelası' },
  { id: 103, src: '/gallery/totem4.jpeg', title: 'Dış mekan totem uygulaması' },
  { id: 104, src: '/gallery/totem5.jpeg', title: 'İç mekan totem tabela' },
  { id: 105, src: '/gallery/totem6.jpeg', title: 'Ticari totem sistemi' },
  { id: 106, src: '/gallery/totem7.jpeg', title: 'Özel tasarım totem' },
  { id: 107, src: '/gallery/totem8.jpeg', title: 'Kurumsal totem projesi' },
  { id: 108, src: '/gallery/totem9.jpeg', title: 'Yol kenarı totem tabelası' },
  
  // Vinil Kabartma
  { id: 109, src: '/gallery/vinil-kabartma1.jpeg', title: 'Vinil kabartma uygulaması' },
  
  // Yönlendirme
  { id: 110, src: '/gallery/yonlendirme1.jpeg', title: 'Profesyonel yönlendirme sistemi' },
  { id: 111, src: '/gallery/yonlendirme2.jpeg', title: 'İç mekan yönlendirme tabelası' },
  { id: 112, src: '/gallery/yonlendirme3.jpeg', title: 'Dış mekan yönlendirme sistemi' },
  { id: 113, src: '/gallery/yonlendirme4.jpeg', title: 'Kapsamlı yönlendirme projesi' },
  
  // Yurtdışı Tabela
  { id: 114, src: '/gallery/yurtdisi-tabela1.jpeg', title: 'Uluslararası tabela projesi' },
  { id: 115, src: '/gallery/yurtdisi-tabela2.jpeg', title: 'Yurtdışı tabela uygulaması' }
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
