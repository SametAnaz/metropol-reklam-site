const SEO = {
  titleTemplate: '%s | Metropol Reklam Kusadasi',
  defaultTitle: 'Metropol Reklam Kusadasi',
  description: 'Kuşadası Metropol Reklam: Profesyonel tabela, reklam çözümleri, dijital baskı, araç giydirme ve fuar standları. Kuşadası tabelacı arayışınız için doğru adres.',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://metropolreklam.net/',
    site_name: 'Metropol Reklam Kusadasi',
    title: 'Metropol Reklam Kusadasi | Tabela, Reklam ve Dijital Baskı Hizmetleri',
    description: 'Kuşadası ve çevresinde profesyonel tabela, reklam, dijital baskı ve fuar standı hizmetleri. Kaliteli ve etkili çözümler için Metropol Reklam. Instagram: https://www.instagram.com/metropolreklam2020/',
    images: [
      {
        url: 'https://metropolreklam.net/images/og-image.jpg', // Ensure this path is correct
        width: 1200,
        height: 630,
        alt: 'Metropol Reklam Kuşadası Tabela ve Reklam Hizmetleri',
      },
    ],
    see_also: [
      'https://www.instagram.com/metropolreklam2020/'
    ],
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#FF5733', // Consider updating to a brand color
    },
    {
      name: 'keywords',
      content: 'kuşadası tabelacı, kuşadası reklam, kuşadası tabela, metropol reklam kuşadası, tabela kuşadası, reklam kuşadası, dijital baskı kuşadası, araç giydirme kuşadası, fuar standı kuşadası, kuşadası açık hava reklamcılığı, aydın tabelacı, aydın reklam',
    },
    {
      name: 'google-site-verification', // Add your verification code if you have one
      content: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
    },
    {
      name: 'geo.region',
      content: 'TR-09', // ISO 3166-2 code for Aydın
    },
    {
      name: 'geo.placename',
      content: 'Kuşadası',
    },
    {
      name: 'geo.position',
      content: '37.8579;27.2610', // Latitude and Longitude for Kuşadası
    },
    {
      name: 'ICBM',
      content: '37.8579, 27.2610', // Latitude and Longitude for Kuşadası
    },
  ],
};

export default SEO;