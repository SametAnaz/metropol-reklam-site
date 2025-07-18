import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getAllWebsiteStats } from "../../../lib/umami-cloud";

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

  try {
    // API key kontrolü
    if (!process.env.NEXT_PUBLIC_UMAMI_API_KEY) {
      return res.status(500).json({ 
        error: "API Key missing", 
        message: "Umami Cloud API Key is not configured" 
      });
    }

    // Website ID kontrolü
    if (!process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID) {
      return res.status(500).json({ 
        error: "Website ID missing", 
        message: "Umami Cloud Website ID is not configured" 
      });
    }
    
    // İstatistikleri direk olarak getir
    const stats = await getAllWebsiteStats(7); // Son 7 günün istatistiklerini al
    
    return res.status(200).json({
      success: true,
      message: "Umami Cloud API bağlantısı başarılı",
      websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
      statsAvailable: !!stats,
      stats: stats ? { 
        metrics: stats.metrics ? Object.keys(stats.metrics) : [],
        hasPageviews: !!stats.pageviews,
        pageviewsCount: stats.pageviews ? stats.pageviews.length : 0
      } : null
    });
  } catch (error) {
    console.error("Error testing Umami Cloud API:", error);
    
    return res.status(500).json({ 
      success: false,
      error: "Failed to connect to Umami Cloud API", 
      message: error.message || "Unknown error",
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
