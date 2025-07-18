import Head from 'next/head';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children, title }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      console.log("AdminLayout: Unauthenticated user");
      router.replace('/admin/login');
      return;
    }

    if (!session || !session.user) {
      console.log("AdminLayout: No session or user");
      router.replace('/admin/login');
      return;
    }

    if (!session.user.isActive) {
      console.log("AdminLayout: User not active");
      // Aktif olmayan kullanıcıları giriş sayfasına yönlendir
      router.replace('/admin/login');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (status === 'unauthenticated' || (session && !session.user.isActive)) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} | Admin Panel` : 'Admin Panel | Metropol Reklam'}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-gray-800 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/admin" className="text-xl font-bold">
                  Metropol Reklam Admin
                </Link>
              </div>
              <div className="flex items-center space-x-6">
                <Link href="/admin/portfolio" className="hover:text-blue-400 transition-colors">
                  Portföy
                </Link>
                <Link href="/admin/products" className="hover:text-blue-400 transition-colors">
                  Ürünler
                </Link>
                <Link href="/admin/dashboard" className="hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
                <span className="text-sm text-gray-300">
                  {session.user.name || session.user.email}
                </span>
                <button 
                  onClick={() => signOut({ callbackUrl: '/admin/login' })}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm transition-colors"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
          {children}
        </main>
      </div>
    </>
  );
}