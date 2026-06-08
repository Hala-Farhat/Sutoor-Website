import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Info } from 'lucide-react';

export default function Crisis({ lang, t }) {
  
  const scrollToDonation = () => {
    const element = document.querySelector('#donate');
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
    <section id="crisis" className="relative py-24 bg-dark-bg overflow-hidden border-y border-accent-crimson/10">
      
      {/* Background Alerts & Lights */}
      <div className="absolute inset-0 bg-kufiya-sea opacity-[0.25] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-crimson/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute right-0 top-0 w-80 h-80 bg-primary-olive/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Urgency Alert Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Danger Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-accent-crimson/15 border border-accent-crimson/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-accent-crimson uppercase tracking-widest"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>{t.crisis.title}</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-warm-white tracking-tight leading-tight"
            >
              {t.crisis.subtitle}
            </motion.h2>

            {/* Explanations */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-warm-gray font-light leading-relaxed"
            >
              {t.crisis.body1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base text-warm-gray/90 font-light leading-relaxed"
            >
              {t.crisis.body2}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4"
            >
              <button
                onClick={scrollToDonation}
                className="w-full sm:w-auto bg-accent-crimson hover:bg-accent-crimson-hover text-warm-white font-bold py-4 px-8 rounded-full shadow-lg shadow-accent-crimson/20 hover:shadow-accent-crimson/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                {t.crisis.ctaBtn}
              </button>
            </motion.div>

          </div>

          {/* Right Urgency Stats Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 rounded-3xl border border-accent-crimson/20 relative shadow-2xl overflow-hidden bg-gradient-to-br from-dark-card to-accent-crimson/5"
            >
              {/* Subtle background Tatreez stitch */}
              <div className="absolute inset-0 bg-tatreez opacity-[0.04]" />
              
              <div className="relative z-10 space-y-6">
                
                <h3 className="text-lg font-bold text-warm-white border-b border-warm-white/5 pb-4">
                  {lang === 'en' ? "Crisis Indicators" : "مؤشرات الأزمة الحالية"}
                </h3>

                {/* Stat item 1 */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-accent-crimson/10 border border-accent-crimson/30 flex items-center justify-center text-accent-crimson flex-shrink-0">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-warm-white">
                      {lang === 'en' ? "Unprecedented Registration" : "أعداد طلبات قياسية"}
                    </h4>
                    <p className="text-xs text-warm-gray mt-1">
                      {lang === 'en' 
                        ? "+1,500 students applied in 24 hours. The highest demand in the initiative's history." 
                        : "أكثر من 1,500 طالب مسجل في غضون 24 ساعة فقط، وهو الرقم الأعلى منذ انطلاق المبادرة."}
                    </p>
                  </div>
                </div>

                {/* Stat item 2 */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-accent-crimson/10 border border-accent-crimson/30 flex items-center justify-center text-accent-crimson flex-shrink-0">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-warm-white">
                      {lang === 'en' ? "Extreme Printing Costs" : "ارتفاع أسعار الطباعة والورق"}
                    </h4>
                    <p className="text-xs text-warm-gray mt-1">
                      {lang === 'en' 
                        ? "Paper and ink supplies in Gaza are scarce, causing printing costs to increase tenfold." 
                        : "تضاعفت أسعار الورق والأحبار بشكل جنوني داخل غزة بسبب الحصار وشح المستلزمات."}
                    </p>
                  </div>
                </div>

                {/* Scarcity alert panel */}
                <div className="bg-accent-crimson/10 border border-accent-crimson/25 p-4 rounded-xl text-center">
                  <span className="block text-xs font-bold text-accent-crimson uppercase tracking-wider mb-2">
                    {lang === 'en' ? "Campaign Status" : "حالة التمويل"}
                  </span>
                  <p className="text-sm text-warm-white font-semibold">
                    {t.crisis.counterText}
                  </p>
                  
                  {/* Visual Scarcity Bar */}
                  <div className="w-full bg-white/5 h-2 rounded-full mt-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: "100%" }}
                      whileInView={{ width: "8%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 2.5, ease: "easeOut" }}
                      className="bg-accent-crimson h-full rounded-full" 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-warm-gray/60 mt-1 font-mono">
                    <span>{lang === 'en' ? "Funding Exhausted" : "التمويل شارف على النفاد"}</span>
                    <span>8% {lang === 'en' ? "Left" : "متبقي"}</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
