// Mevcut aktivite kayıtlarındaki kullanıcı ajanı bilgisini dönüştürerek sadeleştirilmiş cihaz bilgisini göstermek için script
const prisma = require('../lib/db').default;

// User Agent'dan basit işletim sistemi bilgisini çıkarır
function extractSimpleDeviceInfo(userAgent) {
  if (!userAgent) return 'Bilinmiyor';
  
  const osMatch = userAgent.match(/\((Windows NT [0-9.]+; Win64; x64|Macintosh; Intel Mac OS X [0-9_]+|Linux|Android [0-9.]+|iOS [0-9.]+|iPhone OS [0-9_]+)[^)]*\)/);
  if (osMatch && osMatch[1]) {
    return `(${osMatch[1]})`;
  }
  
  // Eğer regex eşleşmezse, basit bir kontrol yapalım
  if (userAgent.includes('Windows')) return '(Windows)';
  if (userAgent.includes('Mac OS')) return '(macOS)';
  if (userAgent.includes('Linux')) return '(Linux)';
  if (userAgent.includes('Android')) return '(Android)';
  if (userAgent.includes('iOS') || userAgent.includes('iPhone')) return '(iOS)';
  
  return 'Bilinmiyor';
}

async function main() {
  console.log('Tüm aktivite kayıtları getiriliyor...');
  
  // Tüm aktivite kayıtlarını al
  const logs = await prisma.activityLog.findMany();
  console.log(`${logs.length} aktivite kaydı bulundu`);
  
  // Her bir kaydı işleyip kullanıcı ajanı verilerini yazdır
  for (const log of logs) {
    if (!log.userAgent) continue;
    
    const originalUserAgent = log.userAgent;
    const simplifiedInfo = extractSimpleDeviceInfo(originalUserAgent);
    
    console.log(`ID: ${log.id}`);
    console.log(`Orijinal User-Agent: ${originalUserAgent}`);
    console.log(`Sadeleştirilmiş Cihaz: ${simplifiedInfo}`);
    console.log('-----------------------------------');
  }
  
  console.log('İşlem tamamlandı. Arayüzde bu bilgiler zaten dönüştürülerek gösterilecektir.');
  console.log('Veritabanında herhangi bir değişiklik yapılmadı, çünkü sunucu tarafında dönüşüm yapılıyor.');
}

main()
  .catch((e) => {
    console.error('Aktivite kayıtlarını işlerken hata:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
