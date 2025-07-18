import axios from 'axios';

const shareBaseUrl = process.env.NEXT_PUBLIC_UMAMI_SHARE_URL;
const shareToken = process.env.NEXT_PUBLIC_UMAMI_SHARE_TOKEN;
const websiteDomain = 'metropolreklam.net';

// Share URL'den veri çekmek için temel fonksiyon
async function fetchFromShare(endpoint, params = {}) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_UMAMI_URL;
    const token = process.env.NEXT_PUBLIC_UMAMI_SHARE_TOKEN;
    
    if (!baseUrl || !token) {
      console.error('Share URL veya token tanımlanmamış', { baseUrl, token: token ? 'Var' : 'Yok' });
      throw new Error('Share URL veya token tanımlanmamış');
    }

    // Share API endpoint'ini oluştur
    const url = `${baseUrl}/api/share/${token}/${endpoint}`;
    
    console.log('Fetching from share URL:', url);
    
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint} from share URL:`, error.message);
    if (error.response) {
      console.error('Response error:', error.response.status, error.response.data);
    }
    throw error;
  }
}

// Genel istatistikleri çek
export async function getShareStats(params = {}) {
  return fetchFromShare('stats', params);
}

// Sayfa görüntülenme verilerini çek
export async function getSharePageviews(params = {}) {
  return fetchFromShare('pageviews', params);
}

// Ziyaretçi verilerini çek
export async function getShareVisitors(params = {}) {
  return fetchFromShare('visitors', params);
}

// Belirli zaman aralığı için tüm verileri çek
export async function getShareAnalytics(range = '30d') {
  try {
    const [stats, pageviews, visitors] = await Promise.all([
      getShareStats({ range }),
      getSharePageviews({ range }),
      getShareVisitors({ range }),
    ]);

    return {
      stats,
      pageviews,
      visitors,
    };
  } catch (error) {
    console.error('Error fetching share analytics:', error);
    throw error;
  }
}

// Share URL'inden alınan verileri formatlayıp dashboardta kullanılabilir şekle getir
export function formatShareData(shareData) {
  if (!shareData) return null;
  
  try {
    const { stats, pageviews, visitors } = shareData;
    
    console.log('Formatting share data:', { 
      hasStats: !!stats, 
      hasPageviews: !!pageviews, 
      hasVisitors: !!visitors,
      statsSample: stats ? Object.keys(stats) : 'none'
    });
    
    // Umami Analytics bileşeninin beklediği formata dönüştür
    return {
      stats: {
        pages: Array.isArray(stats?.pages) ? stats.pages : [],
        browsers: Array.isArray(stats?.browsers) ? stats.browsers : [],
        os: Array.isArray(stats?.os) ? stats.os : [],
        devices: Array.isArray(stats?.devices) ? stats.devices : [],
        countries: Array.isArray(stats?.countries) ? stats.countries : [],
        visitors: typeof stats?.visitors === 'number' ? stats.visitors : 0,
      },
      pageviews: Array.isArray(pageviews) ? pageviews.map(item => ({
        t: item.x,
        y: item.y
      })) : [],
      metrics: {
        pageviews: { value: typeof stats?.pageviews === 'number' ? stats.pageviews : 0 },
        uniques: { value: typeof stats?.uniques === 'number' ? stats.uniques : 0 },
        bounces: { value: typeof stats?.bounces === 'number' ? stats.bounces : 0 },
        totalTime: { value: typeof stats?.totalTime === 'number' ? stats.totalTime : 0 },
        visits: { value: Array.isArray(visitors) ? visitors.length : 0 },
      },
    };
  } catch (error) {
    console.error('Error formatting share data:', error);
    return {
      stats: {
        pages: [],
        browsers: [],
        os: [],
        devices: [],
        countries: [],
        visitors: 0,
      },
      pageviews: [],
      metrics: {
        pageviews: { value: 0 },
        uniques: { value: 0 },
        bounces: { value: 0 },
        totalTime: { value: 0 },
        visits: { value: 0 },
      },
    };
  }
}

// Tarih aralığını formatlama yardımcısı
export function getDateRange(days = 30) {
  const endAt = Date.now();
  const startAt = new Date(endAt);
  startAt.setDate(startAt.getDate() - days);
  
  return {
    startAt: startAt.getTime(),
    endAt,
    range: `${days}d`
  };
}
