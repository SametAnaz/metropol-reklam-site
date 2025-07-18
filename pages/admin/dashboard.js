import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import UserManagement from '../../components/admin/UserManagement';
import GalleryManagement from '../../components/admin/GalleryManagement';
import AdminBackground from '../../components/ui/AdminBackground';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';

// Server-side auth kontrolü ekleyelim
export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (!session || !session.user || !session.user.isActive) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  
  return {
    props: { session }
  };
}

export default function AdminDashboard({ session: serverSession }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    console.log("Dashboard status:", status);
    console.log("Dashboard session:", session);
    
    if (status === 'loading') return; // Still loading

    if (status === 'unauthenticated') {
      console.log("Unauthenticated, redirecting to login");
      router.replace('/admin/login');
      return;
    }

    if (!session || !session.user) {
      console.log("No session found, redirecting to login");
      router.replace('/admin/login');
      return;
    }

    console.log("Session user:", session.user);
    console.log("isActive status:", session.user.isActive);

    if (!session.user.isActive) {
      console.log("User not active, redirecting to login");
      router.replace('/admin/login');
      return;
    }
    
    console.log("User is active, staying on dashboard");
  }, [session, status, router]);

  useEffect(() => {
    // Handle clicking outside the dropdown to close it
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session || !session.user.isActive) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image 
                  src="/metropol_logo2_500x500.png" 
                  alt="Metropol Reklam Logo" 
                  width={160} 
                  height={160} 
                  className="mr-3 rounded-full"
                />
                <h1 className="text-xl font-semibold text-gray-900">
                  Admin Panel
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 hidden sm:inline">
                Hoş geldiniz, {session.user.email}
              </span>
              
              {/* User dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <span>{session.user.email.split('@')[0]}</span>
                  <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {dropdownOpen && (
                  <div ref={dropdownRef} className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50">
                    {/* Profile Picture and Name Section */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 border border-gray-300 flex-shrink-0">
                          {session?.user?.image ? (
                            <Image
                              src={session.user.image}
                              alt="Profile"
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full w-full text-gray-500">
                              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          )}
                          <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="ml-3 overflow-hidden">
                          <p className="text-sm font-medium text-gray-900 truncate">{session?.user?.name || 'Admin User'}</p>
                          <p className="text-xs text-gray-500 truncate">{session?.user?.email || 'admin@example.com'}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Profile and Account Management */}
                    <div className="py-1">
                      <Link
                        href="/admin/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <div className="flex items-center">
                          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profil Ayarları
                        </div>
                      </Link>
                      <Link
                        href="/admin/activity-log"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <div className="flex items-center">
                          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Aktivite Günlüğü
                        </div>
                      </Link>
                      <Link
                        href="/settings/change-password"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <div className="flex items-center">
                          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                          </svg>
                          Şifre Değiştir
                        </div>
                      </Link>
                    </div>
                    
                    {/* Logout Section */}
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={() => router.push('/api/auth/signout')}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                    >
                      <div className="flex items-center">
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Çıkış Yap
                      </div>
                    </button>
                  </div>
                )}
              </div>
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
                Kullanıcılar
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'gallery'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Galeri Yönetimi
              </button>
              <a 
                href="https://umami.metropolreklam.net/share/58FPkZcWGOLQRW9M/metropolreklam.net"
                target="_blank"
                rel="noopener noreferrer" 
                className="py-2 px-1 border-b-2 font-medium text-sm transition-colors border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Analytics
              </a>
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
                      Kullanıcılar
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Kullanıcı bilgilerini görüntüle
                    </p>
                    <div className="flex items-center justify-center">
                      <span className="text-gray-500">
                        Kullanıcı listesini görüntülemek için tıklayın
                      </span>
                    </div>
                  </div>
                  
                  <div 
                    className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-primary"
                    onClick={() => setActiveTab('gallery')}
                  >
                    <div className="flex items-center justify-center h-10 w-10 bg-green-500 bg-opacity-10 rounded-lg mx-auto mb-4">
                      <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Galeri Yönetimi
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Galeri fotoğraflarını ekle, düzenle ve yönet
                    </p>
                    <div className="flex items-center justify-center">
                      <span className="text-gray-500">
                        Galeriyi yönetmek için tıklayın
                      </span>
                    </div>
                  </div>
                  
                  <a 
                    href="https://umami.metropolreklam.net/share/58FPkZcWGOLQRW9M/metropolreklam.net"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-primary"
                  >
                    <div className="flex items-center justify-center h-10 w-10 bg-blue-500 bg-opacity-10 rounded-lg mx-auto mb-4">
                      <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Site İstatistikleri
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Site istatistiklerini ve ziyaretçi verilerini görüntüle
                    </p>
                    <div className="flex items-center justify-center">
                      <span className="text-gray-500">
                        Analytics panelini görmek için tıklayın
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <UserManagement />
          )}

          {activeTab === 'gallery' && (
            <GalleryManagement />
          )}
        </div>
      </div>
    </div>
  );
}