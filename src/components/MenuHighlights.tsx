import { motion } from 'motion/react';
import { useState } from 'react';

type MenuCategory = 'All' | 'Highlights' | 'Latest' | 'Menu' | 'Food & Drinks' | 'Kebab' | 'Paratha' | 'Vibe' | 'Video' | 'Street View & 360°';
export type MediaType = 'image' | 'video' | 'iframe';

export interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  alt: string;
  category: MenuCategory;
  thumbnail?: string; // Optional: specify a thumbnail image for video/iframe in the grid
}

// ------------------------------------------------------------------------------------------
// HOW TO ADD NEW MEDIA:
// 1. Upload your files to the `public/` folder (e.g. `public/menu`, `public/videos`).
// 2. Add a new object to the `mediaItems` array below.
// 3. Set the `type` to 'image', 'video', or 'iframe'.
// 4. Set the `src` to the path of your file (e.g. '/videos/my-video.mp4') or your embed link.
// 5. Select the appropriate `category`.
// ------------------------------------------------------------------------------------------

const mediaItems: MediaItem[] = [
  // --- HIGHLIGHTS ---
  // We automatically generate 16 image placeholders here for your Highlights category.
  // Upload your 16 images to a new folder called "public/highlights/" 
  // and name them "01.jpg", "02.jpg", "03.jpg", etc., up to "16.jpg".
  ...Array.from({ length: 16 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `h-auto-${num}`,
      type: 'image' as MediaType,
      src: `${import.meta.env.BASE_URL}highlights/${num}.jpg`,
      alt: `Highlight ${num}`,
      category: 'Highlights' as MenuCategory
    };
  }),

  // --- LATEST ---
  {
    id: 'l-salam-baku',
    type: 'image' as MediaType,
    src: `${import.meta.env.BASE_URL}latest/Salam Baku Thumbnail.png`,
    alt: 'Salam Baku Thumbnail',
    category: 'Latest' as MenuCategory
  },
  ...Array.from({ length: 30 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `l-auto-${num}`,
      type: 'image' as MediaType,
      src: `${import.meta.env.BASE_URL}latest/${num}.jpg`,
      alt: `Latest ${num}`,
      category: 'Latest' as MenuCategory
    };
  }),

  // --- MENU ---
  // Menus generated up to 28 as per public/menu/README.md
  ...Array.from({ length: 28 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `m-auto-${num}`,
      type: 'image' as MediaType,
      src: `${import.meta.env.BASE_URL}menu/${num}.jpg`,
      alt: `Menu ${num}`,
      category: 'Menu' as MenuCategory
    };
  }),

  // --- VIBE ---
  ...Array.from({ length: 37 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `v-auto-${num}`,
      type: 'image' as MediaType,
      src: `${import.meta.env.BASE_URL}vibe/${num}.jpg`,
      alt: `Vibe ${num}`,
      category: 'Vibe' as MenuCategory
    };
  }),
  
  // --- FOOD & DRINKS ---
  // We automatically generate 63 image placeholders here for your Food & Drinks category.
  ...Array.from({ length: 63 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `fd-auto-${num}`,
      type: 'image' as MediaType,
      src: `${import.meta.env.BASE_URL}food-drinks/${num}.jpg`,
      alt: `Food & Drinks ${num}`,
      category: 'Food & Drinks' as MenuCategory
    };
  }),

  // --- KEBAB ---
  ...Array.from({ length: 12 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `k-auto-${num}`,
      type: 'image' as MediaType,
      src: `${import.meta.env.BASE_URL}kebab/${num}.jpg`,
      alt: `Kebab ${num}`,
      category: 'Kebab' as MenuCategory
    };
  }),

  // --- PARATHA ---
  ...Array.from({ length: 6 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `p-auto-${num}`,
      type: 'image' as MediaType,
      src: `${import.meta.env.BASE_URL}paratha/${num}.jpg`,
      alt: `Paratha ${num}`,
      category: 'Paratha' as MenuCategory
    };
  }),
  
  // --- VIDEO ---
  // { id: 'vid1', type: 'video', src: '/videos/promo.mp4', alt: 'Promo Video', category: 'Video' },
  
  // --- STREET VIEW & 360° ---
  // { id: '360view', type: 'iframe', src: 'https://www.google.com/maps/embed?...', alt: '360 degree view', category: 'Street View & 360°' }
];

export default function MenuHighlights() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');

  const categories: MenuCategory[] = ['All', 'Highlights', 'Latest', 'Menu', 'Food & Drinks', 'Kebab', 'Paratha', 'Vibe', 'Video', 'Street View & 360°'];

  const filteredMenu = activeCategory === 'All' 
    ? mediaItems 
    : mediaItems.filter(page => page.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-ajrak-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-extrabold text-4xl md:text-5xl mb-4"
          >
            Salam Baku <span className="text-brand-neon">Menu</span>
          </motion.h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-4">
            Browse our full authentic menu. Click on any page to enlarge.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeCategory === category 
                  ? 'bg-brand-neon text-brand-dark shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                  : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* CSS Grid for the menu pages */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMenu.map((item, idx) => (
            <motion.div
              key={`${item.id}-${activeCategory}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="cursor-pointer group relative rounded-lg overflow-hidden border border-white/10 hover:border-brand-neon transition-colors"
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-[3/4] bg-white/5 relative flex items-center justify-center">
                {item.type === 'image' && (
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {item.type === 'video' && (
                  item.thumbnail ? (
                    <img 
                      src={item.thumbnail} 
                      alt={item.alt} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-white/5 text-white/50 group-hover:bg-white/10 transition-colors">
                      <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span className="text-sm font-medium">Video</span>
                    </div>
                  )
                )}
                {item.type === 'iframe' && (
                  item.thumbnail ? (
                    <img 
                      src={item.thumbnail} 
                      alt={item.alt} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-white/5 text-white/50 group-hover:bg-white/10 transition-colors">
                       <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span className="text-sm font-medium">360° View</span>
                    </div>
                  )
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-full border border-white/20">
                    {item.type === 'image' ? 'View Page' : item.type === 'video' ? 'Play Video' : 'Open View'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Media Modal */}
        {selectedItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8"
            onClick={() => setSelectedItem(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-brand-neon font-bold text-xl z-10 transition-colors">
              ✕ Close
            </button>
            <div 
              className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === 'image' && (
                <img 
                  src={selectedItem.src} 
                  alt={selectedItem.alt} 
                  className="max-w-full max-h-[90vh] object-contain rounded-lg border border-white/20 shadow-2xl"
                />
              )}
              {selectedItem.type === 'video' && (
                <video 
                  src={selectedItem.src} 
                  controls 
                  autoPlay
                  className="w-full max-h-[90vh] object-contain rounded-lg border border-white/20 shadow-2xl"
                />
              )}
              {selectedItem.type === 'iframe' && (
                <iframe 
                  src={selectedItem.src} 
                  className="w-full h-[80vh] rounded-lg border border-white/20 shadow-2xl"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
