import Link from 'next/link';
import { NextSeo } from 'next-seo';
import MainLayout from '../components/layouts/MainLayout';
import styles from '../styles/HeroAnimation.module.css';

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
      <section className={styles.container}>
        <h1 className={`${styles.title} ${styles.text_fade}`}>
          METROPOL REKLAM
        </h1>
        <h3 className={`${styles.subtitle} ${styles.text_fade}`}>
          Profesyonel Tabela ve Dijital Baskı Hizmetleri
        </h3>
        <div className={styles.orb}></div>
        <div className={styles.orb}></div>
        <div className={styles.orb}></div>
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
