// pages/api/contact.js

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// reCAPTCHA doğrulama fonksiyonu
async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  const data = await response.json();
  return data.success;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message, recaptchaToken } = req.body;

    // Form validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Tüm alanları doldurun' });
    }

    // reCAPTCHA doğrulaması
    if (!recaptchaToken) {
      return res.status(400).json({ message: 'reCAPTCHA doğrulaması gerekli' });
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return res.status(400).json({ message: 'reCAPTCHA doğrulaması başarısız' });
    }

    // Email content
    const emailContent = `
      Yeni İletişim Formu Mesajı:
      
      İsim: ${name}
      E-posta: ${email}
      
      Mesaj:
      ${message}
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL_TO,
      subject: `Yeni İletişim Formu Mesajı - ${name}`,
      text: emailContent,
    });

    return res.status(200).json({ message: 'Mesajınız başarıyla gönderildi' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ message: 'Mesaj gönderilirken bir hata oluştu' });
  }
}
