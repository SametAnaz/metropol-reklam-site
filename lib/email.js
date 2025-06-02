// lib/email.js

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData) {
  const { name, email, message } = formData;

  // E-posta içeriğini HTML olarak oluşturuyoruz.
  const htmlContent = `
    <h1>Yeni İletişim Formu İletisi</h1>
    <p><strong>Gönderen:</strong> ${name} &lt;${email}&gt;</p>
    <p><strong>Mesaj:</strong></p>
    <p>${message.replace(/\n/g, "<br />")}</p>
  `;

  // Resend üzerinden e-posta gönderimi
  const response = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: [process.env.RESEND_TO_EMAIL],
    subject: `Yeni İletişim: ${name}`,
    html: htmlContent,
  });

  return response;
}

export async function sendAutoReply(email, name) {
  // Kullanıcıya otomatik cevap e-postası
  const htmlContent = `
    <h1>Merhaba ${name},</h1>
    <p>Mesajınızı aldık, en kısa sürede sizinle iletişime geçeceğiz.</p>
    <p>İyi günler dileriz.</p>
    <p><em>Metropol Reklam Ekibi</em></p>
  `;

  const response = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: [email],
    subject: "İletişim Talebinizi Aldık",
    html: htmlContent,
  });

  return response;
}
