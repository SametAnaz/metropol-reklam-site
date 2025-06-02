import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Kullanıcılar yüklenirken hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-yellow-100 text-yellow-800',
      banned: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      active: 'Aktif',
      suspended: 'Askıda',
      banned: 'Yasaklı'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status || 'Bilinmiyor'}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800',
      user: 'bg-blue-100 text-blue-800'
    };
    
    const labels = {
      admin: 'Admin',
      user: 'Kullanıcı'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[role] || 'bg-gray-100 text-gray-800'}`}>
        {labels[role] || role || 'Bilinmiyor'}
      </span>
    );
  };

  const formatDate = (date) => {
    if (!date) return 'Bilinmiyor';
    
    try {
      if (date.seconds) {
        // Firestore Timestamp
        return new Date(date.seconds * 1000).toLocaleDateString('tr-TR');
      }
      return new Date(date).toLocaleDateString('tr-TR');
    } catch (error) {
      return 'Geçersiz tarih';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center text-red-600">
          <p className="text-lg font-medium">Hata</p>
          <p className="mt-2">{error}</p>
          <button 
            onClick={fetchUsers}
            className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Kullanıcı Listesi ({users.length})
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Sistemdeki tüm kullanıcılar ve adminler
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kullanıcı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kayıt Tarihi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Son Giriş
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {user.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {user.uid || user.id}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getRoleBadge(user.role)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(user.accountStatus)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(user.lastLoginAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 01-13.5 0" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Kullanıcı bulunamadı</h3>
              <p className="mt-1 text-sm text-gray-500">Henüz sisteme kayıtlı kullanıcı yok.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 