import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "../../../../lib/db";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user.isActive) {
      return res.status(401).json({ message: 'Yetkisiz erişim' });
    }

    const { ids } = req.body;

    // Validate the input
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Geçersiz istek, resim ID\'leri sağlanmadı' });
    }

    // Convert string IDs to numbers if needed
    const numericIds = ids.map(id => typeof id === 'string' ? parseInt(id, 10) : id);

    // Delete multiple gallery items
    const result = await prisma.gallery.deleteMany({
      where: {
        id: {
          in: numericIds,
        },
      },
    });

    return res.status(200).json({ 
      message: `${result.count} resim başarıyla silindi`, 
      deletedCount: result.count 
    });
  } catch (error) {
    console.error('Bulk delete error:', error);
    return res.status(500).json({ message: 'Resimler silinirken bir hata oluştu' });
  }
}
