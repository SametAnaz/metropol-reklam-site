import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function UserManagement({ users, onUsersChange }) {
  const { data: session } = useSession();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState({ accountStatus: '' });
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  // Arama filtresi
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.uid?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // Sıralama
  useEffect(() => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Timestamp alanları için özel işlem
      if (sortField === 'createdAt' || sortField === 'lastLoginAt') {
        aValue = aValue?.toDate ? aValue.toDate() : new Date(aValue || 0);
        bValue = bValue?.toDate ? bValue.toDate() : new Date(bValue || 0);
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    if (JSON.stringify(sortedUsers) !== JSON.stringify(filteredUsers)) {
      setFilteredUsers(sortedUsers);
    }
  }, [sortField, sortDirection]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleEditUser = (user) => {
    // Admin kullanıcıları düzenlenemez
    if (user.role === 'admin') {
      showMessage('error', 'Admin kullanıcıları düzenlenemez');
      return;
    }

    setSelectedUser(user);
    setEditForm({
      accountStatus: user.accountStatus || 'active'
    });
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    // Admin kullanıcıları silinemez
    if (user.role === 'admin') {
      showMessage('error', 'Admin kullanıcıları silinemez');
      return;
    }

    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const submitEdit = async () => {
    if (!selectedUser) return;

    try {
      setActionLoading(true);
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser.id,
          updates: editForm
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('success', data.message);
        onUsersChange(); // Parent component'e listeyi yenile sinyali gönder
        setShowEditModal(false);
        setSelectedUser(null);
      } else {
        showMessage('error', data.message || 'Güncelleme hatası');
      }
    } catch (error) {
      console.error('Edit error:', error);
      showMessage('error', 'Güncelleme sırasında hata oluştu');
    } finally {
      setActionLoading(false);
    }
  };

  const submitDelete = async () => {
    if (!selectedUser) return;

    try {
      setActionLoading(true);
      const response = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser.id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('success', data.message);
        onUsersChange(); // Parent component'e listeyi yenile sinyali gönder
        setShowDeleteModal(false);
        setSelectedUser(null);
      } else {
        showMessage('error', data.message || 'Silme hatası');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showMessage('error', 'Silme sırasında hata oluştu');
    } finally {
      setActionLoading(false);
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-yellow-100 text-yellow-800',
      banned: 'bg-red-100 text-red-800'
    };
    return statusConfig[status] || 'bg-gray-100 text-gray-800';
  };

  const getRoleBadge = (role) => {
    return role === 'admin' 
      ? 'bg-red-100 text-red-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      active: 'Aktif',
      suspended: 'Askıya Alınmış',
      banned: 'Yasaklanmış'
    };
    return statusTexts[status] || 'Aktif';
  };

  // Kullanıcı işlem yapılabilir mi kontrolü
  const canManageUser = (user) => {
    const sessionUserId = session?.user?.uid || session?.user?.id;
    return user.role !== 'admin' && 
           user.uid !== sessionUserId && 
           user.id !== sessionUserId;
  };

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Message Alert */}
      {message.text && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Kullanıcı Yönetimi & Güvenlik İzleme
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Toplam {users.length} kullanıcı • Görüntülenen {filteredUsers.length} kullanıcı
            </p>
            <p className="mt-1 text-xs text-gray-400">
              * Admin kullanıcıları düzenlenemez veya silinemez
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Kullanıcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-full sm:w-64"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button
              onClick={onUsersChange}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              Yenile
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-500">Kullanıcılar yükleniyor...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center">
                      Kullanıcı Bilgileri
                      {sortField === 'email' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center">
                      Kayıt Bilgileri
                      {sortField === 'createdAt' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Güvenlik Bilgileri
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('lastLoginAt')}
                  >
                    <div className="flex items-center">
                      Son Aktivite
                      {sortField === 'lastLoginAt' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {user.email?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            UID: {user.uid}
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {user.id?.substring(0, 8)}...
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getRoleBadge(user.role)}`}>
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="space-y-1">
                        <div className="font-medium">Kayıt: {formatDate(user.createdAt)}</div>
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
                          <div className="text-xs font-medium">
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
                        <div className="font-medium">Son giriş: {formatDate(user.lastLoginAt)}</div>
                        <div className="text-xs text-gray-500">
                          Güncellenme: {formatDate(user.updatedAt)}
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.accountStatus)}`}>
                          {getStatusText(user.accountStatus || 'active')}
                        </span>
                        {user.loginHistory && user.loginHistory.length > 0 && (
                          <div className="text-xs text-purple-600 mt-1">
                            {user.loginHistory.filter(entry => 
                              entry.country || entry.city || entry.browser || entry.os || entry.deviceType
                            ).length} farklı cihaz
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {canManageUser(user) ? (
                          <>
                            <button
                              onClick={() => handleEditUser(user)}
                              className="text-indigo-600 hover:text-indigo-900 px-3 py-1 text-xs bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                            >
                              Durum Değiştir
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className="text-red-600 hover:text-red-900 px-3 py-1 text-xs bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                            >
                              Sil
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-gray-400 px-3 py-1 bg-gray-50 rounded-md">
                            {user.role === 'admin' ? 'Admin korumalı' : 'Kendi hesabınız'}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {searchTerm ? 'Kullanıcı bulunamadı' : 'Henüz kullanıcı yok'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'Arama kriterinize uygun kullanıcı bulunamadı.' : 'Henüz sisteme kayıt olan kullanıcı bulunmuyor.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal - Sadece Hesap Durumu */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Hesap Durumu Değiştir: {selectedUser?.email}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hesap Durumu</label>
                  <select
                    value={editForm.accountStatus}
                    onChange={(e) => setEditForm({accountStatus: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="active">Aktif</option>
                    <option value="suspended">Askıya Al</option>
                    <option value="banned">Yasakla</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Kullanıcının hesap durumunu değiştirin. Askıya alınan veya yasaklanan kullanıcılar sisteme giriş yapamaz.
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  disabled={actionLoading}
                >
                  İptal
                </button>
                <button
                  onClick={submitEdit}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-orange-600 transition-colors"
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Güncelleniyor...' : 'Güncelle'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
                Kullanıcı Sil
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center">
                <strong>{selectedUser?.email}</strong> kullanıcısını kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  disabled={actionLoading}
                >
                  İptal
                </button>
                <button
                  onClick={submitDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Siliniyor...' : 'Kalıcı Olarak Sil'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 