import axios from 'axios';

// Umami Web sitesi ID'si (Umami dashboard'da görüntülenen)
const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '610cc1d0-d081-41b5-a29a-fb2fb627d970';

const umamiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UMAMI_URL || 'https://cloud.umami.is',
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_UMAMI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

/**
 * Umami Cloud API'den web sitesi listesini alır
 */
export async function getWebsites() {
  try {
    const response = await umamiClient.get('/api/websites');
    return response.data;
  } catch (error) {
    console.error('Error fetching websites:', error);
    throw error;
  }
}

/**
 * Belirli bir web sitesi için analitik istatistiklerini alır
 * @param {string} websiteId - Web sitesi ID'si
 * @param {Object} params - İsteğe bağlı parametreler (startAt, endAt, unit, timezone)
 */
export async function getWebsiteStats(websiteId, params = {}) {
  try {
    const response = await umamiClient.get(`/api/websites/${websiteId}/stats`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching stats for website ${websiteId}:`, error);
    throw error;
  }
}

/**
 * Belirli bir web sitesi için sayfa görüntülenmelerini alır
 * @param {string} websiteId - Web sitesi ID'si
 * @param {Object} params - İsteğe bağlı parametreler (startAt, endAt, unit, timezone)
 */
export async function getPageviews(websiteId, params = {}) {
  try {
    const response = await umamiClient.get(`/api/websites/${websiteId}/pageviews`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching pageviews for website ${websiteId}:`, error);
    throw error;
  }
}

/**
 * Belirli bir web sitesi için etkinlikleri alır
 * @param {string} websiteId - Web sitesi ID'si
 * @param {Object} params - İsteğe bağlı parametreler (startAt, endAt, unit, timezone)
 */
export async function getEvents(websiteId, params = {}) {
  try {
    const response = await umamiClient.get(`/api/websites/${websiteId}/events`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching events for website ${websiteId}:`, error);
    throw error;
  }
}

/**
 * Belirli bir web sitesi için metrikleri alır
 * @param {string} websiteId - Web sitesi ID'si
 * @param {Object} params - İsteğe bağlı parametreler (startAt, endAt, type)
 */
export async function getMetrics(websiteId, params = {}) {
  try {
    const response = await umamiClient.get(`/api/websites/${websiteId}/metrics`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching metrics for website ${websiteId}:`, error);
    throw error;
  }
}

/**
 * Tarih aralığı parametrelerini oluşturur
 * @param {number} days - Geçmiş günlerin sayısı
 * @returns {Object} - startAt ve endAt parametreleri içeren bir nesne
 */
export function getDateRange(days = 30) {
  const endAt = Date.now();
  const startAt = new Date(endAt);
  startAt.setDate(startAt.getDate() - days);
  
  return {
    startAt: startAt.getTime(),
    endAt
  };
}

/**
 * Tüm websitelerinin istatistiklerini getirir
 * @param {number} days - Geçmiş günlerin sayısı
 */
export async function getAllWebsiteStats(days = 30) {
  try {
    const dateRange = getDateRange(days);
    // Direk olarak sabit websiteId kullan
    const websiteId = WEBSITE_ID;
    
    // Tüm istatistikleri paralel olarak getir
    const [stats, pageviews, metrics] = await Promise.all([
      getWebsiteStats(websiteId, dateRange),
      getPageviews(websiteId, dateRange),
      getMetrics(websiteId, dateRange)
    ]);
    
    return {
      websiteId,
      websites,
      stats,
      pageviews,
      metrics
    };
  } catch (error) {
    console.error('Error fetching all website stats:', error);
    throw error;
  }
}
