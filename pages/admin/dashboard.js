import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase/firestore';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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

    // Admin ise kullanıcı verilerini yükle
    loadUsers();
  }, [session, status, router]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const usersData = [];
      snapshot.forEach((doc) => {
        usersData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleString('tr-TR');
    } catch (error) {
      return 'N/A';
    }
  };

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Yükleniyor...</div>;
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
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
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
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Kullanıcı Yönetimi ({users.length})
              </button>
            </nav>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'dashboard' && (
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Admin Dashboard
                </h2>
                <p className="text-gray-600 mb-8">
                  Admin paneline hoş geldiniz. Buradan sitenizi yönetebilirsiniz.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div 
                    className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setActiveTab('users')}
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Kullanıcı Yönetimi
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Kullanıcıları görüntüle ve yönet
                    </p>
                    <p className="text-primary font-semibold">
                      {users.length} kullanıcı
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      İçerik Yönetimi
                    </h3>
                    <p className="text-gray-600">
                      Site içeriklerini düzenle
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Ayarlar
                    </h3>
                    <p className="text-gray-600">
                      Site ayarlarını yapılandır
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800">
                    ✅ Admin girişi başarılı! Rolünüz: <strong>{session.user.role}</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Kullanıcı Yönetimi & Güvenlik İzleme
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Tüm kullanıcılar ve güvenlik bilgileri
                    </p>
                  </div>
                  <button
                    onClick={loadUsers}
                    className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary"
                  >
                    Yenile
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-gray-500">Kullanıcılar yükleniyor...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kullanıcı Bilgileri
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kayıt Bilgileri
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Güvenlik Bilgileri
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Son Aktivite
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {user.email}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    UID: {user.uid}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    ID: {user.id}
                                  </div>
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                                    user.role === 'admin' 
                                      ? 'bg-red-100 text-red-800' 
                                      : 'bg-green-100 text-green-800'
                                  }`}>
                                    {user.role}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="space-y-1">
                                <div>Kayıt: {formatDate(user.createdAt)}</div>
                                {user.registrationInfo && (
                                  <>
                                    <div className="text-xs text-gray-500">
                                      IP: {user.registrationInfo.ip}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Konum: {user.registrationInfo.location?.city}, {user.registrationInfo.location?.country}
                                    </div>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.registrationInfo?.deviceInfo && (
                                <div className="space-y-1">
                                  <div className="text-xs">
                                    {user.registrationInfo.deviceInfo.type} / {user.registrationInfo.deviceInfo.os}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {user.registrationInfo.deviceInfo.browser}
                                  </div>
                                  <div className="text-xs">
                                    Login sayısı: {user.loginHistory?.length || 0}
                                  </div>
                                  {user.loginHistory && user.loginHistory.length > 0 && (
                                    <div className="text-xs text-blue-600 mt-1">
                                      Son giriş IP: {user.loginHistory[0].ip}
                                    </div>
                                  )}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="space-y-1">
                                <div>Son giriş: {formatDate(user.lastLoginAt)}</div>
                                <div className="text-xs text-gray-500">
                                  Güncellenme: {formatDate(user.updatedAt)}
                                </div>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  user.accountStatus === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {user.accountStatus}
                                </span>
                                {user.loginHistory && user.loginHistory.length > 0 && (
                                  <div className="text-xs text-purple-600 mt-1">
                                    {user.loginHistory.filter(entry => 
                                      entry.country || entry.city || entry.browser || entry.os || entry.deviceType
                                    ).length} değişiklik
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {users.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Henüz kullanıcı bulunmuyor.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
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