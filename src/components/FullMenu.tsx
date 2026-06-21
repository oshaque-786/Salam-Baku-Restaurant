import { motion } from "motion/react";
import { useState } from "react";

const menuCategories = ["Appetizers", "Main Course", "Desserts", "Drinks"];

const menuItems = {
  Appetizers: [
    {
      name: "Hummus & Pita",
      desc: "Creamy homemade hummus served with warm pita bread.",
      price: "$8",
    },
    {
      name: "Stuffed Grape Leaves",
      desc: "Vine leaves stuffed with rice, herbs, and lemon.",
      price: "$9",
    },
    {
      name: "Baba Ganoush",
      desc: "Roasted eggplant dip with tahini and garlic.",
      price: "$8",
    },
    {
      name: "Falafel Plate",
      desc: "Crispy falafels served with tahini sauce.",
      price: "$10",
    },
  ],
  "Main Course": [
    {
      name: "Lamb Kebab",
      desc: "Grilled marinated lamb skewers served with rice and salad.",
      price: "$22",
    },
    {
      name: "Chicken Shawarma",
      desc: "Thinly sliced marinated chicken with garlic sauce.",
      price: "$18",
    },
    {
      name: "Plov (Pilaf)",
      desc: "Traditional rice dish with tender meat and carrots.",
      price: "$20",
    },
    {
      name: "Grilled Salmon",
      desc: "Fresh salmon fillet grilled with herbs and lemon.",
      price: "$24",
    },
  ],
  Desserts: [
    {
      name: "Baklava",
      desc: "Rich, sweet pastry made of layers of filo filled with chopped nuts.",
      price: "$7",
    },
    {
      name: "Kunefe",
      desc: "Cheese pastry soaked in sweet, sugar-based syrup.",
      price: "$9",
    },
    {
      name: "Rice Pudding",
      desc: "Creamy and sweet traditional rice pudding.",
      price: "$6",
    },
  ],
  Drinks: [
    { name: "Turkish Tea", desc: "Traditional strong black tea.", price: "$3" },
    {
      name: "Mint Lemonade",
      desc: "Freshly squeezed lemonade with mint leaves.",
      price: "$5",
    },
    { name: "Ayran", desc: "Refreshing yogurt drink.", price: "$4" },
  ],
};

export default function FullMenu() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]);

  return (
    <section
      id="full-menu"
      className="py-24 bg-brand-dark/95 relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Our <span className="text-brand-accent">Full Menu</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Discover a wide variety of authentic dishes tailored to satisfy your
            cravings.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {menuCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === category ? "bg-brand-accent text-white shadow-lg shadow-brand-accent/20" : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {menuItems[activeCategory as keyof typeof menuItems].map(
            (item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-start border-b border-white/10 pb-6"
              >
                <div className="pr-4">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
                <div className="text-xl font-bold text-brand-neon whitespace-nowrap">
                  {item.price}
                </div>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
