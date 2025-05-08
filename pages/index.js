import Link from 'next/link';
import { NextSeo } from 'next-seo';
import MainLayout from '../components/layouts/MainLayout';

// Sample services data
const services = [
  {
    id: 'tabela',
    title: 'Tabela',
    description: 'Işıklı, ışıksız, kutu harf, totem ve her tür profesyonel tabela çözümleri.',
  },
  {
    id: 'dijital-baski',
    title: 'Dijital Baskı',
    description: 'Yüksek kaliteli baskı teknolojileri ile banner, afiş, branda ve daha fazlası.',
  },
  {
    id: 'arac-giydirme',
    title: 'Araç Giydirme',
    description: 'Kurumsal veya kişisel araçlarınız için tam veya parçalı araç giydirme hizmetleri.',
  },
];

export default function Home() {
  return (
    <MainLayout
      title="Metropol Reklam | Profesyonel Tabela & Dijital Baskı Hizmetleri"
      description="Metropol Reklam ile firmanızı öne çıkarın. Tabela, dijital baskı ve araç giydirme hizmetleri."
    >
      <NextSeo
        title="Ana Sayfa"
        description="Metropol Reklam ile firmanızı öne çıkarın. Tabela, dijital baskı ve araç giydirme hizmetleri."
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden -mt-20">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gray-900 opacity-70 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900 z-20"></div>
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-500 opacity-40"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              METROPOL REKLAM
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Profesyonel Tabela ve Dijital Baskı Hizmetleri
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/services" className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all">
                Hizmetlerimizi Keşfedin
              </Link>
              <Link href="/contact" className="bg-white text-orange-500 px-6 py-2 rounded-md hover:bg-opacity-90 transition-all">
                İletişime Geçin
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Hizmetlerimiz</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Müşterilerimize sunduğumuz geniş yelpazedeki profesyonel hizmetlerimizle tanışın.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-orange-100">
                  <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link href={`/services#${service.id}`} className="text-orange-500 hover:underline font-medium">
                  Detaylı Bilgi &rarr;
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/services" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all">
              Tüm Hizmetlerimiz
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Projeleriniz İçin Bizimle İletişime Geçin</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Markanızı güçlendirmek ve görünürlüğünüzü artırmak için 
            profesyonel çözümlerimizden faydalanın.
          </p>
          <Link href="/contact" className="bg-white text-orange-500 px-8 py-3 rounded-md text-lg font-medium hover:bg-opacity-90 transition-all">
            Hemen İletişime Geçin
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
