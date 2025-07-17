import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "../../../lib/generated/prisma";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user.isActive) {
    return res.status(401).json({ message: 'Yetkisiz erişim' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const images = await prisma.gallery.findMany({
          orderBy: { order: 'asc' }
        });
        return res.status(200).json(images);
      } catch (error) {
        console.error('Gallery fetch error:', error);
        return res.status(500).json({ message: 'Galeri verileri alınamadı' });
      }

    case 'POST':
      try {
        const { title, description, imagePath, blobUrl, category, isActive, order } = req.body;
        const newImage = await prisma.gallery.create({
          data: { 
            title, 
            description, 
            imagePath, 
            blobUrl,
            category, 
            isActive: isActive === undefined ? true : isActive,
            order: parseInt(order) || 0 
          }
        });
        return res.status(201).json(newImage);
      } catch (error) {
        console.error('Gallery create error:', error);
        return res.status(500).json({ message: 'Resim eklenemedi' });
      }

    case 'PUT':
      try {
        const { id, title, description, category, order, isActive } = req.body;
        const updatedImage = await prisma.gallery.update({
          where: { id: parseInt(id) },
          data: { 
            title, 
            description, 
            category, 
            order: parseInt(order), 
            isActive 
          }
        });
        return res.status(200).json(updatedImage);
      } catch (error) {
        console.error('Gallery update error:', error);
        return res.status(500).json({ message: 'Resim güncellenemedi' });
      }

    case 'DELETE':
      try {
        const { id } = req.query;
        await prisma.gallery.delete({
          where: { id: parseInt(id) }
        });
        return res.status(200).json({ message: 'Resim silindi' });
      } catch (error) {
        console.error('Gallery delete error:', error);
        return res.status(500).json({ message: 'Resim silinemedi' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
