import { NextSeo } from 'next-seo';
import Link from 'next/link';
import MainLayout from '../components/layouts/MainLayout';
import Hero from '../components/ui/Hero';

// Product categories
const productCategories = [
  {
    id: 'totem-tabela',
    title: 'Totem Tabelalar',
    description: 'İşletmenizi uzaktan fark edilir kılan ve dikkat çeken sağlam yapıdaki totem tabelalar.',
    features: ['Işıklı Totemler', 'Işıksız Totemler', 'Dijital Ekranlı Totemler', 'Yön Gösterici Totemler']
  },
  {
    id: 'isikli-tabela',
    title: 'Işıklı Tabelalar',
    description: 'Gece ve gündüz dikkat çeken, markanızı öne çıkaran modern ışıklı tabela sistemleri.',
    features: ['LED Tabelalar', 'Neon Tabelalar', 'Lightbox Tabelalar', 'Çift Taraflı Tabelalar']
  },
  {
    id: 'isiksiz-tabela',
    title: 'Işıksız Tabelalar',
    description: 'Klasik ve dayanıklı, her bütçeye uygun kurumsal ışıksız tabela sistemleri.',
    features: ['Vinil Tabelalar', 'Branda Tabelalar', 'Metal Tabelalar', 'Ahşap Tabelalar']
  },
  {
    id: 'kutu-harf',
    title: 'Kutu Harfler',
    description: 'Şık ve profesyonel görünüm sağlayan 3 boyutlu kutu harf çözümleri.',
    features: ['Pleksi Kutu Harf', 'Alüminyum Kutu Harf', 'Paslanmaz Kutu Harf', 'LED Kutu Harf']
  },
  {
    id: 'yonlendirme',
    title: 'Yönlendirme Sistemleri',
    description: 'İç ve dış mekan için fonksiyonel yönlendirme ve bilgilendirme tabelaları.',
    features: ['Kapı İsimlikleri', 'Koridor Yönlendirmeleri', 'Kat Planları', 'Dış Mekan Yönlendirmeleri']
  },
  {
    id: 'arac-giydirme',
    title: 'Araç Giydirme Ürünleri',
    description: 'Araçlarınız için özel tasarlanmış reklam ve tanıtım ürünleri.',
    features: ['Tam Araç Folyo', 'Parçalı Giydirme', 'Mıknatıslı Levhalar', 'Geçici Uygulamalar']
  },
  {
    id: 'promosyon',
    title: 'Promosyon Ürünleri',
    description: 'Markanızı tanıtmak için özel tasarımlı promosyon ve reklam ürünleri.',
    features: ['Kurumsal Hediyeler', 'Ofis Malzemeleri', 'Tekstil Ürünleri', 'Fuarlar İçin Ürünler']
  },
  {
    id: 'dijital-baski',
    title: 'Dijital Baskı Ürünleri',
    description: 'Yüksek kalitede dijital baskı çözümleri ve ürünleri.',
    features: ['Branda Baskı', 'Poster ve Afiş', 'Folyo Baskı', 'Billboard ve Raket']
  },
];

export default function Products() {
  return (
    <MainLayout 
      title="Ürünler | Metropol Reklam" 
      description="Metropol Reklam'ın tabela ve reklam ürünleri. Kaliteli ve profesyonel çözümler."
    >
      <NextSeo
        title="Ürünlerimiz"
        description="Reklam ve tabela ihtiyaçlarınız için kaliteli ve profesyonel ürün yelpazemiz"
      />

      <Hero
        title="Ürünlerimiz"
        description="Reklam ve tabela ihtiyaçlarınız için kaliteli ve profesyonel ürün yelpazemiz"
      />

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category) => (
              <div 
                key={category.id}
                id={category.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              >
                {/* Product Image Placeholder */}
                <div className="h-56 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Ürün Görseli</p>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  
                  <h4 className="font-semibold text-gray-700 mb-2">Ürün Çeşitleri:</h4>
                  <ul className="mb-5 space-y-1">
                    {category.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600 text-sm">
                        <svg className="h-4 w-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex gap-2">
                    <Link href={`/contact?product=${category.id}`} className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200">
                      Teklif Alın
                    </Link>
                    <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded text-sm font-medium transition-colors duration-200">
                      Detaylar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Özel Üretim Çözümler</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Katalogda yer almayan, size özel tasarım ve üretim gerektiren projeleriniz için uzman ekibimizle çözüm sunuyoruz.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gray-200 h-full flex items-center justify-center p-12">
                <p className="text-gray-500">Özel Üretim Görseli</p>
              </div>
              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Hayalinizdeki Projeyi Gerçekleştirelim</h3>
                <p className="text-gray-600 mb-6">
                  Akıllı tabela sistemlerinden interaktif yönlendirmelere, büyük ölçekli dijital ekranlardan karmaşık promosyon ürünlerine kadar her türlü özel projeniz için profesyonel ekibimiz yanınızda.
                </p>
                
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-medium text-gray-800">Ücretsiz Keşif ve Danışmanlık</span>
                      <p className="text-gray-600 text-sm">Projeleriniz için yerinde inceleme ve profesyonel tavsiyeler</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-medium text-gray-800">Özel Tasarım</span>
                      <p className="text-gray-600 text-sm">Kurumsal kimliğinize uygun yaratıcı ve özgün tasarımlar</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-medium text-gray-800">Anahtar Teslim Hizmet</span>
                      <p className="text-gray-600 text-sm">Tasarımdan üretime, montajdan bakıma tam kapsamlı hizmet</p>
                    </div>
                  </li>
                </ul>
                
                <Link href="/contact?service=custom" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 inline-block">
                  Özel Teklif Alın
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ürün Katalogumuz İçin İletişime Geçin</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tam ürün katalogumuz ve fiyat bilgileri için müşteri temsilcilerimizle iletişime geçebilirsiniz.
          </p>
          <Link href="/contact" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200">
            İletişime Geçin
          </Link>
        </div>
      </section>
    </MainLayout>
  );
} 