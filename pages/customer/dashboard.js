import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layouts/MainLayout';
import { UserIcon, CogIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function CustomerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('Customer dashboard - session status:', status);
    console.log('Customer dashboard - session:', session);
    
    if (status === 'unauthenticated') {
      console.log('User not authenticated, redirecting to signin');
      router.push('/auth/signin');
    } else if (session && session.user.role !== 'user') {
      console.log('User role is not "user", role:', session.user.role);
      if (session.user.role === 'admin') {
        router.push('/admin/dashboard'); // Admin kullanıcıları admin paneline yönlendir
      } else {
        router.push('/'); // Diğer roller ana sayfaya
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <MainLayout title="Yükleniyor..." description="Müşteri paneli yükleniyor">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  if (!session || session.user.role !== 'user') {
    console.log('Access denied - session:', session);
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const features = [
    {
      title: 'Siparişlerim',
      description: 'Geçmiş ve aktif siparişlerinizi görüntüleyin',
      icon: DocumentTextIcon,
      status: 'Yakında',
      color: 'bg-blue-500'
    },
    {
      title: 'Özel Teklifler',
      description: 'Size özel hazırlanmış teklifler',
      icon: ClockIcon,
      status: 'Yakında',
      color: 'bg-green-500'
    },
    {
      title: 'Hesap Ayarları',
      description: 'Profil bilgilerinizi düzenleyin',
      icon: CogIcon,
      status: 'Yakında',
      color: 'bg-purple-500'
    },
  ];

  return (
    <MainLayout title="Müşteri Paneli" description="Metropol Reklam müşteri paneli">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-full">
                  <UserIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Hoş geldiniz, {session.user.name}!
                  </h1>
                  <p className="text-gray-600">{session.user.email}</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 mb-8 text-white">
            <h2 className="text-xl font-semibold mb-2">Müşteri Panelinize Hoş Geldiniz!</h2>
            <p className="text-white/90">
              Bu alanda gelecekte siparişlerinizi takip edebilecek, özel tekliflerimizden haberdar olabilecek 
              ve hesap bilgilerinizi yönetebileceksiniz. Şu anda geliştirme aşamasındayız.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`${feature.color} p-2 rounded-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      {feature.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/contact"
                className="flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-lg hover:opacity-90 transition-opacity duration-300"
              >
                <span className="font-medium">İletişime Geç</span>
              </Link>
              <Link
                href="/services"
                className="flex items-center justify-center bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                <span className="font-medium">Hizmetlerimiz</span>
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center justify-center bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                <span className="font-medium">Portföyümüz</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 