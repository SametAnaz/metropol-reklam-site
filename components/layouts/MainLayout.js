import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import WhatsAppButton from '../ui/WhatsAppButton';
import ScrollToTopButton from '../ui/ScrollToTopButton';

export default function MainLayout({ children, title, description }) {
  const router = useRouter();
  const is404Page = router.pathname === '/404';

  const pageTitle = title || 'Metropol Reklam Kuşadası | Tabela ve Reklam Çözümleri';
  const pageDescription = description || 'Kuşadası Metropol Reklam - Profesyonel tabela, dijital baskı, araç giydirme ve fuar standı hizmetleri.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {/* Keywords are now primarily managed by next-seo.config.js and individual pages */}
        {/* General keywords can be kept here as a fallback if needed, but prefer page-specific ones */}
        <meta name="keywords" content="kuşadası tabelacı, kuşadası reklam, tabela, dijital baskı, metropol reklam" />
        <meta name="geo.region" content="TR-09" />
        <meta name="geo.placename" content="Kuşadası" />
        <meta name="geo.position" content="37.8579;27.2610" />
        <meta name="ICBM" content="37.8579, 27.2610" />
        <meta name="robots" content="index, follow" />
        <meta name="google" content="notranslate" />
        <link rel="canonical" href={`https://metropolreklam.net${router.asPath}`} />
      </Head>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        {!is404Page && <WhatsAppButton />}
        {!is404Page && <ScrollToTopButton />}
      </div>
    </>
  );
}