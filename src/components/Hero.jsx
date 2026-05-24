import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const slides = [
  "/assets/images/hero-slide-1.jpg",
  "/assets/images/hero-slide-2.jpg",
  "/assets/images/hero-slide-3.jpg"
];

export default function Hero({ lang, t }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-bg-light select-none">
      
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide]}
            alt="Sutoor Field Activities"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        
        {/* Soft Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-primary-green/10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16 flex flex-col justify-center min-h-[90vh]">
        
        <div className="space-y-8">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 rounded-full shadow-lg"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-accent-gold animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              {lang === 'en' ? 'Gaza Educational Support' : 'دعم التعليم في غزة'} • {lang === 'en' ? 'Live Campaign' : 'حملة مستمرة'}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none max-w-4xl mx-auto drop-shadow-lg ${
              lang === 'ar' ? 'leading-normal' : ''
            }`}
          >
            {lang === 'en' ? (
              <>
                Education Should <span className="text-accent-gold">Not Stop</span> Because of War
              </>
            ) : (
              <>
                التعليم يجب ألا <span className="text-accent-gold">يتوقف</span> بسبب الحرب
              </>
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md"
          >
            {t.hero.subheadline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm sm:text-base text-accent-gold max-w-2xl mx-auto font-bold leading-relaxed drop-shadow-md"
          >
            {t.hero.exploreMore}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection('#donate')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-green hover:bg-primary-green-light text-white px-8 py-4 rounded-full text-base font-bold shadow-xl shadow-primary-green/30 hover:shadow-primary-green-light/40 transition-all transform hover:-translate-y-1 cursor-pointer"
            >
              <Heart className="h-5 w-5 fill-current text-white" />
              <span>{t.hero.donateBtn}</span>
            </button>
            
            <button
              onClick={() => scrollToSection('#gallery')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full text-base font-semibold backdrop-blur-md transition-all cursor-pointer"
            >
              {t.hero.impactBtn}
            </button>
          </motion.div>

        </div>
        
      </div>

      {/* Bottom border divider */}
      <div className="absolute bottom-0 left-0 right-0 h-2 z-20 bg-gradient-to-r from-primary-blue via-primary-green to-accent-gold opacity-90" />
    </div>
  );
}
