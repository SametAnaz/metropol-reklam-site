import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, getSession } from 'next-auth/react';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import AdminBackground from '../../components/ui/AdminBackground';

export default function AdminLogin() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
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
        // Tam URL kullanarak redirect hatalarını önle
        callbackUrl: window.location.origin + '/admin/dashboard',
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
      console.log('Session user email:', sessionResult?.user?.email);
      
      if (sessionResult?.user?.isActive) {
        console.log('Active user login successful');
        try {
          console.log('Attempting to redirect to dashboard...');
          
          // Güvenli yönlendirme işlemi
          const dashboardUrl = window.location.origin + '/admin/dashboard';
          console.log('Redirecting to:', dashboardUrl);
          
          // Next.js router kullanarak yönlendirme
          await router.push('/admin/dashboard');
        } catch (redirectError) {
          console.error('Redirect error:', redirectError);
          
          // Fallback olarak doğrudan window.location kullan
          setTimeout(() => {
            window.location.href = window.location.origin + '/admin/dashboard';
          }, 100);
        }
      } else {
        console.log('User not active:', sessionResult?.user?.isActive);
        setError('Hesabınız henüz aktifleştirilmemiş. Lütfen yönetici ile iletişime geçin.');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      
      // URL hatalarını daha iyi işle
      if (error.message && error.message.includes('URL')) {
        setError('Yönlendirme hatası oluştu. Lütfen tekrar deneyin.');
        
        // URL hatalarında basit bir manuel yönlendirme deneyin
        if (router && router.push) {
          setTimeout(() => {
            console.log('Attempting manual redirect after URL error');
            router.push('/admin/dashboard');
          }, 500);
        }
      } else {
        setError(error.message || 'Giriş işlemi sırasında bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate input
    if (!name.trim()) {
      setError('Ad Soyad alanı zorunludur');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      setLoading(false);
      return;
    }

    try {
      // Register user
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Kayıt işlemi başarısız');
      }

      // Registration successful
      toast.success('Kayıt işlemi başarılı! Hesabınızın aktifleştirilmesi için yönetici onayı beklenecektir.');
      setIsLoginMode(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
    } catch (error) {
      console.error('Registration error:', error);
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
              {isLoginMode ? 'Admin Girişi' : 'Kayıt Ol'}
            </h2>
            <p className="text-gray-600">
              {isLoginMode 
                ? 'Yönetim paneline erişim için giriş yapın' 
                : 'Yeni bir hesap oluşturun (onay gerektirir)'}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={isLoginMode ? handleSubmit : handleRegister}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                <div className="font-medium">Hata:</div>
                <div className="text-sm mt-1">{error}</div>
              </div>
            )}

            <div className="space-y-4">
              {!isLoginMode && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required={!isLoginMode}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Ad Soyad"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta Adresi
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
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isLoginMode ? 'current-password' : 'new-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm pr-10"
                    placeholder="Şifre"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {!isLoginMode && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Şifre Tekrar
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required={!isLoginMode}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Şifreyi Tekrar Girin"
                  />
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                ) : (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
                {isLoginMode ? 'Giriş Yap' : 'Kayıt Ol'}
              </button>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setError('');
                }}
                className="font-medium text-sm text-primary hover:text-secondary"
              >
                {isLoginMode 
                  ? 'Hesabınız yok mu? Kayıt olun' 
                  : 'Zaten bir hesabınız var mı? Giriş yapın'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
