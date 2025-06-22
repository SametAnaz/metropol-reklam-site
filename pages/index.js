import Link from 'next/link';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '../components/layouts/MainLayout';
import AnimatedSection from '../components/ui/AnimatedSection';
import InteractivePortfolio from '../components/ui/InteractivePortfolio';
import styles from '../styles/HeroAnimation.module.css';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

const services = [
  {
    id: 'tabela',
    title: 'Tabela',
    description: 'Işıklı, ışıksız, kutu harf, totem ve her tür profesyonel tabela çözümleri.',
    features: ['Işıklı Tabela', 'Işıksız Tabela', 'LED Tabela', 'Pleksi Tabela', 'Vinil Tabela', 'Alüminyum Tabela']
  },
  {
    id: 'dijital-baski',
    title: 'Dijital Baskı',
    description: 'Yüksek kaliteli baskı teknolojileri ile banner, afiş, branda ve daha fazlası.',
    features: ['Banner Baskı', 'Afiş Baskı', 'Branda Baskı', 'UV Baskı', 'Folyo Baskı', 'Mesh Baskı']
  },
  {
    id: 'arac-giydirme',
    title: 'Araç Giydirme',
    description: 'Kurumsal veya kişisel araçlarınız için tam veya parçalı araç giydirme hizmetleri.',
    features: ['Tam Araç Giydirme', 'Parçalı Araç Giydirme', 'Araç Logosu', 'Ticari Araç Giydirme', 'Otobüs Giydirme', 'Araba Folyo Kaplama']
  },
  {
    id: 'kutu-harf',
    title: 'Kutu Harf',
    description: 'Modern ve profesyonel görünüm sağlayan 3 boyutlu kutu harf çözümleri.',
    features: ['Pleksi Kutu Harf', 'Alüminyum Kutu Harf', 'Işıklı Kutu Harf', 'Paslanmaz Kutu Harf', 'LED Kutu Harf', 'Kabartma Harfler']
  },
  {
    id: 'yonlendirme',
    title: 'Yönlendirme Sistemleri',
    description: 'İç ve dış mekan için profesyonel yönlendirme ve işaretleme sistemleri.',
    features: ['İç Mekan Yönlendirme', 'Dış Mekan Yönlendirme', 'Işıklı Yönlendirme', 'Pano Yönlendirme', 'Kapı İsimlikleri', 'Kat Planları']
  },
  {
    id: 'promosyon',
    title: 'Promosyon Ürünleri',
    description: 'Markanızı tanıtmak için özel tasarım promosyon ürünleri.',
    features: ['Özel Tasarım Ürünler', 'Kalemler ve Defterler', 'Çantalar', 'T-shirt ve Tekstil', 'Bardak ve Termos', 'Anahtarlıklar']
  }
];

