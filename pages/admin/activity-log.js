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
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  


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

  // Fetch activity logs with pagination
  const fetchActivities = async (userId = 'all', page = 1, limit = 10) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/activity-logs?userId=${userId}&page=${page}&limit=${limit}`);
      
      // Even if there's an error status, try to parse the response
      const result = await response.json();
      
      // Log response information for debugging
      console.log(`API yanıtı (${response.status}):`, result);
      
      if (!response.ok) {
        // If we have an error status
        setError(`Aktivite günlükleri alınamadı (${response.status}): ${result.message || 'Bilinmeyen hata'}`);
        setActivities([]);
      } else {
        // Handle both new pagination format and old format for backward compatibility
        if (result.data && result.pagination) {
          // New format with pagination
          setActivities(result.data || []);
          setPagination({
            page: result.pagination.page,
            limit: result.pagination.limit,
            total: result.pagination.total,
            totalPages: result.pagination.totalPages
          });
        } else {
          // Old format (array of activities)
          setActivities(result || []);
          setPagination({
            page: 1,
            limit: 10,
            total: result.length,
            totalPages: Math.ceil(result.length / 10)
          });
        }
        
        // Artık aktivite günlüğü görüntüleme işlemi için log tutmuyoruz
        // Bu şekilde gereksiz log kayıtları oluşmasını önlemiş oluyoruz
      }
    } catch (err) {
      console.error('Error fetching activity logs:', err);
      setError('Aktivite günlükleri yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.');
      setActivities([]); // Set empty array so UI can handle it
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/admin/login');
    }

    if (status === 'authenticated') {
      fetchUsers();
      fetchActivities('all', 1, pagination.limit); // Start with all users, first page
    }
  }, [status, router]);

  // Handle user selection change
  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    // Reset to first page when changing user
    setPagination(prev => ({...prev, page: 1}));
    fetchActivities(userId, 1, pagination.limit);
  };
  
  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination(prev => ({...prev, page: newPage}));
    fetchActivities(selectedUserId, newPage, pagination.limit);
  };
  
  // Handle page size change
  const handlePageSizeChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setPagination(prev => ({...prev, page: 1, limit: newLimit}));
    fetchActivities(selectedUserId, 1, newLimit);
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
      case 'gallery_update':
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
        );
      case 'gallery_delete':
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-red-100 text-red-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        );
      // "view_logs" action artık kullanılmıyor
      case 'change_password':
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-yellow-100 text-yellow-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        );
      case 'system_check':
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-teal-100 text-teal-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        );
      case 'system_error':
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-orange-100 text-orange-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
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
              <div className="flex space-x-2">
                <button
                  onClick={async () => {
                    try {
                      setIsLoading(true);
                      setError('');
                      const res = await fetch('/api/admin/db-check');
                      const data = await res.json();
                      alert(`Veritabanı Durumu:\n\nBağlantı: ${data.connection ? 'Başarılı' : 'Başarısız'}\nTablolar: ${data.tables.join(', ')}\nAktivite Tablosu: ${data.activityTable ? 'Mevcut' : 'Bulunamadı'}\nKullanıcı Sayısı: ${data.userCount}\nLog Sayısı: ${data.logCount}\nTest Logu Oluşturuldu: ${data.testLogCreated ? 'Evet' : 'Hayır'}`);
                      
                      // Test log oluşturulduysa sayfayı yeniden yükle
                      if (data.testLogCreated) {
                        fetchActivities(selectedUserId);
                      }
                    } catch (err) {
                      console.error('Veritabanı kontrolü hatası:', err);
                      setError('Veritabanı kontrolü yapılırken bir hata oluştu.');
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  DB Test
                </button>
                <Link href="/admin/dashboard" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Dashboard
                </Link>
              </div>
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
                    
                    {/* Pagination Component */}
                    {pagination.total > 0 && (
                      <div className="mt-6">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-700">
                              Gösterilen: <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> - <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> / <span className="font-medium">{pagination.total}</span> kayıt
                            </div>
                            <div className="flex items-center space-x-2">
                              <label htmlFor="pageSize" className="text-sm text-gray-700">
                                Sayfa başına:
                              </label>
                              <select
                                id="pageSize"
                                name="pageSize"
                                value={pagination.limit}
                                onChange={handlePageSizeChange}
                                className="block w-20 pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                              >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select>
                            </div>
                          </div>
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            {/* Previous Page Button */}
                            <button
                              onClick={() => handlePageChange(pagination.page - 1)}
                              disabled={pagination.page === 1}
                              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${pagination.page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                              <span className="sr-only">Önceki</span>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                            
                            {/* Page Numbers */}
                            {[...Array(Math.min(5, pagination.totalPages))].map((_, idx) => {
                              // Calculate page numbers to show (current page in the middle when possible)
                              let pageNum;
                              if (pagination.totalPages <= 5) {
                                // If 5 or fewer pages, show all pages
                                pageNum = idx + 1;
                              } else if (pagination.page <= 3) {
                                // If current page is near start, show first 5 pages
                                pageNum = idx + 1;
                              } else if (pagination.page >= pagination.totalPages - 2) {
                                // If current page is near end, show last 5 pages
                                pageNum = pagination.totalPages - 4 + idx;
                              } else {
                                // Otherwise, show 2 pages before and after current page
                                pageNum = pagination.page - 2 + idx;
                              }
                              
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => handlePageChange(pageNum)}
                                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                    pagination.page === pageNum
                                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                            
                            {/* Next Page Button */}
                            <button
                              onClick={() => handlePageChange(pagination.page + 1)}
                              disabled={pagination.page === pagination.totalPages}
                              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${pagination.page === pagination.totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                              <span className="sr-only">Sonraki</span>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </nav>
                        </div>
                      </div>
                    )}
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
