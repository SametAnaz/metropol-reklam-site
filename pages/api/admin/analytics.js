import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { 
  getAllWebsiteStats,
  getWebsiteStats,
  getPageviews,
  getMetrics,
  getDateRange
} from "../../../lib/umami-cloud";

// Mock data generator function for development mode
function generateMockData(days) {
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

export default async function handler(req, res) {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(req, res, authOptions);

  // Check for admin access
  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  const adminEmails = process.env.ADMIN_EMAIL?.split(",") || [];
  if (!adminEmails.includes(session.user.email)) {
    return res.status(403).json({ error: "Admin access required" });
  }

  // Handle different endpoints
  const { action } = req.query;

  try {
    // Zaman aralığını belirle (default 30 gün)
    const days = parseInt(req.query.days || 30);
    
    // Development ortamında mock veri dön
    if (process.env.NODE_ENV === 'development') {
      console.log('Development environment detected, returning mock data');
      const mockData = generateMockData(days);
      
      // Handle specific data requests
      let data = mockData;
      if (action) {
        switch (action) {
          case "stats":
            data = mockData.stats;
            break;
          case "pageviews":
            data = mockData.pageviews;
            break;
          case "metrics":
            data = mockData.metrics;
            break;
        }
      }
      
      return res.status(200).json(data);
    }
    
    // Production ortamı için gerçek API'yi kullan
    
    // API key kontrolü
    if (!process.env.NEXT_PUBLIC_UMAMI_API_KEY) {
      return res.status(500).json({ 
        error: "API Key missing", 
        message: "Umami Cloud API Key is not configured" 
      });
    }
    
    const dateRange = getDateRange(days);
    
    let data;
    
    switch (action) {
      case "stats":
        const websiteStats = await getAllWebsiteStats(days);
        data = websiteStats.stats;
        break;
        
      case "pageviews":
        const statsData = await getAllWebsiteStats(days);
        data = statsData.pageviews;
        break;
        
      case "metrics":
        const metricsData = await getAllWebsiteStats(days);
        data = metricsData.metrics;
        break;
        
      default:
        // Tüm verileri al
        data = await getAllWebsiteStats(days);
        break;
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return res.status(500).json({ error: "Failed to fetch analytics data" });
  }
}
