import { motion } from "motion/react";
import { Smartphone, CalendarCheck, Truck, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Online Ordering",
    desc: "Seamless & quick from your phone",
  },
  {
    icon: CalendarCheck,
    title: "Table Reservation",
    desc: "Book your perfect spot in advance",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Hot food delivered to your doorstep",
  },
  {
    icon: ShieldCheck,
    title: "Best Quality",
    desc: "Premium ingredients, authentic taste",
  },
];

export default function Features() {
  return (
    <section className="py-12 border-y border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-brand-neon/10 flex items-center justify-center mb-4 group-hover:bg-brand-neon group-hover:text-brand-dark text-brand-neon transition-colors duration-300">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-white/50">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
