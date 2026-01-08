import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SPECIALS = [
  {
    id: 1,
    name: "Shree Krishna Special Paneer",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80",
    description: "Our signature melt-in-your-mouth paneer delicacy prepared with secret spices."
  },
  {
    id: 2,
    name: "Authentic Pav Bhaji",
    image: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&q=80",
    description: "Butter-loaded Mumbai style pav bhaji served with toasted buns."
  },
  {
    id: 3,
    name: "Royal Veg Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80",
    description: "Fragrant basmati rice cooked with garden-fresh vegetables and exotic herbs."
  },
  {
    id: 4,
    name: "Dal Tadka Special",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80",
    description: "Tempered yellow lentils finished with aromatic ghee, garlic, and cumin."
  },
  {
    id: 5,
    name: "Crispy Masala Dosa",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80",
    description: "Golden crispy crepe filled with spiced potato mash, served with coconut chutney."
  }
];

export default function KrishnaSpecials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SPECIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SPECIALS.length) % SPECIALS.length);
  };

  const getVisibleItems = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + SPECIALS.length) % SPECIALS.length;
      items.push({ ...SPECIALS[index], position: i });
    }
    return items;
  };

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-[#f15a24]">Shri Krishna</span>{" "}
            <span className="text-[#1b4332]">Special Cuisine</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto italic"
          >
            Indulge in pure vegetarian culinary artistry, where tradition meets premium perfection.
          </motion.p>
        </div>

        <div className="relative h-[450px] flex items-center justify-center">
          {/* Controls */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-10 z-30 p-3 rounded-full bg-white/80 shadow-lg text-[#1b4332] hover:bg-[#1b4332] hover:text-white transition-all duration-300 border border-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-4 md:right-10 z-30 p-3 rounded-full bg-white/80 shadow-lg text-[#1b4332] hover:bg-[#1b4332] hover:text-white transition-all duration-300 border border-gray-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Showcase Items */}
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {getVisibleItems().map((item) => (
                <motion.div
                  key={`${item.id}-${item.position}`}
                  initial={{ 
                    opacity: 0,
                    scale: 0.6,
                    x: item.position * 300,
                    filter: "blur(4px)"
                  }}
                  animate={{ 
                    opacity: item.position === 0 ? 1 : 0.4,
                    scale: item.position === 0 ? 1 : 0.7,
                    x: item.position * (window.innerWidth < 768 ? 160 : 320),
                    filter: item.position === 0 ? "blur(0px)" : "blur(2px)",
                    zIndex: item.position === 0 ? 20 : 10
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.6,
                    x: item.position * 300,
                    filter: "blur(4px)"
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 25
                  }}
                  className="absolute flex flex-col items-center"
                >
                  <div className={`
                    relative w-48 h-48 md:w-80 md:h-80 rounded-full p-2
                    ${item.position === 0 ? 'bg-gradient-to-tr from-[#4caf50] to-[#f15a24] shadow-[0_0_50px_rgba(76,175,80,0.3)]' : 'bg-transparent'}
                  `}>
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner bg-white">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {item.position === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-10 text-center max-w-sm px-4"
                    >
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1b4332] mb-3">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {SPECIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 transition-all duration-300 rounded-full ${activeIndex === idx ? 'w-8 bg-[#4caf50]' : 'w-2 bg-gray-200'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
