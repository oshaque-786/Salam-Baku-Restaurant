import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
} from "lucide-react";

export default function ContactLocation() {
  return (
    <section
      id="location"
      className="py-24 bg-brand-dark border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4">

        <motion.div
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          className="text-center mb-14"
        >
          <h2 className="text-5xl font-bold text-white">
            Visit <span className="text-brand-neon">Us</span>
          </h2>

          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            Experience authentic Azerbaijani cuisine in the heart of Baku.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Google Map */}

          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">

            <iframe
              title="Salam Baku Restaurant Location"
              src="https://www.google.com/maps?q=40.4093,49.8671&z=15&output=embed"
              loading="lazy"
              className="w-full h-[500px]"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

          {/* Right Side */}

          <div className="space-y-8">

            <div className="flex gap-4">

              <MapPin className="text-brand-neon w-7 h-7"/>

              <div>

                <h3 className="text-white font-bold text-xl">
                  Address
                </h3>

                <p className="text-white/70">
                  Unvan
                  <br/>
                  Baku AZ1000
                  <br/>
                  Azerbaijan
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <Phone className="text-brand-neon w-7 h-7"/>

              <div>

                <h3 className="text-white font-bold text-xl">
                  Phone
                </h3>

                <a
                  href="tel:+994502021166"
                  className="text-brand-neon hover:underline"
                >
                  +994 50 202 1166
                </a>

              </div>

            </div>

            <div className="flex gap-4">

              <Mail className="text-brand-neon w-7 h-7"/>

              <div>

                <h3 className="text-white font-bold text-xl">
                  Email
                </h3>

                <a
                  href="mailto:info@salambaku.az"
                  className="text-brand-neon hover:underline"
                >
                  info@salambaku.az
                </a>

              </div>

            </div>

            <div className="flex gap-4">

              <Clock className="text-brand-neon w-7 h-7"/>

              <div>

                <h3 className="text-white font-bold text-xl">
                  Opening Hours
                </h3>

                <p className="text-white/70">
                  Monday – Sunday
                  <br/>
                  10:00 AM – 11:00 PM
                </p>

              </div>

            </div>

            <a
              href="https://maps.app.goo.gl/hgEPWzykDcoCggMf6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-neon text-brand-dark font-bold hover:scale-105 transition-transform"
            >
              <Navigation size={20}/>
              Get Directions
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}