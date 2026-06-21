import { motion } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What are your operating hours?",
    answer:
      "We are open Monday through Sunday from 11:00 AM to 11:00 PM. On weekends, we often stay open until midnight.",
  },
  {
    question: "Do you offer vegan or vegetarian options?",
    answer:
      "Yes! We have a dedicated separate menu section for vegetarian and vegan dishes, including our famous falafel, fresh salads, and grilled vegetables.",
  },
  {
    question: "Is there parking available nearby?",
    answer:
      "Yes, there is complimentary valet parking available right at our entrance, as well as ample street parking nearby.",
  },
  {
    question: "Do you accommodate large groups and private events?",
    answer:
      "Absolutely. We have a private dining room that can accommodate up to 40 guests. Please contact us via WhatsApp for event reservations and customized menus.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 bg-brand-dark/95 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Frequently Asked{" "}
            <span className="text-brand-accent">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors focus:outline-none"
              >
                <span className="font-bold text-white text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-brand-neon transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-48 py-4 opacity-100 border-t border-white/10" : "max-h-0 py-0 opacity-0"}`}
              >
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
