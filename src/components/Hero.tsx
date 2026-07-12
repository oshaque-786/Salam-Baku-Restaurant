import { motion } from 'motion/react';
import { ArrowRight, Utensils } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 pb-24 overflow-hidden bg-ajrak-pattern">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-neon/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-neon text-sm font-medium mb-6">
              <Utensils className="w-4 h-4" />
              <span>Taste The Best, Live The Experience!</span>
            </div>
            
            <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.1] mb-6">
              Good Food,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-blue-400 text-glow">
                Great Moments
              </span>
            </h1>
            
            <p className="text-lg text-white/70 max-w-lg mb-8 leading-relaxed font-sans">
              Experience the perfect blend of traditional flavors and modern dining. Authentic Biryani, sizzling BBQ, rich Karahi, and more, crafted with passion.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#menu" className="px-8 py-4 bg-brand-neon text-brand-dark font-bold rounded-full hover:bg-white transition-all flex items-center gap-2 group box-glow">
                Order Delivery
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#reservation" className="px-8 py-4 bg-transparent border-2 border-brand-accent text-white font-bold rounded-full hover:bg-brand-accent/20 transition-all flex items-center justify-center shadow-[0_0_15px_rgba(139,28,49,0.4)]">
                Reserve Table
              </a>
            </div>
            
            <div className="mt-10 flex items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Accepting Orders Now
              </span>
              <span>•</span>
              <span>Fastest Delivery in Baku</span>
            </div>
          </motion.div>

          {/* Right Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main feature image - A clear Biryani image */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,28,49,0.3)] border-4 border-brand-accent/50 aspect-square max-h-[600px] ml-auto">
            <picture>

              <source
                srcSet={`${import.meta.env.BASE_URL}hero/hero.webp`}
                type="image/webp"
              />

              <source
                srcSet={`${import.meta.env.BASE_URL}hero/hero.png`}
                type="image/png"
              />

              <img
                src={`${import.meta.env.BASE_URL}hero/hero.png`}
                alt="Authentic Azerbaijani Food at Salam Baku Restaurant"
                width={1000}
                height={1000}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />

            </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-8 bg-brand-dark/90 backdrop-blur-md p-4 rounded-xl border border-brand-neon/30 flex items-center gap-4 shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center">
                  <span className="text-xl font-bold">4.9</span>
                </div>
                <div>
                  <div className="flex text-yellow-400 text-sm">
                    ★★★★★
                  </div>
                  <p className="text-white text-xs font-medium mt-1">Top Rated in Baku</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
