import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, PlayCircle, Folder } from 'lucide-react';

export default function Gallery({ lang }) {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const categoryLabels = {
    'child-sponsorship': { en: 'Child Sponsorship', ar: 'كفالة الأطفال' },
    'donor-donations-supplies': { en: 'Donor Donations & Supplies', ar: 'تبرعات ومستلزمات' },
    'incentive-gifts': { en: 'Incentive Gifts', ar: 'هدايا تحفيزية' },
    'mosques': { en: 'Mosques', ar: 'المساجد' },
    'student-printing': { en: 'Student Printing', ar: 'طباعة الطلاب' },
  };

  const galleryData = useMemo(() => {
    const files = import.meta.glob('/sutoor-images/**/*.{jpg,jpeg,png,gif,mp4,mov,webm}', { eager: true, query: '?url', import: 'default' });
    const data = [];
    Object.keys(files).forEach((filePath) => {
      const parts = filePath.split('/');
      if (parts.length >= 4) {
        const categoryName = parts[2];
        if (categoryName !== 'logo.jpg' && categoryName !== 'transform' && categoryName !== 'student-books') {
          const isVideo = filePath.match(/\.(mp4|mov|webm)$/i);
          data.push({
            src: files[filePath],
            category: categoryName,
            title: filePath.split('/').pop(),
            isVideo: !!isVideo
          });
        }
      }
    });
    return data;
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(galleryData.map(item => item.category));
    return ["all", ...Array.from(cats)];
  }, [galleryData]);

  const filteredData = useMemo(() => {
    if (filter === "all") return galleryData;
    return galleryData.filter(img => img.category === filter);
  }, [filter, galleryData]);

  useEffect(() => {
    const handleCustomEvent = (e) => {
      if (e.detail && categories.includes(e.detail)) {
        setFilter(e.detail);
      }
    };
    window.addEventListener('filterGallery', handleCustomEvent);
    return () => window.removeEventListener('filterGallery', handleCustomEvent);
  }, [categories]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const handleNext = () => setLightboxIndex((prev) => (prev + 1) % filteredData.length);
  const handlePrev = () => setLightboxIndex((prev) => (prev - 1 + filteredData.length) % filteredData.length);

  return (
    <section id="gallery" className="relative py-24 bg-bg-white overflow-hidden">
      <div className="absolute inset-0 bg-kufiya-sea opacity-[0.05]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block border border-primary-blue/30 px-4 py-1.5 rounded-full text-xs font-bold text-primary-blue bg-primary-blue/10 mb-3">
            {lang === 'en' ? "Field Documentation" : "التوثيق الميداني"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight">
            {lang === 'en' ? "Impact & Field Work Gallery" : "معرض الأثر والعمل الميداني"}
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const label = cat === 'all'
              ? (lang === 'en' ? 'All Media' : 'كل الوسائط')
              : (categoryLabels[cat] ? (lang === 'en' ? categoryLabels[cat].en : categoryLabels[cat].ar) : cat);
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  filter === cat
                    ? "bg-primary-blue text-white shadow-lg shadow-primary-blue/30"
                    : "bg-gray-50 text-text-muted hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((media, index) => (
              <motion.div
                layout
                key={media.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="break-inside-avoid relative rounded-2xl overflow-hidden group bg-gray-100 border border-gray-200 shadow-sm hover:shadow-xl cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                {media.isVideo ? (
                  <video src={media.src} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <img src={media.src} alt={media.title} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex justify-between items-center text-white">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <Folder className="w-4 h-4 text-accent-gold" /> {categoryLabels[media.category] ? (lang === 'en' ? categoryLabels[media.category].en : categoryLabels[media.category].ar) : media.category}
                    </span>
                    {media.isVideo ? <PlayCircle className="w-6 h-6 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4">
            <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition-colors cursor-pointer">
              <X className="h-6 w-6" />
            </button>
            <div className="relative w-full max-w-6xl flex items-center justify-center flex-grow py-8">
              <button onClick={handlePrev} className="absolute left-4 z-40 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition-colors cursor-pointer"><ChevronLeft className="h-6 w-6" /></button>
              {filteredData[lightboxIndex].isVideo ? (
                <video src={filteredData[lightboxIndex].src} controls autoPlay className="max-w-full max-h-[80vh] rounded-xl shadow-2xl border border-white/10" />
              ) : (
                <motion.img key={filteredData[lightboxIndex].src} src={filteredData[lightboxIndex].src} className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10" />
              )}
              <button onClick={handleNext} className="absolute right-4 z-40 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition-colors cursor-pointer"><ChevronRight className="h-6 w-6" /></button>
            </div>
            <div className="text-center text-white pb-6">
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs tracking-wider mb-2 inline-block text-gray-300">
                {categoryLabels[filteredData[lightboxIndex].category] ? (lang === 'en' ? categoryLabels[filteredData[lightboxIndex].category].en : categoryLabels[filteredData[lightboxIndex].category].ar) : filteredData[lightboxIndex].category}
              </span>
              <div className="text-sm text-gray-400 mt-2 font-mono">{lightboxIndex + 1} / {filteredData.length}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
