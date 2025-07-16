// pages/contact.js

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { NextSeo } from 'next-seo';
import ReCAPTCHA from "react-google-recaptcha";
import MainLayout from "@/components/layouts/MainLayout";
import Hero from "@/components/ui/Hero";
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [serverMessage, setServerMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const recaptchaRef = useRef();

  const onSubmit = async (data) => {
    try {
      setServerMessage("");
      setMessageType("");
      
      // reCAPTCHA doğrulaması
      const recaptchaValue = recaptchaRef.current.getValue();
      if (!recaptchaValue) {
        setMessageType("error");
        setServerMessage("Lütfen robot olmadığınızı doğrulayın.");
        return;
      }
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken: recaptchaValue
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessageType("success");
        setServerMessage("Mesajınız başarıyla gönderildi! Teşekkürler.");
        reset();
        recaptchaRef.current.reset();
      } else {
        setMessageType("error");
        setServerMessage(result.message || "Bir hata oluştu.");
        recaptchaRef.current.reset();
      }
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setServerMessage("Gönderim sırasında bir hata oluştu.");
      recaptchaRef.current.reset();
    }
  };

  return (
    <MainLayout 
      // Title and description are now primarily handled by NextSeo below
    >
      <NextSeo
        title="İletişim | Metropol Reklam Kusadasi - Tabelacı ve Reklam Hizmetleri Telefon"
        description="Kuşadası Metropol Reklam iletişim bilgileri. Tabela, dijital baskı ve reklam ihtiyaçlarınız için bize ulaşın. Kuşadası tabelacı telefon ve adres."
        canonical="https://metropolreklam.net/contact"
        openGraph={{
          url: 'https://metropolreklam.net/contact',
          title: 'İletişim - Metropol Reklam Kusadasi',
          description: 'Kuşadası\\\'ndaki tabela ve reklam ihtiyaçlarınız için Metropol Reklam ile iletişime geçin. Adres, telefon ve e-posta bilgileri.',
        }}
        additionalMetaTags={[{
          name: 'keywords',
          content: 'kuşadası tabelacı iletişim, kuşadası reklam telefon, metropol reklam adres, kuşadası tabela firması ulaşım, reklam ajansı kuşadası iletişim'
        }]}
      />
      <Hero
        title="İletişim"
        description="Profesyonel reklam çözümleri için bize ulaşın"
      />

      {/* Contact Info & Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <MapPinIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Adres</h3>
                    <p className="text-gray-600 mt-1">Kuşadası/Aydın, Türkiye</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <PhoneIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Telefon</h3>
                    <a href="tel:+905435293814" className="text-gray-600 mt-1 hover:text-primary transition-colors">
                      +90 (543) 529 38 14
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <EnvelopeIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">E-posta</h3>
                    <a href="mailto:metropolreklam@hotmail.com" className="text-gray-600 mt-1 hover:text-primary transition-colors">
                      metropolreklam@hotmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Çalışma Saatleri</h3>
                    <p className="text-gray-600 mt-1">Pazartesi - Cumartesi: 08.30 - 18:00</p>
                    <p className="text-gray-600">Pazar: Kapalı</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Bize Ulaşın</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* İsim */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    İsim
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "İsim zorunludur." })}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Adınız Soyadınız"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* E-Posta */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-Posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "E-posta zorunludur.",
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: "Geçerli bir e-posta girin.",
                      },
                    })}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="ornek@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Mesaj */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message", {
                      required: "Mesaj zorunludur.",
                      minLength: {
                        value: 10,
                        message: "Mesaj en az 10 karakter olmalı.",
                      },
                    })}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* reCAPTCHA */}
                <div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    className="mb-4"
                  />
                </div>

                {/* Gönder Butonu */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                  </button>
                </div>

                {/* Sunucu Mesajı */}
                {serverMessage && (
                  <div className={`p-3 rounded-md ${
                    messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {serverMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Bizi Ziyaret Edin</h2>
          <div className="max-w-6xl mx-auto">
            <div className="h-[450px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <iframe
                src="https://maps.google.com/maps?q=37.73802538464112,27.29327684619427&hl=tr&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Metropol Reklam Konum - Kuşadası, Aydın"
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://maps.app.goo.gl/3LVeZZvC1885Te9f8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                <MapPinIcon className="h-5 w-5" />
                <span>Google Maps'te Aç</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
