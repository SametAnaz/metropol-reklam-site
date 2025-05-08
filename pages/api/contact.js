import { sendContactEmail, sendAutoReply } from '../../lib/email';

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required' });
    }

    // Send email to admin
    const contactResult = await sendContactEmail(req.body);
    
    if (!contactResult.success) {
      throw new Error(contactResult.error || 'Failed to send contact email');
    }

    // Send auto-reply to user
    await sendAutoReply(email, name);

    // Return success response
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to send message' });
  }
} 