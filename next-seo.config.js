const SEO = {
  titleTemplate: '%s | Metropol Reklam',
  defaultTitle: 'Metropol Reklam | Profesyonel Tabela & Dijital Baskı Hizmetleri',
  description: 'Metropol Reklam ile firmanızı öne çıkarın. Tabela, dijital baskı, araç giydirme ve daha fazlası için profesyonel reklam çözümleri.',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://metropolreklam.com/',
    site_name: 'Metropol Reklam',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Metropol Reklam',
      },
    ],
  },
  twitter: {
    handle: '@metropolreklam',
    site: '@metropolreklam',
    cardType: 'summary_large_image',
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
      content: '#FF5733',
    },
  ],
};

export default SEO; 