import Head from 'next/head';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Dummy login form that doesn't use authentication yet
  const handleSubmit = (e) => {
    e.preventDefault();
    // This would normally handle authentication
    alert('Admin paneli şu anda geliştirme aşamasındadır. Lütfen daha sonra tekrar deneyin.');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Admin Girişi | Metropol Reklam</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <NextSeo
        title="Admin Girişi"
        description="Metropol Reklam yönetim paneli girişi."
        noindex={true}
      />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-gray-900 mt-6">
          METROPOL REKLAM
        </h1>
        <h2 className="mt-2 text-center text-xl font-semibold text-gray-600">
          Yönetim Paneli Girişi
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 p-4 rounded-md mb-6">
            <p>Admin paneli şu anda geliştirme aşamasındadır. Erişim kısıtlıdır.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Giriş Yap
              </button>
            </div>
          </form>

          <div className="mt-6">
            <Link href="/" className="text-center block text-sm text-primary hover:underline">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 