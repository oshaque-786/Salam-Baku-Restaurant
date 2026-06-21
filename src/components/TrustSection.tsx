import { motion } from 'motion/react';
import { BadgeCheck, Leaf, Flame, Users } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="py-24 bg-brand-dark border-t border-white/5 relative overflow-hidden">
      {/* Decorative background flare */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-brand-accent/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 leading-tight">
              A Symphony of Flavor, <br/>
              <span className="text-brand-neon">Rooted in Tradition.</span>
            </h2>
            <p className="text-white/70 mb-6 leading-relaxed">
              At Salam Baku, we believe that exceptional food starts with uncompromising quality. We weave the rich essence of historic spice routes—echoing the complexity of Sindhi Ajrak motifs in our culinary philosophy—with locally sourced Azerbaijani ingredients.
            </p>
            <p className="text-white/70 mb-8 leading-relaxed">
              Whether you're craving the smoky perfection of live BBQ or the aromatic depth of a slow-cooked Biryani, every plate is prepared to deliver an unforgettable dining experience.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-brand-neon/20 text-brand-neon"><Flame className="w-5 h-5"/></div>
                <span className="font-medium text-white/90">Authentic recipes passed down through generations</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-brand-neon/20 text-brand-neon"><Users className="w-5 h-5"/></div>
                <span className="font-medium text-white/90">Comfortable seating arrangements for up to 60 guests</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-green-500/20 text-green-400"><Leaf className="w-5 h-5"/></div>
                <span className="font-medium text-white/90">100% Fresh, locally sourced produce and halal meats</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-brand-accent/20 text-brand-accent"><BadgeCheck className="w-5 h-5"/></div>
                <span className="font-medium text-white/90">Top-rated hygiene and food safety standards</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img 
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=500&q=80" 
              alt="Restaurant Ambiance" 
              className="rounded-2xl object-cover h-64 w-full shadow-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=500&q=80" 
              alt="Chef cooking" 
              className="rounded-2xl object-cover h-64 w-full shadow-lg mt-8"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
