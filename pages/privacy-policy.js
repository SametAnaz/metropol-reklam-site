import MainLayout from '../components/layouts/MainLayout';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <NextSeo
        title="Gizlilik Politikası | Metropol Reklam"
        description="Metropol Reklam gizlilik politikası ve kullanım koşulları."
        canonical="https://metropolreklam.net/privacy-policy"
      />

      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center">METROPOL REKLAM GİZLİLİK POLİTİKASI</h1>
          <p className="text-sm text-gray-500 mt-2 text-center">Son Güncelleme: 19 Temmuz 2025</p>
          
          <div className="mt-4 flex items-center justify-center space-x-4">
            <span className="px-3 py-1 bg-primary text-white rounded font-medium">Türkçe</span>
            <Link href="/privacy-policy-en" className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded font-medium transition duration-300">
              English
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Giriş</h2>
          <p>
            Metropol Reklam ("Şirket", "biz", "bize" veya "bizim") olarak, www.metropolreklam.net ("Site") web sitemizi ziyaret eden kullanıcılarımızın ("Kullanıcı", "siz") gizliliğine saygı duyuyoruz. Bu Gizlilik Politikası, Site aracılığıyla topladığımız kişisel verilerin türlerini, bu verileri nasıl kullandığımızı, kimlerle paylaştığımızı ve bu verilerle ilgili haklarınızı açıklamaktadır.
          </p>
          <p>
            Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca hazırlanmıştır.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Veri Sorumlusu</h2>
          <p>
            KVKK kapsamında kişisel verilerinizle ilgili veri sorumlusu, Davutlar, Köroğlu Sk. No:2/B, 09140 Kuşadası/Aydın adresinde mukim Metropol Reklam'dır.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Topladığımız Kişisel Veriler</h2>
          <p>Sitemizi kullanırken aşağıdaki türde kişisel verileri toplayabiliriz:</p>
          
          <h3 className="text-lg font-medium mt-6 mb-3">Doğrudan Sizin Tarafından Sağlanan Veriler:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>İletişim Formu:</strong> Sitemizdeki iletişim formunu doldurduğunuzda adınız, soyadınız, e-posta adresiniz, telefon numaranız ve mesajınız içeriğindeki diğer bilgiler.</li>
            <li><strong>Kullanıcı Hesabı (varsa):</strong> Admin paneli veya kullanıcı girişi için oluşturulan hesaplarda e-posta adresiniz ve şifrelenmiş parolanız.</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3">Otomatik Olarak Toplanan Veriler:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Analitik Verileri:</strong> Sitemizi ziyaret ettiğinizde, site kullanımını analiz etmek amacıyla Umami Analytics altyapısı ile anonim veya takma adlı veriler toplarız. Bu veriler arasında ziyaret edilen sayfalar, sitede geçirilen süre, kullanılan cihaz türü, işletim sistemi, tarayıcı bilgisi ve coğrafi konum (ülke/şehir bazında) bulunabilir. Bu veriler, kişisel kimliğinizi doğrudan ortaya çıkarmaz.</li>
            <li><strong>Çerezler (Cookies):</strong> Oturum yönetimi (örneğin, admin panelinde oturumunuzu açık tutmak), site performansını artırmak ve kullanıcı deneyimini iyileştirmek için çerezler kullanıyoruz.</li>
            <li><strong>Google reCAPTCHA Verileri:</strong> Formlarımızı spam ve kötüye kullanıma karşı korumak için Google reCAPTCHA hizmetini kullanıyoruz. Bu hizmet, donanım ve yazılım bilgileri gibi verileri toplayarak analiz için Google'a gönderir. Bu verilerin kullanımı Google'ın Gizlilik Politikası'na tabidir.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Kişisel Verilerinizi Neden ve Nasıl Kullanıyoruz?</h2>
          <p>Topladığımız kişisel verileri aşağıdaki amaçlarla kullanıyoruz:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Hizmet Sunumu:</strong> Taleplerinize ve sorularınıza yanıt vermek, size bilgi sunmak.</li>
            <li><strong>İletişim:</strong> Sizinle iletişime geçmek ve talepleriniz hakkında sizi bilgilendirmek.</li>
            <li><strong>Site Güvenliği:</strong> Sitemizi ve hizmetlerimizi güvende tutmak, sahtekarlığı ve kötüye kullanımı önlemek (örn: reCAPTCHA).</li>
            <li><strong>İyileştirme ve Analiz:</strong> Sitemizin performansını ve kullanıcı deneyimini analiz ederek hizmetlerimizi geliştirmek (örn: Umami Analytics).</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Kişisel Verilerinizi Kimlerle Paylaşıyoruz?</h2>
          <p>
            Kişisel verilerinizi, yasal zorunluluklar dışında, onayınız olmaksızın üçüncü taraflarla paylaşmayız. Ancak, hizmetlerimizi sunabilmek için aşağıdaki hizmet sağlayıcılarla veri paylaşımı yapabiliriz:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Hosting ve Veritabanı Sağlayıcıları:</strong> Web sitemiz Vercel üzerinde barındırılmaktadır ve verilerimiz MySQL veritabanında saklanmaktadır.</li>
            <li><strong>E-posta Gönderim Servisleri:</strong> İletişim formları aracılığıyla gönderilen e-postalar için Resend API gibi üçüncü parti servisleri kullanabiliriz.</li>
            <li><strong>Güvenlik Sağlayıcıları:</strong> Spam koruması için Google reCAPTCHA hizmeti.</li>
            <li><strong>Widget Sağlayıcıları:</strong> Sitemizde Google Yorumları gibi özellikleri sunmak için Elfsight gibi üçüncü parti widget sağlayıcılarını kullanabiliriz.</li>
            <li><strong>Yasal Merciler:</strong> Yasal bir talep olması durumunda, verilerinizi yetkili kamu kurum ve kuruluşları ile paylaşabiliriz.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Veri Sahibi Olarak Haklarınız (KVKK Madde 11)</h2>
          <p>Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
            <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
            <li>Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme,</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
            <li>KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
            <li>Veri düzeltme, silme veya yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
            <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
            <li>Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
          </ul>
          <p>
            Bu haklarınızı kullanmak için bizimle <a href="mailto:info@metropolreklam.net" className="text-primary hover:underline">info@metropolreklam.net</a> e-posta adresi üzerinden iletişime geçebilirsiniz.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Politika Değişiklikleri</h2>
          <p>
            Bu Gizlilik Politikası'nı zaman zaman güncelleyebiliriz. Değişiklikler sitemizde yayınlandığı tarihte yürürlüğe girer.
          </p>
        </div>

        <hr className="my-12 border-gray-300" />

        <h1 className="text-3xl font-bold mb-8 text-center">METROPOL REKLAM KULLANICI SÖZLEŞMESİ</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">Son Güncelleme: 19 Temmuz 2025</p>

        <div className="prose prose-lg max-w-none">
          <p className="italic mb-6">
            Lütfen www.metropolreklam.net ("Site") web sitemizi kullanmadan önce bu Kullanıcı Sözleşmesi'ni ("Sözleşme") dikkatlice okuyunuz.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">1. Taraflar ve Kabul</h2>
          <p>
            Bu Sözleşme, bir tarafta Davutlar, Köroğlu Sk. No:2/B, 09140 Kuşadası/Aydın adresinde mukim Metropol Reklam ("Şirket") ile diğer tarafta Site'yi kullanan kişi ("Kullanıcı") arasında akdedilmiştir. Site'ye erişim sağlamakla veya Site'yi kullanmakla, bu Sözleşme'nin şartlarını ve koşullarını okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz. Bu şartları kabul etmiyorsanız, Site'yi kullanmamalısınız.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Hizmetlerin Tanımı</h2>
          <p>
            Bu Site, Metropol Reklam'ın sunduğu reklamcılık hizmetleri hakkında bilgi vermek, projelerini (galeri) sergilemek ve kullanıcıların Şirket ile iletişime geçmesini sağlamak amacıyla kurulmuştur.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Fikri Mülkiyet Hakları</h2>
          <p>
            Site'de yer alan tüm metinler, görseller, logolar, grafikler, tasarımlar ve diğer materyallerin ("İçerik") tüm fikri mülkiyet hakları Metropol Reklam'a aittir veya lisans altında kullanılmaktadır. Kullanıcı, Şirket'in yazılı izni olmaksızın İçerik'i kopyalayamaz, çoğaltamaz, dağıtamaz veya türev çalışmalarını oluşturamaz.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Kullanıcı Yükümlülükleri</h2>
          <p>Kullanıcı, Site'yi kullanırken:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Yürürlükteki tüm yasalara uymayı,</li>
            <li>İletişim formları veya diğer etkileşim alanlarında doğru ve güncel bilgiler sunmayı,</li>
            <li>Site'nin güvenliğini tehlikeye atacak veya çalışmasını engelleyecek herhangi bir faaliyette bulunmamayı (spam göndermek, virüs bulaştırmak, hacklemeye çalışmak vb.),</li>
            <li>Diğer kullanıcıların veya Şirket'in haklarına tecavüz etmemeyi kabul eder.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Üçüncü Taraf Bağlantıları</h2>
          <p>
            Site, kontrolümüzde olmayan üçüncü taraf web sitelerine veya hizmetlere (örneğin, Google Yorumları widget'ı) bağlantılar içerebilir. Bu sitelerin içeriklerinden, gizlilik politikalarından veya uygulamalarından sorumlu değiliz. Bu tür siteleri ziyaret ederken kendi şartlarını ve politikalarını incelemeniz önerilir.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Sorumluluğun Sınırlandırılması</h2>
          <p>
            Site "olduğu gibi" ve "kullanılabilir olduğu sürece" esasına göre sunulmaktadır. Şirket, Site'nin kesintisiz, hatasız veya güvenli olacağını garanti etmez. Site'nin kullanımından kaynaklanabilecek doğrudan veya dolaylı hiçbir zarardan Şirket sorumlu tutulamaz.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Sözleşmenin Değiştirilmesi</h2>
          <p>
            Şirket, bu Sözleşme'yi herhangi bir zamanda, önceden bildirimde bulunmaksızın tek taraflı olarak değiştirme hakkını saklı tutar. Değişiklikler Site'de yayınlandığı anda yürürlüğe girer. Site'yi kullanmaya devam etmeniz, değiştirilmiş Sözleşme'yi kabul ettiğiniz anlamına gelir.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">8. Uygulanacak Hukuk ve Yetkili Mahkeme</h2>
          <p>
            Bu Sözleşme'nin yorumlanmasında ve uygulanmasında Türkiye Cumhuriyeti kanunları geçerlidir. Bu Sözleşme'den doğabilecek her türlü uyuşmazlığın çözümünde Ankara Mahkemeleri ve İcra Daireleri yetkilidir.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">9. İletişim</h2>
          <p>
            Bu Sözleşme ile ilgili sorularınız için <a href="mailto:metropolreklam@hotmail.com" className="text-primary hover:underline">metropolreklam@hotmail.com</a> adresinden bizimle iletişime geçebilirsiniz.
          </p>
          </div>
          
          <div className="flex justify-between mt-8">
            <a href="#top" className="flex items-center text-primary hover:text-primary-dark transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Sayfa Başına Dön
            </a>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8 mt-8">
          <h1 className="text-3xl font-bold mb-8 text-center">METROPOL REKLAM KULLANICI SÖZLEŞMESİ</h1>
          <p className="text-sm text-gray-500 mb-8 text-center">Son Güncelleme: 19 Temmuz 2025</p>

          <div className="prose prose-lg max-w-none">
            <p className="italic mb-6">
              Lütfen www.metropolreklam.net ("Site") web sitemizi kullanmadan önce bu Kullanıcı Sözleşmesi'ni ("Sözleşme") dikkatlice okuyunuz.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Taraflar ve Kabul</h2>
            <p>
              Bu Sözleşme, bir tarafta Davutlar, Köroğlu Sk. No:2/B, 09140 Kuşadası/Aydın adresinde mukim Metropol Reklam ("Şirket") ile diğer tarafta Site'yi kullanan kişi ("Kullanıcı") arasında akdedilmiştir. Site'ye erişim sağlamakla veya Site'yi kullanmakla, bu Sözleşme'nin şartlarını ve koşullarını okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz. Bu şartları kabul etmiyorsanız, Site'yi kullanmamalısınız.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Hizmetlerin Tanımı</h2>
            <p>
              Bu Site, Metropol Reklam'ın sunduğu reklamcılık hizmetleri hakkında bilgi vermek, projelerini (galeri) sergilemek ve kullanıcıların Şirket ile iletişime geçmesini sağlamak amacıyla kurulmuştur.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Fikri Mülkiyet Hakları</h2>
            <p>
              Site'de yer alan tüm metinler, görseller, logolar, grafikler, tasarımlar ve diğer materyallerin ("İçerik") tüm fikri mülkiyet hakları Metropol Reklam'a aittir veya lisans altında kullanılmaktadır. Kullanıcı, Şirket'in yazılı izni olmaksızın İçerik'i kopyalayamaz, çoğaltamaz, dağıtamaz veya türev çalışmalarını oluşturamaz.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Kullanıcı Yükümlülükleri</h2>
            <p>Kullanıcı, Site'yi kullanırken:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Yürürlükteki tüm yasalara uymayı,</li>
              <li>İletişim formları veya diğer etkileşim alanlarında doğru ve güncel bilgiler sunmayı,</li>
              <li>Site'nin güvenliğini tehlikeye atacak veya çalışmasını engelleyecek herhangi bir faaliyette bulunmamayı (spam göndermek, virüs bulaştırmak, hacklemeye çalışmak vb.),</li>
              <li>Diğer kullanıcıların veya Şirket'in haklarına tecavüz etmemeyi kabul eder.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Üçüncü Taraf Bağlantıları</h2>
            <p>
              Site, kontrolümüzde olmayan üçüncü taraf web sitelerine veya hizmetlere (örneğin, Google Yorumları widget'ı) bağlantılar içerebilir. Bu sitelerin içeriklerinden, gizlilik politikalarından veya uygulamalarından sorumlu değiliz. Bu tür siteleri ziyaret ederken kendi şartlarını ve politikalarını incelemeniz önerilir.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Sorumluluğun Sınırlandırılması</h2>
            <p>
              Site "olduğu gibi" ve "kullanılabilir olduğu sürece" esasına göre sunulmaktadır. Şirket, Site'nin kesintisiz, hatasız veya güvenli olacağını garanti etmez. Site'nin kullanımından kaynaklanabilecek doğrudan veya dolaylı hiçbir zarardan Şirket sorumlu tutulamaz.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Sözleşmenin Değiştirilmesi</h2>
            <p>
              Şirket, bu Sözleşme'yi herhangi bir zamanda, önceden bildirimde bulunmaksızın tek taraflı olarak değiştirme hakkını saklı tutar. Değişiklikler Site'de yayınlandığı anda yürürlüğe girer. Site'yi kullanmaya devam etmeniz, değiştirilmiş Sözleşme'yi kabul ettiğiniz anlamına gelir.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Uygulanacak Hukuk ve Yetkili Mahkeme</h2>
            <p>
              Bu Sözleşme'nin yorumlanmasında ve uygulanmasında Türkiye Cumhuriyeti kanunları geçerlidir. Bu Sözleşme'den doğabilecek her türlü uyuşmazlığın çözümünde Ankara Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. İletişim</h2>
            <p>
              Bu Sözleşme ile ilgili sorularınız için <a href="mailto:metropolreklam@hotmail.com" className="text-primary hover:underline">metropolreklam@hotmail.com</a> adresinden bizimle iletişime geçebilirsiniz.
            </p>
          </div>
          
          <div className="flex justify-between mt-8">
            <a href="#top" className="flex items-center text-primary hover:text-primary-dark transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Sayfa Başına Dön
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
