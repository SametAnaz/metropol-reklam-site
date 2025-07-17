import { NextSeo } from 'next-seo';
import MainLayout from '../components/layouts/MainLayout';
import Hero from '../components/ui/Hero';
import AnimatedSection from '../components/ui/AnimatedSection';
import InteractivePortfolio from '../components/ui/InteractivePortfolio';

// Portfolio projeleri - Buradan içerikleri düzenleyebilirsiniz
const projects = [
  // TABELA KATEGORİSİ (2 adet)
  {
    id: 1,
    title: 'Işıklı Kutu Harf Tabela',
    category: 'Tabela',
    description: 'Göz alıcı ışıklı kutu harf tabela, markanızı gece ve gündüz öne çıkarır. Yüksek görünürlüğüyle dikkat çeker, işletmenizin profesyonel ve davetkar bir imaja sahip olmasını sağlar.',
    primaryColor: '#c776a3',
    secondaryColor: '#ee8877',
    image: '/portfolio/kutuharf.jpg'
  },
  {
    id: 2,
    title: 'Neon Yazı Tabela',
    category: 'Tabela',
    description: 'Motivasyonu ve enerjiyi mekâna yansıtan bu neon tabela, parlak renkleri ve dinamik tasarımıyla ortamda fark yaratır. Özellikle spor salonları için ideal olan bu çözüm, müşteri ilgisini anında üzerine çekiyor.',
    primaryColor: '#7d54c1',
    secondaryColor: '#c776a3',
    image: '/portfolio/neon_tabela.jpg'
  },

  // DİJİTAL BASKI KATEGORİSİ (2 adet)
  {
    id: 3,
    title: 'Dış Cephe Giydirme',
    category: 'Dijital Baskı',
    description: 'Büyük projeler için etkili tanıtım! Bu dev vinil cephe afişi, projelerinizi şehirde en iyi şekilde öne çıkarır ve dikkat çekici görsellerle potansiyel müşterilerinizin ilgisini anında yakalar.',
    primaryColor: '#4092e3',
    secondaryColor: '#7d54c1',
    image: '/portfolio/cephe_giydirme.jpg'
  },
  {
    id: 4,
    title: 'Dijital Baskı Uygulaması',
    category: 'Dijital Baskı',
    description: 'Yüksek çözünürlüklü dijital baskı ile tanıtımınızı profesyonel ve göz alıcı şekilde hazırlayın. Dayanıklı malzeme ve canlı renkler sayesinde markanız her ortamda fark edilir.',
    primaryColor: '#25aad8',
    secondaryColor: '#4092e3',
    image: '/portfolio/dijital_baski.jpg' // Görsel ekleyebilirsiniz
  },

  // ARAÇ GİYDİRME KATEGORİSİ (2 adet)  
  {
    id: 5,
    title: 'Kurumsal Araç Giydirme',
    category: 'Araç Giydirme',
    description: 'Markanızı yolda da konuşturun! Bu özel tasarım tam araç kaplama çalışması, kurumsal kimliğinizi güçlü bir şekilde yansıtarak her yolculuğu bir reklam fırsatına dönüştürür. Filo ve bireysel çözümlerle fark yaratın.',
    primaryColor: '#37c4b1',
    secondaryColor: '#25aad8',
    image: '/portfolio/arac_giydirme.jpg'
  },
  {
    id: 6,
    title: 'Ticari Araç Giydirme',
    category: 'Araç Giydirme',
    description: 'Ticari araçlar için etkili reklam ve tanıtım amaçlı araç giydirme hizmeti.',
    primaryColor: '#2dd4bf',
    secondaryColor: '#37c4b1',
    image: '/portfolio/arac_kaplama2.jpg'

  },
    {
    id: 7,
    title: 'Kişisel Araç Giydirme',
    category: 'Araç Giydirme',
    description: 'Aracınıza karakter katmak ve sıradanlıktan ayrışmak için uygulanan bu kişisel araç giydirme, tarzınızı yolda da göstermenin en etkili yoludur. Fark yaratan tasarım seçenekleriyle öne çıkın.',
    primaryColor: '#2dd4bf',
    secondaryColor: '#37c4b1',
    image: '/portfolio/arac_kaplama3.jpg'

  },

  // YÖNLENDİRME KATEGORİSİ (2 adet)
  {
    id: 8,
    title: 'Dış Mekan Yönlendirme Sistemi',
    category: 'Yönlendirme',
    description: 'İş yeriniz için profesyonel iç mekan yönlendirme ve bilgilendirme sistemleri. Ziyaretçilerin kolayca yön bulmasını sağlayan tasarımlar.',
    primaryColor: '#8b5cf6',
    secondaryColor: '#a855f7',
    image: '/gallery/yonlendirme1.jpeg'
  },
  {
    id: 9,
    title: 'Restoran - Cafe Yönlendirme Tabelaları',
    category: 'Yönlendirme',
    description: 'Restoran ve cafeler için yönlendirme ve bilgilendirme çözümleri.',
    primaryColor: '#ec4899',
    secondaryColor: '#8b5cf6',
    image: '/gallery/menu1.jpeg'
  },

  // KONSEPT TASARIM KATEGORİSİ (2 adet)
  {
    id: 10,
    title: 'Işıklı Sahne Platformu',
    category: 'Konsept Tasarım',
    description: 'Konser, etkinlik ve tanıtımlar için tasarlanan bu ışıklı sahne platformu, modern görüntüsü ve parlak detaylarıyla dikkat çeker. Mekâna enerji katar ve markanızı sahnede öne çıkarır.',
    primaryColor: '#f59e0b',
    secondaryColor: '#ef4444',
    image: '/portfolio/sahne_konsept.jpg' // Görsel ekleyebilirsiniz
  },
  {
    id: 11,
    title: 'Kişiye Özel Tasarım Masa Oyun Seti',
    category: 'Konsept Tasarım',
    description: 'Taraftarlara özel baskı ile hazırlanan bu masa oyunu, hem eğlenceli hem de dekoratif bir deneyim sunar. Kaliteli malzeme ve canlı görsellerle kişisel zevkinizi yansıtın.',
    primaryColor: '#ef4444',
    secondaryColor: '#dc2626',
    image: '/portfolio/konsept1.jpg' 
  },

  // PROMOSYON KATEGORİSİ (2 adet)
  {
    id: 12,
    title: 'Kurumsal Promosyon Ürünleri',
    category: 'Promosyon',
    description: 'Şirketler için özel tasarım kurumsal promosyon ürünleri ve hediyeler. Markanızı müşterilerinizin günlük hayatına taşıyacak kalem, defter, çanta gibi kaliteli ve kullanışlı promosyon ürünleriyle fark yaratın.',
    primaryColor: '#10b981',
    secondaryColor: '#059669',
    image: '/gallery/promosyon5.jpeg'
  },
  {
    id: 13,
    title: 'Festival Etkinlik Ürünleri',
    category: 'Promosyon',
    description: 'Festival ve etkinlikler için özel tasarım promosyon ürünleri ve tanıtım malzemeleri. Katılımcıların etkinliğinizi hatırlamalarını sağlayacak, markanızı güçlendirecek özel tasarlanmış promosyon ürünleri.',
    primaryColor: '#f97316',
    secondaryColor: '#ea580c',
    image: '/gallery/promosyon1.jpeg'
  },

  // OKUL TABELALARİ KATEGORİSİ (2 adet)
  {
    id: 14,
    title: 'Okul Giriş Tabelası',
    category: 'Okul Tabelaları',
    description: 'MEB standartlarına uygun, uzun ömürlü tabelalar eğitim kurumlarının ciddiyetini vurgular. Okulunuzun adını uzaktan bile kolayca fark ettirir, prestij kazandırır ve güven yaratır.',
    primaryColor: '#3b82f6',
    secondaryColor: '#1d4ed8',
    image: '/portfolio/okul_tabela1.jpg' // Görsel ekleyebilirsiniz
  },
 {
    id: 15,
    title: 'Atatürk Köşesi Tasarımı',
    category: 'Okul Tabelaları',
    description: 'Modern ışıklandırma ile hazırlanan Atatürk köşesi, kurumunuzun girişinde etkileyici ve anlamlı bir atmosfer yaratır.',
    primaryColor: '#0ea5e9',
    secondaryColor: '#0284c7',
    image: '/portfolio/ataturk_kosesi.jpg' // Görsel ekleyebilirsiniz
  },

  {
    id: 16,
    title: 'Okul İç Mekan Yönlendirme',
    category: 'Okul Tabelaları',
    description: 'Tarihi anlatıları ve görselleri bir araya getiren bu duvar tasarımı, okullarda hem bilgilendirici hem de ilham verici bir ortam sunar.',
    primaryColor: '#0ea5e9',
    secondaryColor: '#0284c7',
    image: '/portfolio/okul_tabela2.jpg'
  }
  
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
  'Okul Tabelaları',
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
      <section className="py-8 md:py-16 min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-2 md:px-4">
          <InteractivePortfolio 
            projects={projects}
            showCategoryFilter={true}
            categories={categories}
          />
        </div>
      </section>

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