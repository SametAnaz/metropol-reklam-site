import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import axios from 'axios';

export default async function handler(req, res) {
  // Test amaçlı basitleştirilmiş endpoint
  let isAdmin = false;
  
  try {
    // İsteğe bağlı basit kontrol
    const session = await getServerSession(req, res, authOptions);
    
    // Session kontrolü
    isAdmin = session?.user?.email && 
      process.env.ADMIN_EMAIL?.split(",").includes(session.user.email);
      
    if (!isAdmin) {
      console.log('Warning: Non-admin user accessing test endpoint');
    }
  } catch (authError) {
    console.log('Auth check error:', authError.message);
    // Auth hatası olsa bile teste devam et
  }

  try {
    // Share URL'yi kontrol et
    const shareUrl = process.env.NEXT_PUBLIC_UMAMI_SHARE_URL;
    if (!shareUrl) {
      return res.status(500).json({ error: "Share URL tanımlanmamış" });
    }

    // Share URL'den direkt veriyi al
    try {
      const shareToken = process.env.NEXT_PUBLIC_UMAMI_SHARE_TOKEN;
      const baseUrl = process.env.NEXT_PUBLIC_UMAMI_URL;
      
      // URL kontrolü
      if (!baseUrl || !shareToken) {
        return res.status(400).json({ 
          success: false, 
          message: "Share URL veya token bulunamadı",
          baseUrl,
          shareToken: shareToken ? "Tanımlı" : "Tanımlı değil"
        });
      }
      
      const testUrl = `${baseUrl}/api/share/${shareToken}/stats`;
      console.log("Testing share URL:", testUrl);
      
      const response = await axios.get(testUrl);
      
      // Başarılı cevap
      return res.status(200).json({ 
        success: true,
        message: "Share URL test başarılı!",
        testUrl,
        data: response.data
      });
    } catch (requestError) {
      return res.status(500).json({ 
        success: false,
        message: "Share URL test başarısız",
        error: requestError.message,
        response: requestError.response?.data,
        status: requestError.response?.status
      });
    }
    
  } catch (error) {
    console.error("Share URL test hatası:", error);
    
    return res.status(500).json({ 
      success: false,
      message: "Share URL bağlantı hatası",
      error: error.message,
      shareUrl: process.env.NEXT_PUBLIC_UMAMI_SHARE_URL,
      shareToken: process.env.NEXT_PUBLIC_UMAMI_SHARE_TOKEN
    });
  }
}
