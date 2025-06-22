import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, getSession } from 'next-auth/react';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import AdminBackground from '../../components/ui/AdminBackground';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      setLoading(false);
      return;
    }

    try {
      console.log('Admin login attempt for:', email);
      
      // NextAuth ile giriş yap - Admin credentials provider kullan
      const result = await signIn('admin-credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('SignIn result:', result);

      if (result?.error) {
        if (result.error === 'CredentialsSignin' || result.error === 'No user found with this email' || result.error === 'Invalid password') {
          setError('Email veya şifre hatalı');
        } else {
          setError(result.error || 'Giriş başarısız');
        }
        setLoading(false);
        return;
      }

      // Session kontrolü yap
      const sessionResult = await getSession();
      console.log('Session:', sessionResult);
      console.log('Session user:', sessionResult?.user);
      console.log('Session user role:', sessionResult?.user?.role);
      console.log('Session user email:', sessionResult?.user?.email);
      
      if (sessionResult?.user?.role === 'admin') {
        console.log('Admin login successful');
        router.push('/admin/dashboard');
      } else {
        console.log('Not admin role:', sessionResult?.user?.role);
        setError('Admin yetkisi gerekli');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AdminBackground />
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src="/metropol_logo2_500x500.png" 
                  alt="Metropol Reklam Logo" 
                  width={250} 
                  height={250}
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="mb-6">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Girişi
            </h2>
            <p className="text-gray-600">
              Yönetim paneline erişim için giriş yapın
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                <div className="font-medium">Hata:</div>
                <div className="text-sm mt-1">{error}</div>
                {error.includes('erişim yetkiniz yok') && (
                  <div className="text-xs mt-2 text-red-500">
                    Sadece admin yetkisine sahip kullanıcılar bu sayfaya erişebilir.
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Admin E-posta Adresi
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="admin@metropolreklam.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Şifresi
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Admin şifrenizi girin"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Giriş yapılıyor...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Admin Girişi
                  </div>
                )}
              </button>
            </div>

            <div className="text-center space-y-2">
              <Link
                href="/auth/signin"
                className="text-primary hover:text-secondary font-medium transition-colors duration-300"
              >
                Müşteri girişi için buraya tıklayın
              </Link>
              <div>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300"
                >
                  Ana sayfaya dön
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}