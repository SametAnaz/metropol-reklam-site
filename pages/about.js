import { NextSeo } from 'next-seo';
import Image from 'next/image';
import MainLayout from '../components/layouts/MainLayout';
import Hero from '../components/ui/Hero';

export default function About() {
  return (
    <MainLayout 
      // Title and description are now primarily handled by NextSeo below
    >
      <NextSeo
        title="Hakkımızda | Metropol Reklam Kuşadası - Tabelacı ve Reklam Ajansı"
        description="Kuşadası Metropol Reklam hakkında: Misyonumuz, vizyonumuz ve değerlerimiz. Kuşadası'nın önde gelen tabelacı ve reklam firması olarak yılların tecrübesiyle hizmetinizdeyiz."
        canonical="https://metropolreklam.net/about"
        openGraph={{
          url: 'https://metropolreklam.net/about',
          title: 'Hakkımızda - Metropol Reklam Kuşadası',
          description: 'Kuşadası reklam ve tabela sektöründe Metropol Reklam\'ın deneyimi, vizyonu ve misyonu hakkında daha fazla bilgi edinin.',
        }}
        additionalMetaTags={[{
          name: 'keywords',
          content: 'kuşadası tabelacı hakkımızda, kuşadası reklam firması, metropol reklam vizyon, kuşadası tabela şirketi, reklam ajansı kuşadası tarihçe'
        }]}
      />

      <Hero
        title="Hakkımızda"
        description="Profesyonel ve yaratıcı çözümlerle markanızı öne çıkarıyoruz"
      />

      {/* Company Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Biz Kimiz?</h2>
              <p className="text-gray-600 mb-4">
                Metropol Reklam olarak, 15 yılı aşkın tecrübemizle reklam ve tanıtım sektöründe hizmet vermekteyiz. Modern teknolojiler ve yaratıcı çözümlerle müşterilerimizin markalarını güçlendirmeyi ve görünürlüklerini artırmayı hedefliyoruz.
              </p>
              <p className="text-gray-600 mb-4">
                Profesyonel ekibimiz, her projeye özel yaklaşımla müşterilerimizin ihtiyaçlarını anlar ve en uygun çözümleri sunar. Kaliteli malzemeler ve son teknoloji ekipmanlarımızla her işi titizlikle gerçekleştiririz.
              </p>
              <p className="text-gray-600">
                Amacımız, müşterilerimizin beklentilerinin ötesine geçerek uzun vadeli iş birlikleri kurmak ve markaların başarı hikayelerinin bir parçası olmaktır.
              </p>
            </div>
            <div className="bg-gray-200 h-80 rounded-lg flex justify-center items-center">
              <p className="text-gray-500">Şirket Görseli</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Vizyonumuz</h3>
              <p className="text-gray-600">
                Türkiye'nin reklam ve tanıtım sektöründe öncü firmalarından biri olarak, yaratıcı ve yenilikçi çözümlerimizle müşterilerimizin markalarını en üst seviyelere taşımak ve sektördeki standartları belirlemek.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Misyonumuz</h3>
              <p className="text-gray-600">
                Müşterilerimizin ihtiyaçlarını en iyi şekilde anlayarak, beklentilerini aşan kaliteli, zamanında ve bütçe dostu çözümler sunmak. Her bir proje için yaratıcı, özgün ve etkileyici ürünler geliştirmek ve müşteri memnuniyetini en üst düzeyde tutmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Değerlerimiz</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Kalite</h3>
              <p className="text-gray-600">
                Her işimizde en yüksek kalite standartlarını uygular, müşterilerimize dayanıklı ve etkileyici ürünler sunarız.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Yenilikçilik</h3>
              <p className="text-gray-600">
                Sektördeki son trendleri ve teknolojileri takip ederek yenilikçi çözümler sunar, her zaman bir adım önde olmayı hedefleriz.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Müşteri Odaklılık</h3>
              <p className="text-gray-600">
                Müşterilerimizin ihtiyaçlarını ve beklentilerini anlamak için zaman ayırır, en uygun çözümleri sunmak için çalışırız.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Zamanında Teslimat</h3>
              <p className="text-gray-600">
                Projelerimizi planlandığı şekilde zamanında teslim etmeyi taahhüt eder, müşterilerimizi asla bekletmeyiz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Ekibimiz</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500">Kişi Görseli</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800">Nurullah Anaz</h3>
                <p className="text-primary font-medium mb-3">Kurucu & Genel Müdür</p>
                <p className="text-gray-600 mb-4">
                  20 yıllık sektör deneyimiyle Metropol Reklam'ı kurmuş ve büyütmüştür.
                </p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500">Kişi Görseli</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800">Samet Anaz</h3>
                <p className="text-primary font-medium mb-3">Tasarım Direktörü</p>
                <p className="text-gray-600 mb-4">
                  Yaratıcı tasarımlarıyla müşterilerimizin hayallerini gerçeğe dönüştürür.
                </p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500">Kişi Görseli</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800">Mırtaza Yanaz</h3>
                <p className="text-primary font-medium mb-3">Üretim Müdürü</p>
                <p className="text-gray-600 mb-4">
                  Teknik bilgi ve tecrübesiyle en kaliteli üretimi garantiler.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Projeleriniz İçin Hazırız</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Markanızı öne çıkarmak ve görünürlüğünüzü artırmak için profesyonel çözümlerimizden faydalanın.
          </p>
          <a href="/contact" className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3 rounded-md transition-colors duration-200">
            Bizimle İletişime Geçin
          </a>
        </div>
      </section>
    </MainLayout>
  );
}