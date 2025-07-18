import { IncomingForm } from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import prisma from '../../../lib/db';
import { uploadImage } from '../../../lib/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    // Form verilerini parse et
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm({
        keepExtensions: true,
      });
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = data;
    const imageFile = files.image;
    
    // Resim dosyası kontrolü
    if (!imageFile) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Dosya bilgilerini al
    const fileBuffer = await fs.promises.readFile(imageFile.filepath);
    const fileExt = path.extname(imageFile.originalFilename || 'image.jpg');
    const fileName = `gallery/${uuidv4()}${fileExt}`;
    const contentType = imageFile.mimetype || 'image/jpeg';

    // Vercel Blob'a yükle
    const blob = await uploadImage(fileBuffer, fileName, contentType);

    // Veritabanına kaydet
    const galleryItem = await prisma.gallery.create({
      data: {
        title: fields.title ? fields.title[0] : 'Untitled',
        description: fields.description ? fields.description[0] : '',
        imagePath: fileName,
        blobUrl: blob.url,
        category: fields.category ? fields.category[0] : null,
        isActive: fields.isActive ? fields.isActive[0] === 'true' : true,
        order: fields.order ? parseInt(fields.order[0], 10) : 0,
      },
    });

    // Geçici dosyayı temizle
    fs.unlinkSync(imageFile.filepath);

    return res.status(201).json({ success: true, data: galleryItem });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
}
