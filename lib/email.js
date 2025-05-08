import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async (formData) => {
  const { name, email, phone, message } = formData;
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Metropol Reklam <noreply@metropolreklam.com>',
      to: ['info@metropolreklam.com'],
      subject: `İletişim Formu: ${name}`,
      html: `
        <div>
          <h2>Yeni İletişim Formu</h2>
          <p><strong>İsim:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Mesaj:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

export const sendAutoReply = async (email, name) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Metropol Reklam <noreply@metropolreklam.com>',
      to: [email],
      subject: 'Teşekkürler! Mesajınızı Aldık',
      html: `
        <div>
          <h2>Merhaba ${name},</h2>
          <p>İletişim formunu doldurduğunuz için teşekkür ederiz. Mesajınızı aldık ve en kısa sürede sizinle iletişime geçeceğiz.</p>
          <p>İyi günler dileriz,</p>
          <p><strong>Metropol Reklam Ekibi</strong></p>
        </div>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Auto-reply email error:', error);
    return { success: false, error: error.message };
  }
}; 