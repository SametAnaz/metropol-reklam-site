import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserManagement from '../../components/admin/UserManagement';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      router.push('/admin/login');
      return;
    }

    if (session.user.role !== 'admin') {
      router.push('/admin/login');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Hoş geldiniz, {session.user.email}
              </span>
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'dashboard'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'users'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Kullanıcı Yönetimi (0)
              </button>
            </nav>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'dashboard' && (
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 text-primary mb-4">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Admin Dashboard
                </h2>
                <p className="text-gray-600 mb-8">
                  Metropol Reklam admin paneline hoş geldiniz. Buradan sitenizi ve kullanıcılarınızı yönetebilirsiniz.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div 
                    className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-primary"
                    onClick={() => setActiveTab('users')}
                  >
                    <div className="flex items-center justify-center h-10 w-10 bg-primary bg-opacity-10 rounded-lg mx-auto mb-4">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Kullanıcı Yönetimi
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Kullanıcıları görüntüle ve listele
                    </p>
                    <div className="flex items-center justify-center">
                      <span className="text-gray-500">
                        Kullanıcıları görüntülemek için tıklayın
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-center h-10 w-10 bg-secondary bg-opacity-10 rounded-lg mx-auto mb-4">
                      <svg className="h-6 w-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      İçerik Yönetimi
                    </h3>
                    <p className="text-gray-600">
                      Site içeriklerini düzenle ve portfolyo yönet
                    </p>
                    <div className="mt-3 text-sm text-gray-500">
                      Yakında aktif olacak
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-center h-10 w-10 bg-gray-100 rounded-lg mx-auto mb-4">
                      <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Site Ayarları
                    </h3>
                    <p className="text-gray-600">
                      Genel site ayarlarını yapılandır
                    </p>
                    <div className="mt-3 text-sm text-gray-500">
                      Yakında aktif olacak
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <UserManagement />
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
} 