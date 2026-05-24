import React from 'react';
import CountUpModule from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Users, BookOpen, Heart, Building2 } from 'lucide-react';

// Handle ESM/CJS interop for react-countup
const CountUp = CountUpModule.default || CountUpModule;

export default function Stats({ lang, t }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      id: 1,
      icon: <Users className="w-8 h-8 text-primary-blue" />,
      number: 15000,
      suffix: '+',
      label: lang === 'en' ? 'Beneficiaries' : 'مستفيد',
    },
    {
      id: 2,
      icon: <BookOpen className="w-8 h-8 text-primary-green" />,
      number: 50000,
      suffix: '+',
      label: lang === 'en' ? 'Books Distributed' : 'كتاب تم توزيعه',
    },
    {
      id: 3,
      icon: <Building2 className="w-8 h-8 text-accent-gold" />,
      number: 120,
      suffix: '',
      label: lang === 'en' ? 'Projects Completed' : 'مشروع منجز',
    },
    {
      id: 4,
      icon: <Heart className="w-8 h-8 text-red-500" />,
      number: 5000,
      suffix: '+',
      label: lang === 'en' ? 'Happy Children' : 'طفل سعيد',
    }
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-tatreez pointer-events-none opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className="flex flex-col items-center justify-center p-6 bg-bg-light rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-text-main mb-2 font-inter">
                {inView ? (
                  <CountUp end={stat.number} duration={2.5} separator="," />
                ) : (
                  "0"
                )}
                <span className="text-primary-blue ml-1">{stat.suffix}</span>
              </h3>
              <p className="text-text-muted text-center font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
