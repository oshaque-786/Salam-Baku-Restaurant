import { MapPin, Phone, Mail, Clock, UtensilsCrossed, Facebook, Instagram, Twitter, Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#050f1d] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <UtensilsCrossed className="w-8 h-8 text-brand-neon" />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-2xl tracking-tight leading-none text-white">
                  Salam Baku
                </span>
              </div>
            </div>
            <p className="text-white/60 mb-6 text-sm leading-relaxed">
              Serving the finest culinary fusions in the heart of Baku. Delivering joy, one plate at a time.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-neon hover:text-brand-dark transition-all"><Facebook className="w-4 h-4" /></a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-neon hover:text-brand-dark transition-all"><Instagram className="w-4 h-4" /></a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-neon hover:text-brand-dark transition-all"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-neon shrink-0" />
                <a href="tel:+994502021166" className="hover:text-brand-neon transition-colors">+994 50 2021166</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-neon shrink-0" />
                <a href="mailto:info@salambaku.az" className="hover:text-brand-neon transition-colors">info@salambaku.az</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-neon shrink-0 relative top-1" />
                <a href="https://maps.app.goo.gl/hgEPWzykDcoCggMf6" target="_blank" rel="noopener noreferrer" className="hover:text-brand-neon transition-colors leading-relaxed">
                  Unvan, 126 Kichik Qala,<br/>Baku, Azerbaijan
                </a>
              </li>
              <li className="flex items-start gap-3 pt-2">
                <Users className="w-5 h-5 text-brand-neon shrink-0" />
                <span>Spacious dining for up to <strong>60 persons</strong></span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Business Hours</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-neon shrink-0" />
                <div>
                  <p className="text-white font-medium">Monday - Sunday</p>
                  <p>08:00 - 23:30</p>
                </div>
              </li>
              <li className="mt-4 p-3 bg-brand-neon/10 border border-brand-neon/20 rounded-lg">
                <p className="text-brand-neon text-xs font-semibold uppercase tracking-wider text-center">Open Daily</p>
              </li>
            </ul>
          </div>

          {/* Quick Links & Map */}
          <div className="flex flex-col">
             <h4 className="font-heading font-bold text-lg mb-6">Location</h4>
             <div className="w-full h-40 rounded-xl overflow-hidden border border-white/10 relative">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.4284901456314!2d49.8340156!3d40.3661111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dab84c8a149%3A0xc4ebdef7e7161b96!2sSalam%20Baku%20Restaurant!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
             </div>
             <a href="https://maps.app.goo.gl/hgEPWzykDcoCggMf6" target="_blank" rel="noopener noreferrer" className="mt-3 text-xs text-brand-neon hover:text-white transition-colors flex items-center justify-center gap-1 bg-white/5 py-2 rounded-lg">
                <MapPin className="w-3 h-3" /> Get Directions
             </a>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Salam Baku Restaurant. All rights reserved. <a href="#admin" className="ml-2 hover:text-brand-neon transition-colors opacity-50">Staff Login</a>
          </p>
          <div className="flex gap-4 text-xs text-white/40">
            Powered by modern culinary passion.
          </div>
        </div>
      </div>
    </footer>
  );
}
