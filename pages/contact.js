import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { useForm } from 'react-hook-form';
import MainLayout from '../components/layouts/MainLayout';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Mesajınız gönderildi. En kısa sürede size dönüş yapacağız.' });
        reset();
      } else {
        setSubmitStatus({ success: false, message: result.error || 'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({ success: false, message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout title="İletişim" description="Metropol Reklam ile iletişime geçin. Adresimiz, telefon numaramız ve iletişim formumuz.">
      <NextSeo
        title="İletişim"
        description="Metropol Reklam ile iletişime geçin. Sorularınız ve projeleriniz için bize ulaşın."
      />

      {/* Page Header */}
      <section className="relative py-20 bg-dark text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-4">İletişim</h1>
          <p className="text-xl max-w-2xl">
            Sorularınız, önerileriniz veya projeleriniz için bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">İletişim Bilgilerimiz</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Adres</h3>
                    <p className="text-gray-600">
                      1234 Sokak No: 56, <br />
                      Metropol İş Merkezi, <br />
                      İzmir, Türkiye
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Telefon</h3>
                    <p className="text-gray-600">+90 123 456 7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">E-posta</h3>
                    <p className="text-gray-600">info@metropolreklam.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-600">
                      Pazartesi - Cumartesi: 09:00 - 18:00 <br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="mt-8 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Google Harita Burada Görünecek</p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">İletişim Formu</h2>
              
              {submitStatus && (
                <div className={`p-4 mb-6 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Ad Soyad *</label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Adınız Soyadınız"
                    {...register('name', { required: 'İsim alanı zorunludur' })}
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">E-posta *</label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="E-posta adresiniz"
                    {...register('email', { 
                      required: 'E-posta alanı zorunludur',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Geçerli bir e-posta adresi giriniz'
                      }
                    })}
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Telefon</label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Telefon numaranız"
                    {...register('phone')}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Mesaj *</label>
                  <textarea
                    id="message"
                    rows="5"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Mesajınız..."
                    {...register('message', { required: 'Mesaj alanı zorunludur' })}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-md font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 