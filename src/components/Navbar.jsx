import { useState, useEffect } from 'react';
import { Globe, Menu, X, Heart } from 'lucide-react';

export default function Navbar({ lang, setLang, t, currentView, setCurrentView }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#crisis", label: t.nav.crisis },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#transparency", label: t.nav.transparency },
    { href: "#partnership", label: t.nav.partnership },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href === '#donate') {
      setCurrentView('donate');
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo & Brand */}
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); window.scrollTo(0,0); }} className="flex items-center gap-3 group">
            <img 
              src="/assets/images/logo.jpg" 
              alt="Sutoor Initiative Logo" 
              className="h-10 w-10 rounded-full object-cover border border-primary-green/30 shadow-sm group-hover:scale-105 transition-transform" 
            />
            <span className={`text-xl font-bold tracking-wide transition-colors ${isScrolled ? 'text-text-main' : 'text-text-main'} group-hover:text-primary-green`}>
              {t.nav.brand}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-text-muted hover:text-primary-green font-medium text-sm transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary-green after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language Switcher & Donation CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-text-main text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Globe className="h-4 w-4 text-primary-blue" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </button>
            <a
              href="#donate"
              onClick={(e) => handleNavClick(e, '#donate')}
              className="flex items-center gap-2 bg-primary-green hover:bg-primary-green-light text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-primary-green/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Heart className="h-4 w-4 fill-current text-white animate-pulse" />
              <span>{t.nav.donate}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-gray-200 text-text-main text-xs font-semibold hover:bg-gray-50"
            >
              <Globe className="h-3.5 w-3.5 text-primary-blue" />
              <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-main hover:text-primary-green p-2 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`lg:hidden fixed inset-0 top-[70px] z-40 bg-white/95 backdrop-blur-md transition-transform duration-300 ease-out transform ${
        isOpen ? 'translate-x-0' : (lang === 'en' ? 'translate-x-full' : '-translate-x-full')
      }`}>
        <div className="px-4 pt-6 pb-8 space-y-3 flex flex-col items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-3 text-lg font-medium text-text-muted hover:text-primary-green border-b border-gray-100 w-full text-center"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-6 w-full flex justify-center">
            <a
              href="#donate"
              onClick={(e) => handleNavClick(e, '#donate')}
              className="flex items-center justify-center gap-2 bg-primary-green hover:bg-primary-green-light text-white px-8 py-3.5 rounded-full text-base font-bold w-full max-w-[280px] shadow-lg shadow-primary-green/30"
            >
              <Heart className="h-5 w-5 fill-current text-white" />
              <span>{t.nav.donate}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
