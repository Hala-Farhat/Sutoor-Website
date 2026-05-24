import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials({ lang, t }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const list = t.testimonials.list;

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % list.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isHovered, list.length]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + list.length) % list.length);
  };

  return (
    <section className="relative py-24 bg-dark-bg overflow-hidden border-b border-warm-white/5">
      
      {/* Background visual styles */}
      <div className="absolute inset-0 bg-kufiya-net opacity-[0.1] pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-96 h-96 bg-primary-olive/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block border border-primary-olive/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary-olive-light uppercase tracking-widest bg-primary-olive-dark/10 mb-3">
            {t.testimonials.title}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-warm-white tracking-tight">
            {t.testimonials.subtitle}
          </h2>
        </div>

        {/* Carousel Frame */}
        <div 
          className="relative px-2 sm:px-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: lang === 'en' ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: lang === 'en' ? -40 : 40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-card p-8 sm:p-12 rounded-3xl border border-warm-white/5 shadow-2xl relative"
            >
              {/* Quote Mark Icon */}
              <Quote className="absolute top-6 right-6 sm:top-10 sm:right-10 h-16 w-16 text-primary-olive/10 pointer-events-none" />
              
              <div className="space-y-6">
                
                {/* Quote Text */}
                <p className="text-lg sm:text-2xl font-light text-warm-white leading-relaxed italic">
                  "{list[activeIdx].quote}"
                </p>

                {/* Author Info */}
                <div className="border-t border-warm-white/5 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className="text-base font-bold text-primary-olive-light">
                      {list[activeIdx].author}
                    </h4>
                    <p className="text-xs text-warm-gray/60 font-sans mt-0.5">
                      {list[activeIdx].role}
                    </p>
                  </div>
                  
                  {/* Indicators Pagination dots */}
                  <div className="flex gap-2.5">
                    {list.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          activeIdx === idx ? 'w-8 bg-primary-olive' : 'w-2.5 bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-[-16px] sm:left-0 top-1/2 transform -translate-y-1/2 bg-dark-card border border-warm-white/5 hover:border-primary-olive-light text-warm-gray hover:text-warm-white p-3 rounded-full shadow-lg z-20 cursor-pointer hidden sm:block"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Arrow Controls */}
          <button
            onClick={handleNext}
            className="absolute right-[-16px] sm:right-0 top-1/2 transform -translate-y-1/2 bg-dark-card border border-warm-white/5 hover:border-primary-olive-light text-warm-gray hover:text-warm-white p-3 rounded-full shadow-lg z-20 cursor-pointer hidden sm:block"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

        </div>

      </div>
    </section>
  );
}
