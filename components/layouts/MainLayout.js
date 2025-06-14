import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import WhatsAppButton from '../ui/WhatsAppButton';
import ScrollProgressBar from '../ui/ScrollProgressBar';
import ScrollToTopButton from '../ui/ScrollToTopButton';

export default function MainLayout({ children, title, description }) {
  const router = useRouter();
  const is404Page = router.pathname === '/404';

  return (
    <>
      <Head>
        <title>{title || 'Metropol Reklam'}</title>
        <meta name="description" content={description || 'Metropol Reklam - Profesyonel Tabela ve Dijital Baskı Hizmetleri'} />
      </Head>
      <div className="flex flex-col min-h-screen bg-white">
        <ScrollProgressBar />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        {!is404Page && <WhatsAppButton />}
        {!is404Page && <ScrollToTopButton />}
      </div>
    </>
  );
} 