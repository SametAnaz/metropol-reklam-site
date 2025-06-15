import { NextSeo } from 'next-seo';
import Link from 'next/link';
import MainLayout from '../components/layouts/MainLayout';

// Expanded services data
const services = [
  {
    id: 'tabela',
    title: 'Tabela',
    description: 'Işıklı, ışıksız, kutu harf, totem ve her tür profesyonel tabela çözümleri.',
    features: [
      'Işıklı Tabela',
      'Işıksız Tabela',
      'LED Tabela',
      'Pleksi Tabela',
      'Vinil Tabela',
      'Alüminyum Tabela'
    ]
  },
  {
    id: 'dijital-baski',
    title: 'Dijital Baskı',
    description: 'Yüksek kaliteli baskı teknolojileri ile banner, afiş, branda ve daha fazlası.',
    features: [
      'Banner Baskı',
      'Afiş Baskı',
      'Branda Baskı',
      'UV Baskı',
      'Folyo Baskı',
      'Mesh Baskı'
    ]
  },
  {
    id: 'arac-giydirme',
    title: 'Araç Giydirme',
    description: 'Kurumsal veya kişisel araçlarınız için tam veya parçalı araç giydirme hizmetleri.',
    features: [
      'Tam Araç Giydirme',
      'Parçalı Araç Giydirme',
      'Araç Logosu',
      'Ticari Araç Giydirme',
      'Otobüs Giydirme',
      'Araba Folyo Kaplama'
    ]
  },
  {
    id: 'kutu-harf',
    title: 'Kutu Harf',
    description: 'Modern ve profesyonel görünüm sağlayan 3 boyutlu kutu harf çözümleri.',
    features: [
      'Pleksi Kutu Harf',
      'Alüminyum Kutu Harf',
      'Işıklı Kutu Harf',
      'Paslanmaz Kutu Harf',
      'LED Kutu Harf',
      'Kabartma Harfler'
    ]
  },
  {
    id: 'yonlendirme',
    title: 'Yönlendirme Sistemleri',
    description: 'İç ve dış mekan için profesyonel yönlendirme ve işaretleme sistemleri.',
    features: [
      'İç Mekan Yönlendirme',
      'Dış Mekan Yönlendirme',
      'Işıklı Yönlendirme',
      'Pano Yönlendirme',
      'Kapı İsimlikleri',
      'Kat Planları'
    ]
  },
  {
    id: 'promosyon',
    title: 'Promosyon Ürünleri',
    description: 'Markanızı tanıtmak için özel tasarım promosyon ürünleri.',
    features: [
      'Özel Tasarım Ürünler',
      'Kalemler ve Defterler',
      'Çantalar',
      'T-shirt ve Tekstil',
      'Bardak ve Termos',
      'Anahtarlıklar'
    ]
  },
];

export default function Services() {
  return (
    <MainLayout
      title="Hizmetlerimiz | Metropol Reklam" 
      description="Metropol Reklam profesyonel tabela, dijital baskı, araç giydirme hizmetleri ve daha fazlası."
    >
      <NextSeo
        title="Hizmetlerimiz"
        description="Tabela yapımı, dijital baskı, araç giydirme, kutu harf, yönlendirme sistemleri ve promosyon ürünleri dahil kapsamlı reklam çözümleri sunuyoruz."
      />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-gradient-to-r from-orange-500 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hizmetlerimiz</h1>
          <p className="text-xl md:text-2xl max-w-2xl">
            Markanızı öne çıkarmak için profesyonel reklam çözümlerimizi keşfedin
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <div 
                key={service.id}
                id={service.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="h-3 bg-gradient-to-r from-orange-400 to-blue-500"></div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">Özellikler:</h3>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/contact?service=${service.id}`} className="inline-block bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-md transition-colors duration-200">
                    Teklif Alın
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Özel Projeleriniz İçin Bize Ulaşın</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Listelenmeyen özel ihtiyaçlarınız mı var? Size özel çözümler sunabiliriz.
          </p>
          <Link href="/contact" className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-md transition-colors duration-200">
            İletişime Geçin
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}