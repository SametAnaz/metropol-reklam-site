import React from 'react';

export default function Hero({ title, description, className = '' }) {
  return (
    <section className={`relative min-h-[300px] flex items-center ${className}`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
          {title}
        </h1>
        {description && (
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
            {description}
          </p>
        )}
      </div>
    </section>
  );
} 