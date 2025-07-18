import axios from 'axios';

const umamiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UMAMI_URL,
});

// Login and get token
export async function getUmamiToken() {
  try {
    // Yeni Umami sürümleri için endpoint değişikliği
    // Önce normal endpoint'i deneyelim, hata alırsak alternatif endpoint'leri deneyelim
    try {
      const response = await umamiClient.post('/api/auth/login', {
        username: process.env.UMAMI_USERNAME,
        password: process.env.UMAMI_PASSWORD,
      });
      
      return response.data.token;
    } catch (error) {
      // Alternatif endpoint denemeleri
      if (error.response && error.response.status === 404) {
        // Umami v2.0+ için farklı endpoint
        const altResponse = await umamiClient.post('/api/v1/auth/login', {
          username: process.env.UMAMI_USERNAME,
          password: process.env.UMAMI_PASSWORD,
        });
        
        return altResponse.data.token;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('Umami login error:', error);
    throw new Error('Failed to authenticate with Umami');
  }
}

// Get websites data
export async function getWebsites(token) {
  try {
    try {
      // Önce standart endpoint'i deneyelim
      const response = await umamiClient.get('/api/websites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Umami v2.0+ için farklı endpoint
        const altResponse = await umamiClient.get('/api/v1/websites', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        return altResponse.data;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('Failed to fetch websites:', error);
    throw error;
  }
}

// Get stats for a website
export async function getWebsiteStats(websiteId, token, params = {}) {
  try {
    try {
      // Önce standart endpoint'i deneyelim
      const response = await umamiClient.get(`/api/websites/${websiteId}/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params
      });
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Umami v2.0+ için farklı endpoint
        const altResponse = await umamiClient.get(`/api/v1/websites/${websiteId}/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params
        });
        
        return altResponse.data;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(`Failed to fetch stats for website ${websiteId}:`, error);
    throw error;
  }
}

// Get pageviews
export async function getPageviews(websiteId, token, params = {}) {
  try {
    try {
      // Önce standart endpoint'i deneyelim
      const response = await umamiClient.get(`/api/websites/${websiteId}/pageviews`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params
      });
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Umami v2.0+ için farklı endpoint
        const altResponse = await umamiClient.get(`/api/v1/websites/${websiteId}/pageviews`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params
        });
        
        return altResponse.data;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(`Failed to fetch pageviews for website ${websiteId}:`, error);
    throw error;
  }
}

// Get events
export async function getEvents(websiteId, token, params = {}) {
  try {
    try {
      // Önce standart endpoint'i deneyelim
      const response = await umamiClient.get(`/api/websites/${websiteId}/events`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params
      });
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Umami v2.0+ için farklı endpoint
        const altResponse = await umamiClient.get(`/api/v1/websites/${websiteId}/events`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params
        });
        
        return altResponse.data;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(`Failed to fetch events for website ${websiteId}:`, error);
    throw error;
  }
}

// Get metrics (visits, pageviews, etc.)
export async function getMetrics(websiteId, token, params = {}) {
  try {
    try {
      // Önce standart endpoint'i deneyelim
      const response = await umamiClient.get(`/api/websites/${websiteId}/metrics`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params
      });
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Umami v2.0+ için farklı endpoint
        const altResponse = await umamiClient.get(`/api/v1/websites/${websiteId}/metrics`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params
        });
        
        return altResponse.data;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(`Failed to fetch metrics for website ${websiteId}:`, error);
    throw error;
  }
}

// Format date ranges for Umami API
export function getDateRange(days = 30) {
  const endAt = Date.now();
  const startAt = new Date(endAt);
  startAt.setDate(startAt.getDate() - days);
  
  return {
    startAt: startAt.getTime(),
    endAt
  };
}
