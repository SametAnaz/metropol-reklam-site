import { NextSeo } from 'next-seo';
import MainLayout from '../components/layouts/MainLayout';
import Hero from '../components/ui/Hero';

// Sample portfolio projects
const projects = [
  {
    id: 1,
    title: 'Mega AVM Tabela Projesi',
    category: 'Tabela',
    description: 'Modern ve göz alıcı kutu harf ışıklı tabela uygulaması.',
  },
  {
    id: 2,
    title: 'Lüks Restoran Yönlendirme',
    category: 'Yönlendirme',
    description: 'Şık iç mekan yönlendirme ve kapı isimlikleri tasarım ve uygulaması.',
  },
  {
    id: 3,
    title: 'Özel Tasarım Araç Giydirme',
    category: 'Araç Giydirme',
    description: 'Kurumsal filo için özel tasarım tam araç giydirme çalışması.',
  },
  {
    id: 4,
    title: 'Büyük Format Dijital Baskı',
    category: 'Dijital Baskı',
    description: 'Fuar için büyük format dijital baskı ve uygulama.',
  },
  {
    id: 5,
    title: 'Mağaza Konsept Tasarımı',
    category: 'Konsept Tasarım',
    description: 'Zincir mağazalar için kurumsal kimlik ve konsept tasarım uygulaması.',
  },
  {
    id: 6,
    title: 'Festival Alanı Promosyon',
    category: 'Promosyon',
    description: 'Büyük festival için kurumsal promosyon ürünleri tasarım ve üretimi.',
  },
  {
    id: 7,
    title: 'Şehir Otobüsleri Reklam',
    category: 'Araç Giydirme',
    description: 'Şehir otobüsleri için reklam tasarımı ve uygulama.',
  },
  {
    id: 8,
    title: 'Otel Tabelaları',
    category: 'Tabela',
    description: '5 yıldızlı otel için iç ve dış mekan ışıklı tabela uygulaması.',
  },
  {
    id: 9,
    title: 'Kampüs Yönlendirme Sistemleri',
    category: 'Yönlendirme',
    description: 'Üniversite kampüsü için kapsamlı yönlendirme sistemi tasarımı.',
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

export default function Portfolio() {
  return (
    <MainLayout 
      title="Portföy | Metropol Reklam" 
      description="Metropol Reklam'ın başarıyla tamamladığı projeler ve referanslar."
    >
      <NextSeo
        title="Portföyümüz"
        description="Yılların tecrübesiyle tamamladığımız projeleri inceleyin."
      />

      <Hero
        title="Portföyümüz"
        description="Yılların tecrübesiyle tamamladığımız projeleri inceleyin"
      />

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Portfolio items will be added here */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Proje Görseli</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Proje Adı</h3>
                <p className="text-gray-600">Proje açıklaması burada yer alacak.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Müşterilerimizin Yorumları</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
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
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-primary font-bold">SD</span>
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
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-primary font-bold">MK</span>
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