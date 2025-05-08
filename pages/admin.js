import Head from 'next/head';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Admin Panel | Metropol Reklam</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <NextSeo
        title="Admin Panel"
        description="Metropol Reklam yönetim paneli."
        noindex={true}
      />
      
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Admin Panel</h1>
          <p className="text-gray-600 mb-6">
            Bu sayfa şu anda yapım aşamasındadır. Yönetim paneli yakında aktif olacaktır.
          </p>
          <div className="flex flex-col space-y-4">
            <Link href="/" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors">
              Ana Sayfaya Dön
            </Link>
            <Link href="/contact" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition-colors">
              İletişime Geç
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 