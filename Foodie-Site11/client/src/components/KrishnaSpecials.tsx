import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPECIALS = [
  {
    id: 1,
    name: "Shree Krishna Special Paneer",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80",
    description: "Our signature melt-in-your-mouth paneer delicacy."
  },
  {
    id: 2,
    name: "Authentic Pav Bhaji",
    image: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&q=80",
    description: "Butter-loaded Mumbai style pav bhaji."
  },
  {
    id: 3,
    name: "Royal Veg Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80",
    description: "Fragrant basmati rice with exotic spices."
  },
  {
    id: 4,
    name: "Dal Tadka Special",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80",
    description: "Tempered lentils with aromatic ghee and garlic."
  }
];

export default function KrishnaSpecials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SPECIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl font-bold mb-4"
          >
            <span className="text-[#f15a24]">Shri Krishna</span>{" "}
            <span className="text-[#1b4332]">Special Cuisine</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Indulge in pure vegetarian culinary artistry, where tradition meets premium perfection.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {SPECIALS.map((item, index) => {
            const isActive = index === currentIndex;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0.3, scale: 0.8 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.4,
                  scale: isActive ? 1.1 : 0.9,
                  filter: isActive ? "grayscale(0%)" : "grayscale(50%)"
                }}
                transition={{ duration: 0.8 }}
                className="relative w-48 h-48 md:w-64 md:h-64 flex flex-col items-center"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-[#4caf50]/20">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center"
                  >
                    <h3 className="font-bold text-xl text-[#1b4332]">{item.name}</h3>
                    <p className="text-sm text-gray-500 max-w-[200px]">{item.description}</p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