// Portfolio projects - Güncel proje listesi
const portfolioProjects = [
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
    image: '/portfolio/dijital_baski.jpg'
  },

  // ARAÇ GİYDİRME KATEGORİSİ (3 adet)  
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
    title: 'İç Mekan Yönlendirme Sistemi',
    category: 'Yönlendirme',
    description: 'Ofis ve iş merkezleri için profesyonel iç mekan yönlendirme ve bilgilendirme sistemleri.',
    primaryColor: '#8b5cf6',
    secondaryColor: '#a855f7'
  },
  {
    id: 9,
    title: 'Hastane Yönlendirme Tabelaları',
    category: 'Yönlendirme',
    description: 'Hastane ve sağlık kuruluşları için kapsamlı yönlendirme ve bilgilendirme çözümleri.',
    primaryColor: '#ec4899',
    secondaryColor: '#8b5cf6'
  },

  // KONSEPT TASARIM KATEGORİSİ (2 adet)
  {
    id: 10,
    title: 'Işıklı Sahne Platformu',
    category: 'Konsept Tasarım',
    description: 'Konser, etkinlik ve tanıtımlar için tasarlanan bu ışıklı sahne platformu, modern görüntüsü ve parlak detaylarıyla dikkat çeker. Mekâna enerji katar ve markanızı sahnede öne çıkarır.',
    primaryColor: '#f59e0b',
    secondaryColor: '#ef4444',
    image: '/portfolio/sahne_konsept.jpg'
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
    description: 'Şirketler için özel tasarım kurumsal promosyon ürünleri ve hediyeler.',
    primaryColor: '#10b981',
    secondaryColor: '#059669'
  },
  {
    id: 13,
    title: 'Festival Etkinlik Ürünleri',
    category: 'Promosyon',
    description: 'Festival ve etkinlikler için özel tasarım promosyon ürünleri ve tanıtım malzemeleri.',
    primaryColor: '#f97316',
    secondaryColor: '#ea580c'
  },

  // OKUL TABELALARİ KATEGORİSİ (3 adet)
  {
    id: 14,
    title: 'Okul Giriş Tabelası',
    category: 'Okul Tabelaları',
    description: 'MEB standartlarına uygun, uzun ömürlü tabelalar eğitim kurumlarının ciddiyetini vurgular. Okulunuzun adını uzaktan bile kolayca fark ettirir, prestij kazandırır ve güven yaratır.',
    primaryColor: '#3b82f6',
    secondaryColor: '#1d4ed8',
    image: '/portfolio/okul_tabela1.jpg'
  },
  {
    id: 15,
    title: 'Atatürk Köşesi Tasarımı',
    category: 'Okul Tabelaları',
    description: 'Modern ışıklandırma ile hazırlanan Atatürk köşesi, kurumunuzun girişinde etkileyici ve anlamlı bir atmosfer yaratır.',
    primaryColor: '#0ea5e9',
    secondaryColor: '#0284c7',
    image: '/portfolio/ataturk_kosesi.jpg'
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

// Categories for filter - Portfolio sayfası ile aynı kategoriler
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

// Product categories
const productCategories = [
  {
    id: 'totem-tabela',
    title: 'Totem Tabelalar',
    description: 'İşletmenizi uzaktan fark edilir kılan ve dikkat çeken sağlam yapıdaki totem tabelar.',
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
    features: ['Vinil Tabelalar', 'Branda Tabelalar', 'Metal Tabelar', 'Ahşap Tabelar']
  },
  {
    id: 'kutu-harf',
    title: 'Kutu Harfler',
    description: 'Şık ve profesyonel görünüm sağlayan 3 boyutlu kutu harf çözümleri.',
    features: ['Pleksi Kutu Harf', 'Alüminyum Kutu Harf', 'Paslanmaz Kutu Harf', 'LED Kutu Harf']
  }
];

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [serverMessage, setServerMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const onSubmit = async (data) => {
    try {
      setServerMessage("");
      setMessageType("");
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessageType("success");
        setServerMessage("Mesajınız başarıyla gönderildi! Teşekkürler.");
        reset();
      } else {
        setMessageType("error");
        setServerMessage(result.message || "Bir hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setServerMessage("Gönderim sırasında bir hata oluştu.");
    }
  };

  return (
    <MainLayout
      // Title and description are now primarily handled by NextSeo below
    >
      <NextSeo
        title="Ana Sayfa | Metropol Reklam Kusadasi - Tabela ve Reklamcılık"
        description="Kuşadası Metropol Reklam: Lider tabelacı ve reklam ajansınız. Işıklı tabela, dijital baskı, araç giydirme, fuar standları ve tüm reklam ihtiyaçlarınız için Kuşadası'nda hizmetinizdeyiz."
        canonical="https://metropolreklam.net/"
        openGraph={{
          url: 'https://metropolreklam.net/',
          title: 'Metropol Reklam Kusadasi | Tabela, Reklam, Dijital Baskı',
          description: 'Kuşadası tabelacı ve reklam ihtiyaçlarınız için Metropol Reklam. Yaratıcı tasarımlar, kaliteli üretim ve profesyonel montaj hizmetleri.',
          images: [
            {
              url: 'https://metropolreklam.net/images/og-home.jpg', // Specific OG image for home
              width: 1200,
              height: 630,
              alt: 'Metropol Reklam Kuşadası Ana Sayfa',
            },
          ],
        }}
        additionalMetaTags={[{
          name: 'keywords',
          content: 'kuşadası tabelacı, kuşadası reklam, ana sayfa metropol reklam, tabela kuşadası, dijital baskı kuşadası, araç giydirme kuşadası, fuar standı kuşadası, reklam ajansı kuşadası, metropol reklam iletişim'
        }]}
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

      {/* About Section - Hakkımızda İçeriği */}
      <section className="py-20 bg-white relative" id="about">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-100 to-blue-100 rounded-full opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-blue-100 to-orange-100 rounded-full opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">Hakkımızda</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto mb-8"></div>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <AnimatedSection animation="fade-right">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-gray-800">Biz Kimiz?</h3>
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
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-80 rounded-lg flex justify-center items-center overflow-hidden shadow-lg">
                <Image 
                  src="/metropol_logo_1080x1080.png" 
                  alt="Metropol Reklam Logosu" 
                  width={300}
                  height={300}
                  className="object-contain hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Vision & Mission */}
          <AnimatedSection animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Vizyonumuz</h3>
                <p className="text-gray-600">
                  Türkiye'nin reklam ve tanıtım sektöründe öncü firmalarından biri olarak, yaratıcı ve yenilikçi çözümlerimizle müşterilerimizin markalarını en üst seviyelere taşımak ve sektördeki standartları belirlemek.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Misyonumuz</h3>
                <p className="text-gray-600">
                  Müşterilerimizin ihtiyaçlarını en iyi şekilde anlayarak, beklentilerini aşan kaliteli, zamanında ve bütçe dostu çözümler sunmak. Her bir proje için yaratıcı, özgün ve etkileyici ürünler geliştirmek ve müşteri memnuniyetini en üst düzeyde tutmak.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Values */}
          <AnimatedSection animation="fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Kalite</h3>
                <p className="text-gray-600">
                  Her işimizde en yüksek kalite standartlarını uygular, müşterilerimize dayanıklı ve etkileyici ürünler sunarız.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Yenilikçilik</h3>
                <p className="text-gray-600">
                  Sektördeki son trendleri ve teknolojileri takip ederek yenilikçi çözümler sunar, her zaman bir adım önde olmayı hedefleriz.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Müşteri Odaklılık</h3>
                <p className="text-gray-600">
                  Müşterilerimizin ihtiyaçlarını ve beklentilerini anlamak için zaman ayırır, en uygun çözümleri sunmak için çalışırız.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Zamanında Teslimat</h3>
                <p className="text-gray-600">
                  Projelerimizi planlandığı şekilde zamanında teslim etmeyi taahhüt eder, müşterilerimizi asla bekletmeyiz.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section - Hizmetlerimiz İçeriği */}
      <section className="py-20 bg-gray-50 relative" id="services">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">Hizmetlerimiz</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto mb-8"></div>
              <p className="text-lg max-w-2xl mx-auto text-gray-600">
                Markanızı öne çıkarmak için profesyonel reklam çözümlerimizi keşfedin
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} animation="fade-up" delay={index * 100}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="h-3 bg-gradient-to-r from-orange-400 to-blue-500"></div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h2>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">Özellikler:</h3>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/contact?service=${service.id}`} className="inline-block bg-gradient-to-r from-orange-500 to-blue-500 hover:opacity-90 text-white font-medium px-6 py-2 rounded-md transition-opacity duration-200">
                      Teklif Alın
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section - Portföy İçeriği */}
      <section className="py-20 bg-white" id="portfolio">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">Portföyümüz</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto mb-8"></div>
              <p className="text-lg max-w-2xl mx-auto text-gray-600">
                Yılların tecrübesiyle tamamladığımız projeleri inceleyin
              </p>
            </div>
          </AnimatedSection>

          <InteractivePortfolio 
            projects={portfolioProjects}
            showCategoryFilter={true}
            categories={categories}
          />

          <div className="text-center mt-12">
            <Link href="/portfolio" className="bg-gradient-to-r from-orange-500 to-blue-500 text-white font-bold px-8 py-3 rounded-md hover:from-orange-600 hover:to-blue-600 transition-all duration-200">
              Tüm Projelerimizi Görün
            </Link>
          </div>

          {/* Testimonials */}
          <AnimatedSection animation="fade-up">
            <div className="bg-gray-50 rounded-2xl p-12 mb-12 mt-16">
              <h3 className="text-3xl font-bold mb-12 text-center text-gray-800">Müşterilerimizin Yorumları</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimatedSection animation="fade-right" delay={100}>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-orange-500 font-bold">AY</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Ali Yılmaz</h3>
                        <p className="text-gray-500 text-sm">XYZ Şirketi CEO'su</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      "Metropol Reklam ile çalışmak gerçekten profesyonel bir deneyimdi. Mağazalarımız için tasarladıkları tabelalar beklentilerimizin ötesinde oldu."
                    </p>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection animation="fade-up" delay={200}>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-blue-500 font-bold">SD</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Selin Demir</h3>
                        <p className="text-gray-500 text-sm">ABC Restaurant Sahibi</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      "Restoranımız için yaptıkları özel tasarım yönlendirme tabelaları müşterilerimizden çok olumlu geri dönüşler aldı."
                    </p>
                  </div>
                </AnimatedSection>
                
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
                      "Araç filomuz için yaptıkları giydirme çalışması olağanüstüydü. Araçlarımız artık şehrin her yerinde dikkat çekiyor."
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Products Section - Ürünler İçeriği */}
      <section className="py-20 bg-gray-50" id="products">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">Ürünlerimiz</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto mb-8"></div>
              <p className="text-lg max-w-2xl mx-auto text-gray-600">
                Reklam ve tabela ihtiyaçlarınız için kaliteli ve profesyonel ürün yelpazemiz
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {productCategories.map((category, index) => (
              <AnimatedSection key={category.id} animation="fade-up" delay={index * 100}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
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
                          <svg className="h-4 w-4 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex gap-2">
                      <Link href={`/contact?product=${category.id}`} className="bg-gradient-to-r from-orange-500 to-blue-500 hover:opacity-90 text-white px-4 py-2 rounded text-sm font-medium transition-opacity duration-200">
                        Teklif Alın
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Custom Products */}
          <AnimatedSection animation="fade-up">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-gray-200 h-full flex items-center justify-center p-12">
                  <p className="text-gray-500">Özel Üretim Görseli</p>
                </div>
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Özel Üretim Çözümler</h3>
                  <p className="text-gray-600 mb-6">
                    Katalogda yer almayan, size özel tasarım ve üretim gerektiren projeleriniz için uzman ekibimizle çözüm sunuyoruz.
                  </p>
                  
                  <ul className="mb-8 space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-orange-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">Ücretsiz Keşif ve Danışmanlık</span>
                        <p className="text-gray-600 text-sm">Projeleriniz için yerinde inceleme ve profesyonel tavsiyeler</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-orange-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">Özel Tasarım</span>
                        <p className="text-gray-600 text-sm">Kurumsal kimliğinize uygun yaratıcı ve özgün tasarımlar</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-orange-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">Anahtar Teslim Hizmet</span>
                        <p className="text-gray-600 text-sm">Tasarımdan üretime, montajdan bakıma tam kapsamlı hizmet</p>
                      </div>
                    </li>
                  </ul>
                  
                  <Link href="/contact?service=custom" className="bg-gradient-to-r from-orange-500 to-blue-500 hover:opacity-90 text-white px-6 py-3 rounded-md font-medium transition-opacity duration-200 inline-block">
                    Özel Teklif Alın
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section - İletişim İçeriği */}
      <section className="py-20 bg-white" id="contact">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">İletişim</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto mb-8"></div>
              <p className="text-lg max-w-2xl mx-auto text-gray-600">
                Profesyonel reklam çözümleri için bize ulaşın
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <AnimatedSection animation="fade-right">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <MapPinIcon className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Adres</h4>
                      <p className="text-gray-600 mt-1">Kuşadası/Aydın, Türkiye</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <PhoneIcon className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Telefon</h4>
                      <a href="tel:+905551234567" className="text-gray-600 mt-1 hover:text-orange-500 transition-colors">
                        +90 (555) 123 45 67
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <EnvelopeIcon className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">E-posta</h4>
                      <a href="mailto:metropolreklam@hotmail.com" className="text-gray-600 mt-1 hover:text-orange-500 transition-colors">
                        metropolreklam@hotmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <ClockIcon className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Çalışma Saatleri</h4>
                      <p className="text-gray-600 mt-1">Pazartesi - Cumartesi: 08.30 - 18:00</p>
                      <p className="text-gray-600">Pazar: Kapalı</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection animation="fade-left">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Bize Ulaşın</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    İsim
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "İsim zorunludur." })}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Adınız Soyadınız"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-Posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "E-posta zorunludur.",
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: "Geçerli bir e-posta girin.",
                      },
                    })}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="ornek@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message", {
                      required: "Mesaj zorunludur.",
                      minLength: {
                        value: 10,
                        message: "Mesaj en az 10 karakter olmalı.",
                      },
                    })}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:opacity-90 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                  </button>
                </div>

                {serverMessage && (
                  <div className={`p-3 rounded-md ${
                    messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {serverMessage}
                  </div>
                )}
              </form>
              </div>
            </AnimatedSection>
          </div>

          {/* Google Maps */}
          <AnimatedSection animation="fade-up">
            <div className="mt-16">
              <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Bizi Ziyaret Edin</h3>
              <div className="max-w-6xl mx-auto">
                <div className="h-[450px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  <iframe
                    src="https://maps.google.com/maps?q=37.73802538464112,27.29327684619427&hl=tr&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Metropol Reklam Konum - Kuşadası, Aydın"
                  ></iframe>
                </div>
                <div className="mt-6 text-center">
                  <a
                    href="https://maps.app.goo.gl/3LVeZZvC1885Te9f8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-blue-500 hover:opacity-90 text-white px-6 py-3 rounded-lg font-medium transition-opacity duration-300"
                  >
                    <MapPinIcon className="h-5 w-5" />
                    <span>Google Maps'te Aç</span>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Projeleriniz İçin Bizimle İletişime Geçin</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Markanızı güçlendirmek ve görünürlüğünüzü artırmak için 
            profesyonel çözümlerimizden faydalanın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#contact" className="bg-white text-orange-500 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors">
              Hemen İletişime Geçin
            </Link>
            <Link href="/services" className="border-2 border-white text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-white hover:text-orange-500 transition-colors">
              Tüm Hizmetlerimiz
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
