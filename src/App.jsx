import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Crisis from './components/Crisis';
import Gallery from './components/Gallery';
import Donation from './components/Donation';
import Transparency from './components/Transparency';
import Partnership from './components/Partnership';
import Footer from './components/Footer';
import { translations } from './translations';
import { Heart } from 'lucide-react';
import Stats from './components/Stats';

export default function App() {
  const [lang, setLang] = useState('ar'); // Default to Arabic (AR) for authentic branding
  const [showFloatBtn, setShowFloatBtn] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  const t = translations[lang];

  // Set document attributes for SEO, accessibility, and RTL mirroring
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    if (lang === 'ar') {
      document.body.classList.add('rtl-layout');
    } else {
      document.body.classList.remove('rtl-layout');
    }
  }, [lang]);

  // Monitor scroll height to show/hide floating donation button
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatBtn(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFloatClick = () => {
    setCurrentView('donate');
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen bg-bg-light text-text-main selection:bg-primary-green selection:text-white transition-colors duration-300">
      
      {/* Structural Components */}
      <Navbar lang={lang} setLang={setLang} t={t} currentView={currentView} setCurrentView={setCurrentView} />
      
      {currentView === 'home' ? (
        <>
          <Hero lang={lang} t={t} />
          <Stats lang={lang} t={t} />
          <About lang={lang} t={t} />
          <Projects lang={lang} t={t} />
          <Crisis lang={lang} t={t} />
          <Gallery lang={lang} t={t} />
          <Donation lang={lang} t={t} />
          <Transparency lang={lang} t={t} />
          <Partnership lang={lang} t={t} />
        </>
      ) : (
        <div className="pt-24">
          <Donation lang={lang} t={t} />
        </div>
      )}
      
      <Footer lang={lang} t={t} />

      {/* Floating Action Donation Button */}
      <div className={`fixed bottom-6 z-40 transition-all duration-500 ease-out transform ${
        showFloatBtn 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-90 pointer-events-none'
      } ${
        lang === 'ar' ? 'left-6' : 'right-6'
      }`}>
        <button
          onClick={handleFloatClick}
          className="flex items-center gap-2 bg-primary-green hover:bg-primary-green-light text-white px-5 py-3.5 rounded-full font-bold shadow-2xl shadow-primary-green-light/35 border border-primary-green-light/20 hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <Heart className="h-5 w-5 fill-current text-white animate-pulse" />
          <span className="text-sm font-bold">
            {lang === 'en' ? "Donate" : "تبرع الآن"}
          </span>
        </button>
      </div>

    </div>
  );
}
