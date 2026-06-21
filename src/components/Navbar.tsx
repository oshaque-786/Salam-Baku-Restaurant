import { motion } from 'motion/react';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-dark/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-8 h-8 text-brand-neon" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-2xl tracking-tight leading-none text-white">
                Salam Baku
              </span>
              <span className="text-[0.65rem] uppercase tracking-widest text-brand-neon/80 font-medium font-sans">
                Restaurant
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-sm font-medium text-white/80 hover:text-brand-neon transition-colors">Home</a>
            <a href="#menu" className="text-sm font-medium text-white/80 hover:text-brand-neon transition-colors">Menu</a>
            <a href="#reservation" className="text-sm font-medium text-white/80 hover:text-brand-neon transition-colors">Reservation</a>
            <a href="#about" className="text-sm font-medium text-white/80 hover:text-brand-neon transition-colors">About</a>
            <a href="#contact" className="text-sm font-medium text-white/80 hover:text-brand-neon transition-colors">Contact</a>
            
            <a href="#menu" className="px-6 py-2.5 bg-brand-neon text-brand-dark font-semibold text-sm rounded-full hover:bg-white transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)]">
              Order Online
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-neon transition-colors p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 w-full bg-brand-dark/95 border-b border-white/10 backdrop-blur-xl"
        >
          <div className="px-4 py-6 flex flex-col space-y-4 items-center">
            <a href="#home" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white/90">Home</a>
            <a href="#menu" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white/90">Menu</a>
            <a href="#reservation" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white/90">Reservation</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white/90">About</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white/90">Contact</a>
            <a href="#menu" onClick={() => setIsOpen(false)} className="mt-4 flex w-full justify-center px-6 py-3 bg-brand-neon text-brand-dark font-bold text-base rounded-full">
              Order Online Now
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
