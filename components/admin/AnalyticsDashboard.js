import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Define color palette
const colors = [
  'rgba(54, 162, 235, 0.7)', // blue
  'rgba(255, 99, 132, 0.7)', // pink
  'rgba(255, 206, 86, 0.7)', // yellow
  'rgba(75, 192, 192, 0.7)', // teal
  'rgba(153, 102, 255, 0.7)', // purple
  'rgba(255, 159, 64, 0.7)', // orange
  'rgba(111, 214, 145, 0.7)', // green
  'rgba(220, 120, 220, 0.7)', // magenta
  'rgba(63, 128, 165, 0.7)', // lightblue
  'rgba(200, 100, 100, 0.7)', // salmon
];

// Format dates
function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('tr-TR');
}

// Generate mock analytics data for development environment
function generateMockAnalyticsData(days) {
  const now = Date.now();
  const pageviews = [];
  const visitors = [];
  
  // Generate daily data points for the specified timeframe
  for (let i = 0; i < days; i++) {
    const date = new Date(now - ((days - i - 1) * 24 * 60 * 60 * 1000));
    pageviews.push({
      t: date.getTime(),
      y: Math.floor(Math.random() * 50) + 10, // Random value between 10-60
    });
    visitors.push({
      t: date.getTime(),
      y: Math.floor(Math.random() * 30) + 5, // Random value between 5-35
    });
  }
  
  // Create mock website stats
  return {
    websiteId: "mock-website-id",
    stats: {
      pages: [
        { x: "/", y: 120, z: 80 },
        { x: "/about", y: 85, z: 52 },
        { x: "/products", y: 65, z: 45 },
        { x: "/contact", y: 40, z: 38 },
        { x: "/gallery", y: 35, z: 30 }
      ],
      devices: [
        { x: "Desktop", y: 60 },
        { x: "Mobile", y: 35 },
        { x: "Tablet", y: 5 }
      ],
      browsers: [
        { x: "Chrome", y: 55 },
        { x: "Safari", y: 25 },
        { x: "Firefox", y: 10 },
        { x: "Edge", y: 7 },
        { x: "Others", y: 3 }
      ],
      os: [
        { x: "Windows", y: 45 },
        { x: "iOS", y: 25 },
        { x: "Android", y: 20 },
        { x: "macOS", y: 8 },
        { x: "Linux", y: 2 }
      ]
    },
    pageviews: pageviews,
    metrics: {
      uniques: { value: Math.floor(Math.random() * 500) + 100 },
      pageviews: { value: Math.floor(Math.random() * 1000) + 300 },
      bounces: { value: Math.floor(Math.random() * 300) },
      visits: { value: Math.floor(Math.random() * 600) + 200 }
    }
  };
}

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [timeframe, setTimeframe] = useState(30); // Default 30 days

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        
        // Check if we're in development mode
        const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
        
        if (isDevelopment) {
          console.log('Development environment detected, using mock data');
          // Use mock data in development environment
          const mockData = generateMockAnalyticsData(timeframe);
          setAnalytics(mockData);
          return;
        }
        
        // For production, use the real API
        const response = await fetch(`/api/admin/analytics?days=${timeframe}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error response:', errorText);
          throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorText.substring(0, 100)}`);
        }
        
        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
          throw new Error('Veri dönmedi veya boş veri döndü');
        }
        
        console.log('Analytics data received:', data);
        setAnalytics(data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        
        // If in development mode and error occurs, fall back to mock data
        if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
          console.log('Falling back to mock data after error');
          const mockData = generateMockAnalyticsData(timeframe);
          setAnalytics(mockData);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchAnalytics();
  }, [timeframe]);

  // Handle timeframe change
  const handleTimeframeChange = (days) => {
    setTimeframe(days);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Analitik verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        <p><strong>Hata:</strong> {error}</p>
        <p className="text-sm mt-2">Umami sunucusuna bağlanırken bir sorun oluştu. Lütfen kimlik bilgilerinizi kontrol edin.</p>
      </div>
    );
  }

  if (!analytics || !analytics.stats) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-semibold text-red-600">Analitik veri bulunamadı.</p>
        <p className="mt-2 text-gray-600">
          Website ID: {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '39ae1eab-9238-4554-ab85-a17aa271b929'}
        </p>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left max-w-2xl mx-auto">
          <h3 className="font-medium text-yellow-700">Olası Sorun Çözümleri:</h3>
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
            <li>Umami Cloud API Key'in doğru olduğunu kontrol edin</li>
            <li>Umami Cloud URL'nin doğru olduğunu kontrol edin</li>
            <li>API anahtarının aktif olduğundan emin olun</li>
            <li>API anahtarının doğru izinlere sahip olduğunu kontrol edin</li>
            <li>Tarayıcı konsolunda daha detaylı hata mesajları olabilir</li>
            <li>
              <a 
                href="/api/admin/test-cloud" 
                target="_blank" 
                className="text-blue-600 hover:underline"
              >
                API Bağlantısını Test Et
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // Prepare data for charts
  const pageViewsData = {
    labels: analytics.pageviews ? analytics.pageviews.map(item => formatDate(item.t)) : [],
    datasets: [
      {
        label: 'Sayfa Görüntülenmeleri',
        data: analytics.pageviews ? analytics.pageviews.map(item => item.y) : [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const visitorsData = {
    labels: analytics.pageviews ? analytics.pageviews.map(item => formatDate(item.t)) : [],
    datasets: [
      {
        label: 'Ziyaretçiler',
        data: analytics.pageviews ? analytics.pageviews.map(item => item.y) : [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  // Get top pages
  const topPages = analytics.stats?.pages?.slice(0, 10) || [];

  // Device distribution
  const deviceData = {
    labels: analytics.stats?.devices?.map(item => item.x) || [],
    datasets: [
      {
        data: analytics.stats?.devices?.map(item => item.y) || [],
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  // Browser distribution
  const browserData = {
    labels: analytics.stats?.browsers?.map(item => item.x) || [],
    datasets: [
      {
        data: analytics.stats?.browsers?.map(item => item.y) || [],
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  // OS distribution
  const osData = {
    labels: analytics.stats?.os?.map(item => item.x) || [],
    datasets: [
      {
        data: analytics.stats?.os?.map(item => item.y) || [],
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className="analytics-dashboard space-y-6">
      {/* Time period selector */}
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Zaman Aralığı</h2>
          <div className="flex space-x-2">
            {[7, 14, 30, 90].map((days) => (
              <button
                key={days}
                onClick={() => handleTimeframeChange(days)}
                className={`px-3 py-1 text-sm rounded ${
                  timeframe === days
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {days === 7 ? '1 Hafta' :
                 days === 14 ? '2 Hafta' :
                 days === 30 ? '1 Ay' :
                 days === 90 ? '3 Ay' : `${days} gün`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Toplam Ziyaretçi</h3>
          <div className="text-3xl font-bold mt-2">{analytics.metrics?.uniques?.value || 0}</div>
          <div className="text-xs text-gray-500 mt-1">Son {timeframe} gün</div>
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Sayfa Görüntülenme</h3>
          <div className="text-3xl font-bold mt-2">{analytics.metrics?.pageviews?.value || 0}</div>
          <div className="text-xs text-gray-500 mt-1">Son {timeframe} gün</div>
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Ortalama Oturum Süresi</h3>
          <div className="text-3xl font-bold mt-2">
            {analytics.metrics?.bounces?.value ? Math.round(analytics.metrics.bounces.value / 60) + " dk" : "N/A"}
          </div>
          <div className="text-xs text-gray-500 mt-1">Son {timeframe} gün</div>
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Hemen Çıkma Oranı</h3>
          <div className="text-3xl font-bold mt-2">
            {analytics.metrics?.bounces?.value
              ? Math.round((analytics.metrics.bounces.value / analytics.metrics.visits.value) * 100) + "%"
              : "N/A"}
          </div>
          <div className="text-xs text-gray-500 mt-1">Son {timeframe} gün</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Sayfa Görüntülenmeleri</h3>
          <div className="h-64">
            <Line data={pageViewsData} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Ziyaretçiler</h3>
          <div className="h-64">
            <Line data={visitorsData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* More detailed analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Cihaz Dağılımı</h3>
          <div className="h-64">
            <Doughnut data={deviceData} options={pieOptions} />
          </div>
        </div>
        
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Tarayıcı Dağılımı</h3>
          <div className="h-64">
            <Doughnut data={browserData} options={pieOptions} />
          </div>
        </div>
        
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">İşletim Sistemi Dağılımı</h3>
          <div className="h-64">
            <Doughnut data={osData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Top pages table */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4">En Çok Ziyaret Edilen Sayfalar</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sayfa
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Görüntülenme
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ziyaretçi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPages.map((page, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {page.x || '/'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {page.y || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {page.z || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
