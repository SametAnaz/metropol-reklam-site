const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

const galleryData = [
  // Araç Giydirme
  { title: 'Profesyonel araç giydirme hizmeti', imagePath: '/gallery/arac-giydirme1.jpeg', category: 'Araç Giydirme', order: 1 },
  { title: 'Ticari araç reklam kaplama', imagePath: '/gallery/arac-giydirme2.jpeg', category: 'Araç Giydirme', order: 2 },
  
  // Atatürk Köşesi
  { title: 'Modern Atatürk köşesi tasarımı', imagePath: '/gallery/ataturk-kosesi1.jpeg', category: 'Okul', order: 3 },
  { title: 'Okul Atatürk köşesi uygulaması', imagePath: '/gallery/ataturk-kosesi2.jpeg', category: 'Okul', order: 4 },
  { title: 'Işıklı Atatürk köşesi montajı', imagePath: '/gallery/ataturk-kosesi3.jpeg', category: 'Okul', order: 5 },
  { title: 'Kurumsal Atatürk köşesi tasarımı', imagePath: '/gallery/ataturk-kosesi4.jpeg', category: 'Okul', order: 6 },
  { title: 'Özel Atatürk köşesi projesi', imagePath: '/gallery/ataturk-kosesi5.jpeg', category: 'Okul', order: 7 },
  { title: 'Belediye Atatürk köşesi', imagePath: '/gallery/ataturk-kosesi6.jpeg', category: 'Okul', order: 8 },
  
  // Baskı
  { title: 'Yüksek kaliteli dijital baskı', imagePath: '/gallery/baski1.jpeg', category: 'Dijital Baskı', order: 9 },
  
  // Cephe Giydirme
  { title: 'Büyük ölçekli cephe giydirme', imagePath: '/gallery/cephe-giydirme1.jpeg', category: 'Dijital Baskı', order: 10 },
  { title: 'İnşaat cephe reklam projesi', imagePath: '/gallery/cephe-giydirme2.jpeg', category: 'Dijital Baskı', order: 11 },
  { title: 'AVM cephe tanıtım çalışması', imagePath: '/gallery/cephe-giydirme3.jpeg', category: 'Dijital Baskı', order: 12 },
  { title: 'Otel cephe reklam uygulaması', imagePath: '/gallery/cephe-giydirme4.jpeg', category: 'Dijital Baskı', order: 13 },
  { title: 'Ticari bina cephe giydirme', imagePath: '/gallery/cephe-giydirme5.jpeg', category: 'Dijital Baskı', order: 14 },
  
  // Dijital Baskı
  { title: 'Profesyonel dijital baskı hizmeti', imagePath: '/gallery/dijital-baski1.jpeg', category: 'Dijital Baskı', order: 15 },
  { title: 'Banner ve afiş baskı çalışması', imagePath: '/gallery/dijital-baski2.jpeg', category: 'Dijital Baskı', order: 16 },
  { title: 'Yüksek çözünürlük baskı teknolojisi', imagePath: '/gallery/dijital-baski3.jpeg', category: 'Dijital Baskı', order: 17 },
  { title: 'Outdoor baskı uygulaması', imagePath: '/gallery/dijital-baski4.jpeg', category: 'Dijital Baskı', order: 18 },
  { title: 'Mesh afiş baskı projesi', imagePath: '/gallery/dijital-baski5.jpeg', category: 'Dijital Baskı', order: 19 },
  { title: 'Branda baskı çalışması', imagePath: '/gallery/dijital-baski6.jpeg', category: 'Dijital Baskı', order: 20 },
  
  // Işıklı Kutu Harf
  { title: 'Modern ışıklı kutu harf', imagePath: '/gallery/isikli-kutu-harf1.jpeg', category: 'Kutu Harf', order: 21 },
  { title: 'LED kutu harf montajı', imagePath: '/gallery/isikli-kutu-harf2.jpeg', category: 'Kutu Harf', order: 22 },
  { title: 'Pleksi ışıklı kutu harf', imagePath: '/gallery/isikli-kutu-harf3.jpeg', category: 'Kutu Harf', order: 23 },
  { title: 'Alüminyum kutu harf sistemi', imagePath: '/gallery/isikli-kutu-harf4.jpeg', category: 'Kutu Harf', order: 24 },
  { title: 'Paslanmaz kutu harf uygulaması', imagePath: '/gallery/isikli-kutu-harf5.jpeg', category: 'Kutu Harf', order: 25 },
  
  // LED Tabela
  { title: 'LED ekran tabela sistemi', imagePath: '/gallery/led-tabela1.jpeg', category: 'Tabela', order: 26 },
  { title: 'Dijital LED tabela uygulaması', imagePath: '/gallery/led-tabela2.jpeg', category: 'Tabela', order: 27 },
  
  // Neon
  { title: 'Neon tabela uygulaması', imagePath: '/gallery/neon1.jpeg', category: 'Tabela', order: 28 },
  
  // Okul
  { title: 'Okul giriş tabelası', imagePath: '/gallery/okul1.jpeg', category: 'Okul', order: 29 },
  { title: 'Eğitim kurumu tabelası', imagePath: '/gallery/okul2.jpeg', category: 'Okul', order: 30 },
  
  // Promosyon
  { title: 'Promosyon ürün tasarımı', imagePath: '/gallery/promosyon1.jpeg', category: 'Promosyon', order: 31 },
  { title: 'Kurumsal hediye ürünleri', imagePath: '/gallery/promosyon2.jpeg', category: 'Promosyon', order: 32 },
  
  // Totem
  { title: 'Modern totem tabela', imagePath: '/gallery/totem1.jpeg', category: 'Totem', order: 33 },
  { title: 'Yönlendirme totem sistemi', imagePath: '/gallery/totem2.jpeg', category: 'Totem', order: 34 },
  
  // Yönlendirme
  { title: 'Profesyonel yönlendirme sistemi', imagePath: '/gallery/yonlendirme1.jpeg', category: 'Yönlendirme', order: 35 },
  { title: 'İç mekan yönlendirme tabelası', imagePath: '/gallery/yonlendirme2.jpeg', category: 'Yönlendirme', order: 36 },
];

async function main() {
  console.log('🌱 Gallery verisi ekleniyor...');
  
  for (const data of galleryData) {
    await prisma.gallery.create({
      data
    });
  }
  
  console.log('✅ Gallery verisi başarıyla eklendi!');
}

main()
  .catch((e) => {
    console.error('❌ Hata:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
