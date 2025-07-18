import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AdminBackground from '../../components/ui/AdminBackground';
import Link from 'next/link';
import Image from 'next/image';

// Server-side auth check
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

export default function ActivityLog() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('all');
  const [loadingUsers, setLoadingUsers] = useState(true);
  


  // Fetch users
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.users || []); // Access the users array from the response
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Kullanıcı listesi yüklenirken bir hata oluştu.');
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch activity logs
  const fetchActivities = async (userId = 'all') => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/activity-logs?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch activity logs');
      }
      const data = await response.json();
      setActivities(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching activity logs:', err);
      setError('Activity log verilerini yüklerken bir hata oluştu.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/admin/login');
    }

    if (status === 'authenticated') {
      fetchUsers();
      fetchActivities('all'); // Start with all users
    }
  }, [status, router]);

  // Handle user selection change
  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    fetchActivities(userId);
  };

  // Function to format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Function to get appropriate icon for activity type
  const getActivityIcon = (action) => {
    switch (action) {
      case 'login':
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
        );
      case 'logout':
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-red-100 text-red-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
        );
      case 'update_profile':
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-green-100 text-green-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case 'gallery_upload':
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-purple-100 text-purple-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'change_password':
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-yellow-100 text-yellow-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gray-100 text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <AdminBackground />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Aktivite Günlüğü</h1>
                <p className="text-gray-600">Tüm kullanıcıların işlem ve aktivite kayıtları</p>
              </div>
              <Link href="/admin/dashboard" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Dashboard
              </Link>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}

            {/* User Selection */}
            <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Kullanıcı Seçimi</h2>
                <p className="text-sm text-gray-500 mt-1">İstediğiniz kullanıcının aktivite günlüğünü görüntüleyin</p>
              </div>
              <div className="p-4">
                <div className="flex items-center">
                  <label htmlFor="userSelect" className="sr-only">Kullanıcı Seçin</label>
                  <select
                    id="userSelect"
                    name="userSelect"
                    value={selectedUserId}
                    onChange={handleUserChange}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    disabled={loadingUsers || isLoading}
                  >
                    <option value="all">Tüm Kullanıcılar</option>
                    {loadingUsers ? (
                      <option disabled>Yükleniyor...</option>
                    ) : (
                      users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Activity Log */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                {isLoading ? (
                  <div className="flex justify-center items-center h-60">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                  </div>
                ) : activities.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Aktivite Bulunamadı</h3>
                    <p className="mt-1 text-sm text-gray-500">Henüz hiç aktivite kaydı bulunmuyor.</p>
                  </div>
                ) : (
                  <div className="flow-root">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Son Aktiviteler</h3>
                    <ul className="divide-y divide-gray-200">
                      {activities.map((activity) => (
                        <li key={activity.id} className="py-4">
                          <div className="flex items-start space-x-4">
                            {getActivityIcon(activity.action)}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {activity.description}
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                    {formatTimestamp(activity.timestamp)}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-1">
                                {selectedUserId === 'all' && (
                                  <div className="mb-1">
                                    <span className="font-medium text-xs text-primary">
                                      {activity.userName}
                                    </span>
                                    <span className="text-xs text-gray-500 ml-1">
                                      ({activity.userEmail})
                                    </span>
                                  </div>
                                )}
                                <div className="flex items-center text-sm text-gray-500">
                                  <div className="mr-4">
                                    <span className="font-medium text-xs text-gray-600">IP:</span> {activity.ipAddress}
                                  </div>
                                  <div>
                                    <span className="font-medium text-xs text-gray-600">Cihaz:</span> {activity.deviceInfo}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
