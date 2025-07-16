import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import ParticleBackground from '../../components/ui/ParticleBackground';

export default function SignIn() {
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

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === 'No user found with this email') {
          setError('Bu email ile kayıtlı kullanıcı bulunamadı');
        } else if (result.error === 'Invalid password') {
          setError('Hatalı şifre');
        } else {
          setError(result.error);
        }
      } else {
        // Get session to check user role
        const session = await fetch('/api/auth/session').then(res => res.json());
        let callbackUrl = '/';  // Default redirect to homepage
        
        // Only redirect admins to admin dashboard
        if (session?.user?.role === 'admin') {
          callbackUrl = '/admin/dashboard';
        }
        
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      setError('Giriş sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-[#0d0d0d]">
      <ParticleBackground />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/metropol_logo2_500x500.png" 
                alt="Metropol Reklam Logo" 
                width={250} 
                height={250}
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#333] mt-6 mb-2">Müşteri Girişi</h2>
            <p className="text-gray-600">Hesabınıza giriş yapın</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                E-posta Adresi
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF5714] focus:ring-1 focus:ring-[#FF5714] outline-none transition-colors"
                placeholder="ornek@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF5714] focus:ring-1 focus:ring-[#FF5714] outline-none transition-colors pr-10"
                  placeholder="Şifrenizi girin"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#FF5714] to-[#EE9D55] text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>

            <div className="text-center space-y-3">
              <Link 
                href="/auth/register" 
                className="block text-[#FF5714] hover:text-[#EE9D55] text-sm font-medium"
              >
                Hesabınız yok mu? Üye olun
              </Link>
              <Link 
                href="/" 
                className="block text-gray-600 hover:text-gray-800 text-sm"
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

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}