// pages/contact.js

import { useState } from "react";
import { useForm } from "react-hook-form";
import MainLayout from "@/components/layouts/MainLayout";
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

  const onSubmit = async (data) => {
    try {
      setServerMessage("");
      setMessageType("");
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessageType("success");
        setServerMessage("Mesajınız başarıyla gönderildi! Teşekkürler.");
        reset();
      } else {
        setMessageType("error");
        setServerMessage(result.message || "Bir hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setServerMessage("Gönderim sırasında bir hata oluştu.");
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark opacity-80 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-dark/20 to-dark z-20"></div>
        </div>
        <div className="relative z-30 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">İletişim</h1>
          <p className="text-xl text-gray-200">Sizinle çalışmak için sabırsızlanıyoruz</p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h2>
              
              <div className="flex items-start space-x-4">
                <MapPinIcon className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Adres</h3>
                  <p className="text-gray-600 mt-1">Aydın/Kusadasi, Türkiye</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <PhoneIcon className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Telefon</h3>
                  <p className="text-gray-600 mt-1">+90 (555) 123 45 67</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <EnvelopeIcon className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">E-posta</h3>
                  <p className="text-gray-600 mt-1">info@metropolreklam.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <ClockIcon className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Çalışma Saatleri</h3>
                  <p className="text-gray-600 mt-1">Pazartesi - Cumartesi: 09:00 - 18:00</p>
                  <p className="text-gray-600">Pazar: Kapalı</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Bize Ulaşın</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* İsim */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    İsim
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "İsim zorunludur." })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* E-Posta */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Mesaj */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message", {
                      required: "Mesaj zorunludur.",
                      minLength: {
                        value: 10,
                        message: "Mesaj en az 10 karakter olmalı.",
                      },
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Gönder Butonu */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                  </button>
                </div>

                {/* Sunucu Mesajı */}
                {serverMessage && (
                  <p className={`text-center p-3 rounded ${
                    messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {serverMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Bizi Ziyaret Edin</h2>
          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            {/* Buraya Google Maps iframe eklenecek */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-600">Harita yükleniyor...</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
