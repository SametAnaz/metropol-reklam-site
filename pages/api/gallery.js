import prisma from "../../lib/db";
import { getCategoryNameById } from "../../lib/categories";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { page = 1, limit = 8, category } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const where = {
      isActive: true,
      ...(category && category !== 'all' && { category })
    };

    const [images, totalCount] = await Promise.all([
      prisma.gallery.findMany({
        where,
        orderBy: { order: 'asc' },
        skip,
        take: limitNumber,
        select: {
          id: true,
          title: true,
          description: true,
          imagePath: true,
          blobUrl: true,
          category: true,
          isActive: true,
          order: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.gallery.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / limitNumber);

    return res.status(200).json({
      images,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalCount,
        hasNext: pageNumber < totalPages,
        hasPrev: pageNumber > 1
      }
    });
  } catch (error) {
    console.error('Gallery public fetch error:', error);
    return res.status(500).json({ message: 'Galeri verileri alınamadı' });
  }
}
