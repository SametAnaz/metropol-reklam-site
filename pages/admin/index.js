import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AdminLayout from '../../components/layouts/AdminLayout';
import { db } from '../../lib/firebase/firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    products: 0,
    portfolioItems: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (status === 'authenticated') {
        try {
          // Fetch products count
          const productsRef = collection(db, 'products');
          const productsQuery = query(productsRef, limit(100));
          const productsSnapshot = await getDocs(productsQuery);
          
          // Fetch portfolio items count
          const portfolioRef = collection(db, 'portfolio');
          const portfolioQuery = query(portfolioRef, limit(100));
          const portfolioSnapshot = await getDocs(portfolioQuery);
          
          // Fetch messages count
          const messagesRef = collection(db, 'messages');
          const messagesQuery = query(messagesRef, limit(100));
          const messagesSnapshot = await getDocs(messagesQuery);
          
          setStats({
            products: productsSnapshot.size,
            portfolioItems: portfolioSnapshot.size,
            messages: messagesSnapshot.size,
          });
        } catch (error) {
          console.error('Error fetching stats:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStats();
  }, [status]);

  // Protected route - handled by AdminLayout
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout title="Admin Paneli">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Dashboard Cards */}
        <DashboardCard
          title="Ürünler"
          count={stats.products}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
          linkHref="/admin/products"
          loading={loading}
        />
        
        <DashboardCard
          title="Portföy"
          count={stats.portfolioItems}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          linkHref="/admin/portfolio"
          loading={loading}
        />
        
        <DashboardCard
          title="Mesajlar"
          count={stats.messages}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          linkHref="/admin/messages"
          loading={loading}
        />
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionButton
            title="Yeni Ürün Ekle"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
            href="/admin/products/new"
          />
          
          <QuickActionButton
            title="Portföye Ekle"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
            href="/admin/portfolio/new"
          />
          
          <QuickActionButton
            title="Medya Yükle"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            }
            href="/admin/media"
          />
          
          <QuickActionButton
            title="Siteyi Görüntüle"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }
            href="/"
            external={true}
          />
        </div>
      </div>
      
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">Hoş Geldiniz!</h2>
        <p className="text-gray-600 mb-4">
          Metropol Reklam yönetim paneline hoş geldiniz. Bu panel üzerinden ürünlerinizi, portföyünüzü
          ve müşteri mesajlarınızı yönetebilirsiniz.
        </p>
        <p className="text-gray-600">
          Yardıma ihtiyacınız olursa, <span className="text-primary">support@metropolreklam.com</span> adresine e-posta gönderebilirsiniz.
        </p>
      </div>
    </AdminLayout>
  );
}

// Dashboard Card Component
function DashboardCard({ title, count, icon, linkHref, loading }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          {loading ? (
            <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-2"></div>
          ) : (
            <p className="text-3xl font-bold text-primary mt-2">{count}</p>
          )}
        </div>
        <div className="bg-primary bg-opacity-10 p-3 rounded-full">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <Link href={linkHref} className="text-primary hover:underline">
          Görüntüle &rarr;
        </Link>
      </div>
    </div>
  );
}

// Quick Action Button Component
function QuickActionButton({ title, icon, href, external = false }) {
  return (
    <Link
      href={href}
      className="flex items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <div className="bg-primary bg-opacity-10 p-2 rounded-full mr-3">
        {icon}
      </div>
      <span className="font-medium">{title}</span>
    </Link>
  );
} 