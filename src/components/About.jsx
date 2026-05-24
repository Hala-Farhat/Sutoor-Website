import React from 'react';
import { motion } from 'framer-motion';

export default function About({ lang, t }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="relative py-24 bg-white overflow-hidden">
      
      {/* Visual Accents */}
      <div className="absolute inset-0 bg-kufiya-net opacity-[0.03] pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary-green/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-primary-blue/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-block border border-primary-green/30 px-4 py-1.5 rounded-full text-xs font-bold text-primary-green uppercase tracking-widest bg-primary-green/5 mb-3"
          >
            {t.about.title}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight"
          >
            {lang === 'en' ? "Our Story & Operational Journey" : "قصة مسيرتنا وعملنا الميداني"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-text-muted font-light"
          >
            {t.about.subtitle}
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-green/20 via-gray-200 to-primary-blue/20 hidden md:block`} />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16 md:space-y-0"
          >
            {t.about.timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative md:grid md:grid-cols-2 md:gap-12 items-center">
                  
                  {/* Timeline Dot (Desktop only) */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-white border-4 border-primary-green shadow-sm shadow-primary-green/20" />
                  </div>

                  {/* Card wrapper */}
                  <div className={`${isEven ? 'md:col-start-1 text-right md:pr-8' : 'md:col-start-2 md:pl-8'} flex flex-col`}>
                    <motion.div 
                      variants={cardVariants}
                      whileHover={{ y: -4, borderColor: "rgba(46, 204, 113, 0.4)" }}
                      className={`bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 relative shadow-lg overflow-hidden transition-all duration-300 ${
                        isEven ? 'text-left md:text-right' : 'text-left'
                      }`}
                    >
                      {/* Subtly colored side bars on cards */}
                      <div className={`absolute top-0 bottom-0 w-1 ${isEven ? 'left-0 md:left-auto md:right-0 bg-primary-green' : 'left-0 bg-primary-blue'}`} />
                      
                      {/* Timeline Node Text */}
                      <span className="text-xs font-bold text-primary-green uppercase tracking-wider font-mono">
                        {item.year}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-text-main mt-2 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-text-muted leading-relaxed font-light">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                  
                </div>
              );
            })}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
