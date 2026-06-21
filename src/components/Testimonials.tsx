import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah Rahman",
    role: "Food Blogger",
    text: "Absolutely the best authentic cuisine I have had in the city. The lamb kebab is out of this world, perfectly cooked and seasoned.",
    rating: 5,
  },
  {
    name: "Michael Davis",
    role: "Local Resident",
    text: "A hidden gem! The atmosphere is cozy and the staff makes you feel like family. Their baklava is a must-try dessert.",
    rating: 5,
  },
  {
    name: "Elena Petrova",
    role: "Frequent Visitor",
    text: "I come here every week for the Plov. It reminds me of home. Excellent service and beautifully presented dishes every single time.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-ajrak-pattern opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Guest <span className="text-brand-accent">Reviews</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            See what our wonderful guests have to say about their dining
            experience with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-brand-dark/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 relative shadow-xl shadow-brand-accent/5"
            >
              <Quote className="w-10 h-10 text-brand-accent/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-brand-neon text-brand-neon"
                  />
                ))}
              </div>
              <p className="text-white/80 italic mb-6 leading-relaxed">
                "{review.text}"
              </p>
              <div>
                <h4 className="font-bold text-white">{review.name}</h4>
                <p className="text-sm text-brand-accent">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
