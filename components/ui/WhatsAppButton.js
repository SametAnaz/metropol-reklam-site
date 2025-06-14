import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '+905435293814';
  const message = 'Merhaba, bilgi almak istiyorum.'; // Default message
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out z-50 flex items-center justify-center hover:scale-110"
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
    </button>
  );
};

export default WhatsAppButton;
