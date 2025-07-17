import { PrismaClient } from '../../../../lib/generated/prisma';
import { deleteImage } from '../../../../lib/blob';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'Invalid image ID' });
    }
    
    // Veritabanından resim bilgisini al
    const image = await prisma.gallery.findUnique({
      where: { id: parseInt(id) },
    });

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Eğer blob URL varsa, Vercel Blob'dan resmi sil
    if (image.blobUrl) {
      await deleteImage(image.blobUrl);
    }

    // Veritabanından kaydı sil
    await prisma.gallery.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ 
      success: true,
      message: 'Image deleted successfully' 
    });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ 
      message: 'Error deleting image', 
      error: error.message 
    });
  }
}
