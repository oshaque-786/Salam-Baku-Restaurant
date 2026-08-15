import { LazyMotion, domAnimation, m } from "motion/react";
import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        id="reviews"
        className="py-24 bg-black relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-ajrak-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section heading */}
          <m.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 30,
                  }
            }
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Guest{" "}
              <span className="text-brand-accent">
                Reviews
              </span>
            </h2>

            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              See what our wonderful guests have to say about
              their dining experience with us.
            </p>
          </m.div>

          {/* Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <m.div
                key={review.name}
                initial={{
                  opacity: 0,
                  y: 40,
                  scale: 0.96,
                }}
                animate={
                  isVisible
                    ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }
                    : {
                        opacity: 0,
                        y: 40,
                        scale: 0.96,
                      }
                }
                transition={{
                  duration: 0.65,
                  delay: 0.2 + index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                  transition: {
                    duration: 0.25,
                  },
                }}
                className="bg-brand-dark/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 relative shadow-xl shadow-brand-accent/5"
              >
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-brand-accent/20 absolute top-6 right-6" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, starIndex) => (
                    <m.div
                      key={starIndex}
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                      }}
                      animate={
                        isVisible
                          ? {
                              opacity: 1,
                              scale: 1,
                            }
                          : {
                              opacity: 0,
                              scale: 0.5,
                            }
                      }
                      transition={{
                        duration: 0.3,
                        delay:
                          0.45 +
                          index * 0.15 +
                          starIndex * 0.05,
                      }}
                    >
                      <Star
                        className="w-5 h-5 fill-brand-neon text-brand-neon"
                      />
                    </m.div>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-white/80 italic mb-6 leading-relaxed">
                  "{review.text}"
                </p>

                {/* Guest information */}
                <div>
                  <h4 className="font-bold text-white">
                    {review.name}
                  </h4>

                  <p className="text-sm text-brand-accent">
                    {review.role}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}