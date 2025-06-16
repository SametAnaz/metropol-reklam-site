import { NextSeo } from 'next-seo';
import MainLayout from '../components/layouts/MainLayout';
import Hero from '../components/ui/Hero';
import AnimatedSection from '../components/ui/AnimatedSection';
import InteractivePortfolio from '../components/ui/InteractivePortfolio';

// Sample portfolio projects
const projects = [
  {
    id: 1,
    title: 'Mega AVM Tabela Projesi',
    category: 'Tabela',
    description: 'Modern ve göz alıcı kutu harf ışıklı tabela uygulaması.',
    primaryColor: '#c776a3',
    secondaryColor: '#ee8877'
  },
  {
    id: 2,
    title: 'Lüks Restoran Yönlendirme',
    category: 'Yönlendirme', 
    description: 'Şık iç mekan yönlendirme ve kapı isimlikleri tasarım ve uygulaması.',
    primaryColor: '#7d54c1',
    secondaryColor: '#c776a3'
  },
  {
    id: 3,
    title: 'Özel Tasarım Araç Giydirme',
    category: 'Araç Giydirme',
    description: 'Kurumsal filo için özel tasarım tam araç giydirme çalışması.',
    primaryColor: '#37c4b1',
    secondaryColor: '#25aad8'
  },
  {
    id: 4,
    title: 'Büyük Format Dijital Baskı',
    category: 'Dijital Baskı',
    description: 'Fuar için büyük format dijital baskı ve uygulama.',
    primaryColor: '#4092e3',
    secondaryColor: '#7d54c1'
  },
];

// Categories for filter
const categories = [
  'Tümü',
  'Tabela',
  'Dijital Baskı',
  'Araç Giydirme',
  'Yönlendirme',
  'Konsept Tasarım',
  'Promosyon',
];

export default function PortfolioPage() {
  return (
    <MainLayout
      // Title and description are now primarily handled by NextSeo below
    >
      <NextSeo
        title="Portfolyo | Metropol Reklam Kusadasi - Tabela ve Reklam Projeleri"
        description="Kuşadası Metropol Reklam tarafından tamamlanan tabela, dijital baskı ve reklam projeleri. Referanslarımızı ve önceki çalışmalarımızı inceleyin."
        canonical="https://metropolreklam.net/portfolio"
        openGraph={{
          url: 'https://metropolreklam.net/portfolio',
          title: 'Portfolyo - Metropol Reklam Kusadasi Projeleri',
          description: 'Kuşadası\\\'nda gerçekleştirdiğimiz başarılı tabela, reklam ve dijital baskı projelerimizden örnekler.',
        }}
        additionalMetaTags={[{
          name: 'keywords',
          content: 'kuşadası tabela projeleri, kuşadası reklam portfolyo, metropol reklam referanslar, dijital baskı örnekleri kuşadası, tamamlanmış tabela işleri kuşadası'
        }]}
      />
      <Hero
        title="Portfolyo"
        description="Yılların tecrübesiyle tamamladığımız projeleri inceleyin"
      />

      {/* Portfolio Interactive Cards */}
      <InteractivePortfolio 
        projects={projects}
        showCategoryFilter={true}
        categories={categories}
      />

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold mb-12 text-center">Müşterilerimizin Yorumları</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <AnimatedSection animation="fade-right" delay={100}>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-primary font-bold">AY</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Ali Yılmaz</h3>
                    <p className="text-gray-500 text-sm">XYZ Şirketi CEO'su</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Metropol Reklam ile çalışmak gerçekten profesyonel bir deneyimdi. Mağazalarımız için tasarladıkları tabelalar beklentilerimizin ötesinde oldu. Zamanında teslimat ve kaliteli hizmet için teşekkürler."
                </p>
              </div>
            </AnimatedSection>
            
            {/* Testimonial 2 */}
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-secondary font-bold">SD</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Selin Demir</h3>
                    <p className="text-gray-500 text-sm">ABC Restaurant Sahibi</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Restoranımız için yaptıkları özel tasarım yönlendirme tabelaları müşterilerimizden çok olumlu geri dönüşler aldı. Yaratıcı çözümleri ve müşteri odaklı yaklaşımları için Metropol Reklam'a teşekkür ederiz."
                </p>
              </div>
            </AnimatedSection>
            
            {/* Testimonial 3 */}
            <AnimatedSection animation="fade-left" delay={300}>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-green-500 font-bold">MK</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Mehmet Kaya</h3>
                    <p className="text-gray-500 text-sm">123 Nakliyat Genel Müdürü</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Araç filomuz için yaptıkları giydirme çalışması olağanüstüydü. Araçlarımız artık şehrin her yerinde dikkat çekiyor ve bu sayede marka bilinirliğimiz arttı. Metropol Reklam ekibine teşekkürler."
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Projeniz İçin Teklif Alın</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Siz de markanızı öne çıkaracak profesyonel çözümlerimizden faydalanmak ister misiniz?
          </p>
          <a href="/contact" className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3 rounded-md transition-colors duration-200">
            Ücretsiz Teklif Alın
          </a>
        </div>
      </section>
    </MainLayout>
  );
}