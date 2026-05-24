import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FolderOpen, ImageIcon, PlaySquare } from 'lucide-react';

export default function Projects({ lang, t }) {
  const scrollToGallery = (category) => {
    // Basic navigation to gallery and perhaps filtering (this needs integration with Gallery)
    window.location.hash = '#gallery';
    // Small timeout to allow smooth scroll before filtering, or just let the user see the gallery
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('filterGallery', { detail: category }));
    }, 500);
  };

  const projects = useMemo(() => {
    // Dynamically import all images and videos from the sutoor-images folder
    const files = import.meta.glob('/sutoor-images/**/*.{jpg,jpeg,png,gif,mp4,mov,webm}', { eager: true, query: '?url', import: 'default' });
    
    const projectsMap = {};
    
    Object.keys(files).forEach((filePath) => {
      // Expected format: /sutoor-images/Project Name/filename.ext
      const parts = filePath.split('/');
      if (parts.length >= 4) {
        const categoryName = parts[2]; // Folder name is the project name
        if (!projectsMap[categoryName]) {
          projectsMap[categoryName] = {
            name: categoryName,
            files: [],
            cover: null
          };
        }
        projectsMap[categoryName].files.push(files[filePath]);
        if (!projectsMap[categoryName].cover && !filePath.match(/\.(mp4|mov|webm)$/i)) {
          projectsMap[categoryName].cover = files[filePath]; // Set first image as cover
        }
      }
    });

    return Object.values(projectsMap).filter(p => p.name !== 'logo.jpg' && p.name !== 'transform' && p.name !== 'student-books');
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="projects" className="relative py-24 bg-bg-light overflow-hidden">
      <div className="absolute inset-0 bg-kufiya-net opacity-[0.05] pointer-events-none" />
      <div className="absolute right-10 bottom-10 w-96 h-96 bg-primary-green/5 rounded-full filter blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block border border-primary-green/20 px-4 py-1.5 rounded-full text-xs font-bold text-primary-green bg-primary-green/5 mb-3">
            {lang === 'en' ? "Our Projects" : "مشاريعنا"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            {lang === 'en' ? "Explore Our Latest Initiatives" : "اكتشف أحدث مبادراتنا"}
          </h2>
          <p className="mt-4 text-base text-text-muted font-light">
            {lang === 'en' ? "Browse through our organized files to see the impact we make on the ground." : "تصفح ملفاتنا المنظمة لترى الأثر الذي نصنعه على أرض الواقع."}
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6, borderColor: "rgba(46, 204, 113, 0.45)" }}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg flex flex-col transition-all duration-300 relative group overflow-hidden cursor-pointer"
              onClick={() => scrollToGallery(proj.name)}
            >
              <div className="h-48 w-full relative overflow-hidden bg-gray-100">
                {proj.cover ? (
                  <img src={proj.cover} alt={proj.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <FolderOpen size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <h3 className="text-xl font-bold line-clamp-1">{t && t.gallery && t.gallery.categories && t.gallery.categories[proj.name] ? t.gallery.categories[proj.name].title : proj.name}</h3>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <p className="text-sm text-text-muted mb-4 line-clamp-2">
                    {lang === 'en'
                      ? `View photos and videos documenting the activities for ${t && t.gallery && t.gallery.categories && t.gallery.categories[proj.name] ? t.gallery.categories[proj.name].title : proj.name}.`
                      : `شاهد الصور والفيديوهات التي توثق الأنشطة الخاصة بـ ${t && t.gallery && t.gallery.categories && t.gallery.categories[proj.name] ? t.gallery.categories[proj.name].title : proj.name}.`}
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                  <div className="flex gap-3 text-xs font-semibold text-text-muted">
                    <span className="flex items-center gap-1"><ImageIcon className="w-4 h-4 text-primary-blue" /> {proj.files.filter(f => !f.match(/\.(mp4|mov|webm)$/i)).length}</span>
                    <span className="flex items-center gap-1"><PlaySquare className="w-4 h-4 text-accent-gold" /> {proj.files.filter(f => f.match(/\.(mp4|mov|webm)$/i)).length}</span>
                  </div>
                  <button className="flex items-center gap-1 text-primary-green text-sm font-bold group-hover:text-primary-green-light transition-colors">
                    {lang === 'en' ? "View Gallery" : "عرض المعرض"}
                    <ArrowRight className={`w-4 h-4 transform group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </button>
                </div>
              </div>
              
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-primary-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
