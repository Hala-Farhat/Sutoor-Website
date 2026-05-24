import React from 'react';
import { motion } from 'framer-motion';
import { Download, Shield, Eye, FileText, CheckCircle2 } from 'lucide-react';

export default function Partnership({ lang, t }) {
  
  const benefits = [
    {
      icon: Shield,
      titleEn: "Direct Humanitarian Impact",
      titleAr: "أثر إنساني مباشر",
      descEn: "Fund textbook packages, printing ink, and educational resources directly reaching students in shelters.",
      descAr: "كفالة طباعة المناهج وتوفير مستلزمات التعليم مباشرة للطلاب النازحين في الخيام."
    },
    {
      icon: Eye,
      titleEn: "Continuous Media Visibility",
      titleAr: "تغطية إعلامية مستمرة",
      descEn: "Partner name and branding will consistently appear in documented media and distribution banners.",
      descAr: "إبراز شعار وهوية الشريك الداعم في جميع التقارير المصورة واللافتات الميدانية للمبادرة."
    },
    {
      icon: FileText,
      titleEn: "Transparent Field Reports",
      titleAr: "تقارير ميدانية شفافة",
      descEn: "Receive verified logs including student lists, photographic proof, and financial breakdowns.",
      descAr: "استلام تقارير دورية موثقة تشتمل على قوائم الطلاب، صور التسليم، والتفاصيل المالية."
    }
  ];

  return (
    <section id="partnership" className="relative py-24 bg-dark-bg/60 overflow-hidden border-t border-warm-white/5">
      
      {/* Background visual styles */}
      <div className="absolute inset-0 bg-kufiya-sea opacity-[0.2]" />
      <div className="absolute right-1/4 top-1/3 w-96 h-96 bg-primary-olive/3 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Visual Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text & Pitch */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block border border-primary-olive/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary-olive-light uppercase tracking-widest bg-primary-olive-dark/10">
              {lang === 'en' ? "Institutional Funding" : "التمويل المؤسسي والشراكة"}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-warm-white tracking-tight">
              {t.partnership.title}
            </h2>
            <h3 className="text-lg font-semibold text-primary-olive-light">
              {t.partnership.subtitle}
            </h3>
            
            <p className="text-sm sm:text-base text-warm-gray leading-relaxed font-light">
              {t.partnership.desc1}
            </p>
            <p className="text-sm text-warm-gray/90 leading-relaxed font-light">
              {t.partnership.desc2}
            </p>

            {/* Download Button */}
            <div className="pt-4">
              <a
                href="/assets/proposal.pdf"
                download="Partnership Proposal - Supporting Education in Gaza.pdf"
                className="inline-flex items-center justify-center gap-2 bg-primary-olive hover:bg-primary-olive-light text-warm-white font-bold py-4 px-8 rounded-full shadow-lg shadow-primary-olive/20 hover:shadow-primary-olive-light/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Download className="h-5 w-5" />
                <span>{t.partnership.proposalBtn}</span>
              </a>
            </div>
          </div>

          {/* Right: Benefits Cards */}
          <div className="lg:col-span-6 space-y-6">
            {benefits.map((b, idx) => {
              const IconComp = b.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-2xl glass-card border border-warm-white/5 shadow-md"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary-olive/10 border border-primary-olive/20 flex items-center justify-center text-primary-olive-light flex-shrink-0">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-warm-white flex items-center gap-2">
                      <span>{lang === 'en' ? b.titleEn : b.titleAr}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary-olive-light" />
                    </h4>
                    <p className="text-xs sm:text-sm text-warm-gray mt-1 font-light leading-relaxed">
                      {lang === 'en' ? b.descEn : b.descAr}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
