import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <link rel="icon" href="/metropol_logo_250x250px.png" />
        <link rel="apple-touch-icon" href="/metropol_logo_250x250px.png" />
        <meta name="theme-color" content="#FF5714" />
        
        {/* JSON-LD for Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Metropol Reklam",
              "url": "https://metropolreklam.net",
              "logo": "https://metropolreklam.net/metropol_logo_500x500.png",
              "image": "https://metropolreklam.net/metropol_logo_500x500.png",
              "description": "Kuşadası Metropol Reklam: Profesyonel tabela, reklam çözümleri, dijital baskı, araç giydirme ve fuar standları.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kuşadası",
                "addressRegion": "Aydın",
                "addressCountry": "TR"
              },
              "sameAs": [
                "https://www.instagram.com/metropolreklam2020/"
              ]
            })
          }}
        />

        <script
          defer
          src="https://umami.metropolreklam.net/script.js"
          data-website-id="39ae1eab-9238-4554-ab85-a17aa271b929"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
