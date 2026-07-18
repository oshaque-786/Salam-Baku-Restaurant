import { motion } from "motion/react";
import {
  Accessibility,
  Utensils,
  Star,
  TrendingUp,
  Coffee,
  Clock,
  Wifi,
  Heart,
  Users,
  CalendarCheck,
  CreditCard,
  Baby,
  Car,
  Dog,
} from "lucide-react";

const aboutData = [
  {
    category: "Accessibility",
    icon: <Accessibility className="w-5 h-5 text-brand-neon" />,
    items: [
      "Wheelchair accessible entrance",
      "Wheelchair accessible parking lot",
    ],
  },
  {
    category: "Service options",
    icon: <Utensils className="w-5 h-5 text-brand-neon" />,
    items: ["Outdoor seating", "Takeout", "Dine-in"],
  },
  {
    category: "Highlights",
    icon: <Star className="w-5 h-5 text-brand-neon" />,
    items: [
      "Great beer selection",
      "Great cocktails",
      "Great coffee",
      "Great dessert",
      "Great tea selection",
      "Great wine list",
      "Live music",
      "Rooftop seating",
    ],
  },
  {
    category: "Popular for",
    icon: <TrendingUp className="w-5 h-5 text-brand-neon" />,
    items: ["Lunch", "Dinner", "Solo dining"],
  },
  {
    category: "Offerings",
    icon: <Coffee className="w-5 h-5 text-brand-neon" />,
    items: [
      "Alcohol",
      "Beer",
      "Cocktails",
      "Coffee",
      "Halal food",
      "Happy hour food",
      "Hard liquor",
      "Late-night food",
      "Organic dishes",
      "Quick bite",
      "Small plates",
      "Vegan options",
      "Vegetarian options",
      "Wine",
    ],
  },
  {
    category: "Dining options",
    icon: <Clock className="w-5 h-5 text-brand-neon" />,
    items: [
      "Breakfast",
      "Brunch",
      "Lunch",
      "Dinner",
      "Counter service",
      "Dessert",
      "Seating",
      "Table service",
    ],
  },
  {
    category: "Amenities",
    icon: <Wifi className="w-5 h-5 text-brand-neon" />,
    items: ["Bar onsite", "Restroom", "Wi-Fi", "Free Wi-Fi"],
  },
  {
    category: "Atmosphere",
    icon: <Heart className="w-5 h-5 text-brand-neon" />,
    items: ["Casual", "Cozy", "Trendy"],
  },
  {
    category: "Crowd",
    icon: <Users className="w-5 h-5 text-brand-neon" />,
    items: ["Family-friendly", "Groups", "Tourists"],
  },
  {
    category: "Planning",
    icon: <CalendarCheck className="w-5 h-5 text-brand-neon" />,
    items: ["Accepts reservations"],
  },
  {
    category: "Payments",
    icon: <CreditCard className="w-5 h-5 text-brand-neon" />,
    items: ["Checks", "Credit cards", "Debit cards", "NFC mobile payments"],
  },
  {
    category: "Children",
    icon: <Baby className="w-5 h-5 text-brand-neon" />,
    items: ["Good for kids", "Good for kids birthday", "High chairs"],
  },
  {
    category: "Parking",
    icon: <Car className="w-5 h-5 text-brand-neon" />,
    items: [
      "Free parking lot",
      "Free street parking",
      "Paid street parking",
      "Usually plenty of parking",
    ],
  },
  {
    category: "Pets",
    icon: <Dog className="w-5 h-5 text-brand-neon" />,
    items: ["Dogs allowed outside"],
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-brand-dark relative z-10 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl mb-4 text-white">
            About <span className="text-brand-neon">Us</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Everything you need to know about dining at Salam Baku. From our
            amenities to our atmosphere, we ensure every detail of your visit is
            perfect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {aboutData.map((section, idx) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-brand-neon/50 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-brand-neon/10 rounded-lg group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  {section.category}
                </h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="text-sm text-white/70 flex items-start gap-2"
                  >
                    <span className="text-brand-neon mt-1 opacity-50">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
