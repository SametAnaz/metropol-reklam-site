import { useState } from 'react';
import { signIn, getSession, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import ParticleBackground from '../../components/ui/ParticleBackground';

export default function SignIn({ providers }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isGoogleEnabled = providers && providers.google;

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      
      const result = await signIn('google', {
        callbackUrl: '/customer/dashboard',
        redirect: false,
      });

      if (result?.error) {
        setError('Google ile giriş yapılamadı. Lütfen tekrar deneyin.');
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Google ile giriş sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isSignUp && password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      setLoading(false);
      return;
    }

    if (isSignUp && !acceptTerms) {
      setError('Kullanıcı sözleşmesini kabul etmeniz gerekiyor');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting sign in with:', { email, action: isSignUp ? 'signup' : 'signin' });
      
      const result = await signIn('credentials', {
        email,
        password,
        action: isSignUp ? 'signup' : 'signin',
        acceptTerms: isSignUp ? acceptTerms.toString() : undefined,
        redirect: false,
      });

      console.log('Sign in result:', result);

      if (result?.error) {
        console.error('Authentication error:', result.error);
        
        if (result.error === 'CredentialsSignin') {
          setError(isSignUp ? 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.' : 'Email veya şifre hatalı');
        } else if (result.error.includes('auth/')) {
          // Firebase specific errors
          const firebaseErrors = {
            'auth/email-already-in-use': 'Bu email adresi zaten kullanılıyor',
            'auth/weak-password': 'Şifre çok zayıf. En az 6 karakter olmalıdır',
            'auth/invalid-email': 'Geçersiz email adresi',
            'auth/user-not-found': 'Bu email ile kayıtlı kullanıcı bulunamadı',
            'auth/wrong-password': 'Şifre hatalı',
            'auth/too-many-requests': 'Çok fazla deneme. Lütfen daha sonra tekrar deneyin',
          };
          setError(firebaseErrors[result.error] || `Firebase hatası: ${result.error}`);
        } else {
          setError(result.error);
        }
        setLoading(false);
        return;
      }

      // Başarılı giriş/kayıt - Session kontrolü
      console.log('Authentication successful, waiting for session...');
      
      // Kısa bir bekleme süresi ekle ki session oluşsun
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const session = await getSession();
      console.log('Session after auth:', session);
      
      if (session) {
        console.log('Session found, redirecting to dashboard...');
        if (isSignUp) {
          console.log('Signup successful, user created with security tracking');
        }
        router.push('/customer/dashboard');
      } else {
        console.error('No session found after authentication');
        setError('Giriş başarılı ancak oturum oluşturulamadı. Lütfen sayfayı yenileyin.');
      }
    } catch (error) {
      console.error('Caught error:', error);
      setError(`Beklenmeyen hata: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ParticleBackground />
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  METROPOL
                </span>
                <span className="text-2xl font-light text-gray-900">
                  REKLAM
                </span>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Hesap Oluştur' : 'Müşteri Girişi'}
            </h2>
            <p className="text-gray-600">
              {isSignUp 
                ? 'Özel tekliflerimizden haberdar olmak için üye olun' 
                : 'Hesabınıza giriş yapın'
              }
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                <div className="font-medium">Hata:</div>
                <div className="text-sm mt-1">{error}</div>
                {error.includes('Firebase Authentication') && (
                  <div className="text-xs mt-2 text-red-500">
                    Firebase Console → Authentication → Sign-in method → Email/Password → Enable
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
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
                  placeholder="ornek@email.com"
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
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Şifrenizi girin"
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

              {isSignUp && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Şifre Tekrar
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                      placeholder="Şifrenizi tekrar girin"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {isSignUp && (
                <div className="flex items-start space-x-3">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      id="acceptTerms"
                      name="acceptTerms"
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="text-sm">
                    <label htmlFor="acceptTerms" className="text-gray-700">
                      <span className="font-medium text-red-500">*</span> Kullanıcı sözleşmesini ve gizlilik politikasını okudum, kabul ediyorum.
                    </label>
                  </div>
                </div>
              )}
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
                    İşlem yapılıyor...
                  </div>
                ) : (
                  isSignUp ? 'Hesap Oluştur' : 'Giriş Yap'
                )}
              </button>
            </div>

            {/* Divider */}
            {/*
            {isGoogleEnabled && (
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">veya</span>
                </div>
              </div>
            )}
            */}

            {/* Google Sign In Button */}
            {/*
            {isGoogleEnabled && (
              <div>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="group relative w-full flex justify-center items-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google ile {isSignUp ? 'Kayıt Ol' : 'Giriş Yap'}
                </button>
              </div>
            )}
            */}

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setPassword('');
                  setConfirmPassword('');
                  setAcceptTerms(false);
                }}
                className="text-primary hover:text-secondary font-medium transition-colors duration-300"
              >
                {isSignUp 
                  ? 'Zaten hesabınız var mı? Giriş yapın' 
                  : 'Hesabınız yok mu? Üye olun'
                }
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300"
              >
                Ana sayfaya dön
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers: providers || {},
    },
  };
}