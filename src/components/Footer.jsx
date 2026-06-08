import { Mail, Phone, Heart } from 'lucide-react';

export default function Footer({ lang, t }) {
  
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
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
    <footer className="relative bg-dark-bg overflow-hidden border-t border-warm-white/5 select-none">
      
      {/* Top Border with Palestinian Flag Colors */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex z-20">
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-[#fff]" />
        <div className="flex-1 bg-[#2C5E43]" />
        <div className="flex-1 bg-[#E63946]" />
      </div>

      {/* Subtle background embroidery */}
      <div className="absolute inset-0 bg-tatreez opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-warm-white/5 pb-12 mb-12">
          
          {/* Col 1: Logo & Tagline */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/images/logo.jpg" 
                alt="Sutoor Logo" 
                className="h-12 w-12 rounded-full object-cover border border-primary-olive/30 shadow-md"
              />
              <span className="text-2xl font-bold tracking-wide text-warm-white">
                {t.nav.brand}
              </span>
            </div>
            <p className="text-sm text-warm-gray/80 leading-relaxed font-light max-w-sm">
              {t.footer.tagline}
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/sutoor.intiative"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-full bg-white/5 hover:bg-primary-olive text-warm-gray hover:text-warm-white flex items-center justify-center border border-white/5 hover:border-primary-olive transition-colors"
                aria-label="Sutoor Instagram"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/hala-farhat-73775b286/"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-full bg-white/5 hover:bg-primary-olive text-warm-gray hover:text-warm-white flex items-center justify-center border border-white/5 hover:border-primary-olive transition-colors"
                aria-label="Sutoor LinkedIn"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-warm-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="text-warm-gray hover:text-primary-olive-light transition-colors"
                >
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  onClick={(e) => handleNavClick(e, '#projects')}
                  className="text-warm-gray hover:text-primary-olive-light transition-colors"
                >
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  onClick={(e) => handleNavClick(e, '#gallery')}
                  className="text-warm-gray hover:text-primary-olive-light transition-colors"
                >
                  {t.nav.gallery}
                </a>
              </li>
              <li>
                <a 
                  href="#partnership" 
                  onClick={(e) => handleNavClick(e, '#partnership')}
                  className="text-warm-gray hover:text-primary-olive-light transition-colors"
                >
                  {t.nav.partnership}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-warm-white uppercase tracking-wider">
              {t.footer.contactUs}
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-primary-olive-light flex-shrink-0" />
                <a 
                  href="mailto:halafarhat446@gmail.com" 
                  className="text-warm-gray hover:text-warm-white font-mono break-all"
                >
                  halafarhat446@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-primary-olive-light flex-shrink-0" />
                <a 
                  href="https://wa.me/972594465910" 
                  target="_blank"
                  rel="noreferrer"
                  className="text-warm-gray hover:text-warm-white font-mono"
                >
                  +972 59-446-5910
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-warm-gray/40 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {t.footer.rights}.
          </p>
          
          <div className="flex items-center gap-1">
            <span>{t.footer.palestineText}</span>
            <Heart className="h-3 w-3 fill-current text-accent-crimson animate-pulse" />
          </div>
          
          <div className="flex items-center gap-1.5 text-warm-gray/60 font-medium">
            <span>{lang === 'en' ? 'Developed with' : 'صُنع بحب بواسطة'}</span>
            <Heart className="h-3 w-3 text-primary-olive fill-current" />
            <span className="text-warm-gray hover:text-primary-olive transition-colors cursor-pointer">
              {lang === 'en' ? 'Hala Farhat' : 'هلا فرحات'}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
