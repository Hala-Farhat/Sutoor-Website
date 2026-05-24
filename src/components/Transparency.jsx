import React from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, FileInput, Users, CheckCircle, Video } from 'lucide-react';

const iconMap = [
  FileInput,
  FileSpreadsheet,
  Users,
  Video
];

export default function Transparency({ lang, t }) {
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="transparency" className="relative py-24 bg-bg-light overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute inset-0 bg-kufiya-net opacity-[0.03] pointer-events-none" />
      <div className="absolute left-1/4 bottom-10 w-80 h-80 bg-primary-green/5 rounded-full filter blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block border border-primary-green/30 px-4 py-1.5 rounded-full text-xs font-bold text-primary-green uppercase tracking-widest bg-primary-green/5 mb-3">
            {lang === 'en' ? "Our Commitment" : "التزامنا بالشفافية"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            {t.transparency.title}
          </h2>
          <p className="mt-4 text-base text-text-muted font-light">
            {t.transparency.subtitle}
          </p>
        </div>

        {/* Transparency Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {t.transparency.cards.map((card, i) => {
            const IconComponent = iconMap[i] || CheckCircle;
            
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl hover:border-primary-green/30"
              >
                {/* Step indicator circle */}
                <div className="absolute -top-4 bg-primary-green text-white text-xs font-black h-8 w-8 rounded-full border border-white shadow-sm flex items-center justify-center font-mono">
                  {i + 1}
                </div>

                {/* Icon display */}
                <div className="h-14 w-14 rounded-full bg-primary-green/10 border border-primary-green/20 flex items-center justify-center text-primary-green mb-6 mt-2">
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Title and details */}
                <h3 className="text-lg font-bold text-text-main mb-3">
                  {card.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-light">
                  {card.desc}
                </p>
                
              </motion.div>
            );
          })}
        </motion.div>

        {/* Verification Note Banner */}
        <div className="mt-16 max-w-3xl mx-auto text-center border-t border-gray-200 pt-8">
          <p className="text-xs text-text-muted uppercase tracking-widest font-mono">
            {lang === 'en' 
              ? "All operations are verified and updated weekly on our network channels." 
              : "يتم تحديث ونشر جميع التقارير الأسبوعية بشكل دوري عبر قنواتنا الرسمية."}
          </p>
        </div>
        
      </div>
    </section>
  );
}
