import Head from 'next/head';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';

export default function MainLayout({ children, title, description }) {
  return (
    <>
      <Head>
        <title>{title || 'Metropol Reklam'}</title>
        <meta name="description" content={description || 'Metropol Reklam - Profesyonel Tabela ve Dijital Baskı Hizmetleri'} />
      </Head>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
} 