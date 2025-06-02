export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // IP adresini al
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.connection.remoteAddress || req.socket.remoteAddress;
    
    // User-Agent'ı parse et
    const userAgent = req.headers['user-agent'] || '';
    
    // Basit device detection
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android.*Tablet|Kindle|Silk/i.test(userAgent);
    const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
    
    // Browser detection
    let browser = 'unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    else if (userAgent.includes('Opera')) browser = 'Opera';
    
    // OS detection
    let os = 'unknown';
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac OS')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';
    
    // Konum bilgisi için IP-based geolocation (basit)
    let locationData = {
      country: 'unknown',
      city: 'unknown',
      region: 'unknown'
    };

    // IP geolocation API çağrısı (ücretsiz servis)
    try {
      const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city,status`);
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        if (geoData.status === 'success') {
          locationData = {
            country: geoData.country || 'unknown',
            city: geoData.city || 'unknown',
            region: geoData.regionName || 'unknown'
          };
        }
      }
    } catch (geoError) {
      console.warn('Geolocation API error:', geoError);
    }

    // Toplanan tüm bilgiler
    const userInfo = {
      ip: ip,
      deviceInfo: {
        type: deviceType,
        browser: browser,
        os: os,
        userAgent: userAgent
      },
      location: locationData,
      timestamp: new Date().toISOString(),
      // Additional security info
      headers: {
        acceptLanguage: req.headers['accept-language'] || '',
        acceptEncoding: req.headers['accept-encoding'] || '',
        connection: req.headers.connection || ''
      }
    };

    res.status(200).json({
      success: true,
      userInfo: userInfo
    });

  } catch (error) {
    console.error('User info collection error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to collect user information'
    });
  }
} 