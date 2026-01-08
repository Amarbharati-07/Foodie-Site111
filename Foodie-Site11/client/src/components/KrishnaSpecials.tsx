import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SPECIALS = [
  {
    id: 1,
    name: "Shri Krishna Special Paneer",
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
  },
  {
    id: 6,
    name: "Mysore Masala Dosa",
    image: "https://images.unsplash.com/photo-1630406184470-7fd4440e82ae?auto=format&fit=crop&q=80",
    description: "Spicy and delicious Mysore style dosa with signature red chutney."
  },
  {
    id: 7,
    name: "Veg Manchurian",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80",
    description: "Indo-Chinese classic vegetable balls in a tangy and spicy sauce."
  },
  {
    id: 8,
    name: "Hakka Noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80",
    description: "Stir-fried noodles with crisp vegetables and oriental seasonings."
  },
  {
    id: 9,
    name: "Paneer Chilli",
    image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&q=80",
    description: "Fried paneer cubes tossed in a spicy and tangy chilli sauce."
  },
  {
    id: 10,
    name: "Veg Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80",
    description: "Classic vegetable patty with fresh greens and creamy sauce."
  },
  {
    id: 11,
    name: "Cheese Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80",
    description: "Loaded with melting cheese and our signature vegetable patty."
  },
  {
    id: 12,
    name: "Tandoori Paneer",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80",
    description: "Char-grilled paneer cubes marinated in traditional Indian spices."
  },
  {
    id: 13,
    name: "Butter Naan",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80",
    description: "Soft and fluffy Indian bread topped with a generous layer of butter."
  },
  {
    id: 14,
    name: "Schezwan Rice",
    image: "https://images.unsplash.com/photo-1538329972958-465d6d2166e3?auto=format&fit=crop&q=80",
    description: "Spicy fried rice tossed in homemade Schezwan sauce."
  },
  {
    id: 15,
    name: "Veg Soup",
    image: "https://images.unsplash.com/photo-1547592166-23acbe3a624b?auto=format&fit=crop&q=80",
    description: "Hot and healthy vegetable soup prepared daily."
  },
  {
    id: 16,
    name: "Paneer Butter Masala",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80",
    description: "Rich and creamy tomato-based gravy with soft paneer cubes."
  },
  {
    id: 17,
    name: "Medu Vada",
    image: "https://images.unsplash.com/photo-1626132646529-5aa212ddbae4?auto=format&fit=crop&q=80",
    description: "Crispy fried lentil donuts served with sambhar and chutney."
  },
  {
    id: 18,
    name: "Idli Sambhar",
    image: "https://images.unsplash.com/photo-1589301760576-416b71151a73?auto=format&fit=crop&q=80",
    description: "Steamed rice cakes served with flavorful lentil soup."
  },
  {
    id: 19,
    name: "Veg Kolhapuri",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356f36?auto=format&fit=crop&q=80",
    description: "Spicy vegetable medley from the heart of Maharashtra."
  },
  {
    id: 20,
    name: "Hyderabadi Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80",
    description: "Spicy and aromatic dum biryani with assorted vegetables."
  }
];

export default function KrishnaSpecials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, isPaused]);

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
    <section 
      className="py-16 md:py-20 bg-white overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            <span className="text-[#1b4332]">Shri Krishna</span>{" "}
            <span className="text-[#1b4332]">Special Cuisine</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto italic font-light"
          >
            Indulge in pure vegetarian culinary artistry, where tradition meets premium perfection.
          </motion.p>
        </div>

        <div className="relative h-[480px] md:h-[580px] flex items-center justify-center">
          {/* Controls */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 md:left-8 z-30 p-2 md:p-3 rounded-full bg-white/90 shadow-lg text-[#1b4332] hover:bg-[#1b4332] hover:text-white transition-all duration-300 border border-gray-100/50 backdrop-blur-sm"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-2 md:right-8 z-30 p-2 md:p-3 rounded-full bg-white/90 shadow-lg text-[#1b4332] hover:bg-[#1b4332] hover:text-white transition-all duration-300 border border-gray-100/50 backdrop-blur-sm"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </button>

          {/* Showcase Items */}
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
              {getVisibleItems().map((item) => (
                <motion.div
                  key={`${item.id}-${item.position}`}
                  initial={{ 
                    opacity: 0,
                    scale: 0.6,
                    x: item.position * 350,
                    filter: "blur(10px)"
                  }}
                  animate={{ 
                    opacity: item.position === 0 ? 1 : 0.3,
                    scale: item.position === 0 ? 1.15 : 0.75,
                    x: item.position * (window.innerWidth < 768 ? 140 : 380),
                    filter: item.position === 0 ? "blur(0px)" : "blur(4px)",
                    zIndex: item.position === 0 ? 20 : 10
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.6,
                    x: item.position * 350,
                    filter: "blur(10px)"
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 220,
                    damping: 28
                  }}
                  className="absolute flex flex-col items-center"
                >
                  <div className={`
                    relative w-52 h-52 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full p-2.5 transition-shadow duration-700
                    ${item.position === 0 
                      ? 'bg-gradient-to-tr from-[#1b4332] to-[#4caf50] shadow-[0_20px_60px_-15px_rgba(27,67,50,0.4)] ring-4 ring-white/50' 
                      : 'bg-transparent ring-0'}
                  `}>
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-inner bg-white">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {item.position === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                      className="mt-12 text-center max-w-md px-4 flex flex-col items-center"
                    >
                      <div className="flex items-center justify-center gap-3 mb-4">
                        {/* Veg Icon beside name */}
                        <div className="bg-white p-1 rounded-sm shadow-sm border border-green-100 flex-shrink-0">
                          <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center p-[2.5px]">
                            <div className="w-full h-full bg-green-600 rounded-full" />
                          </div>
                        </div>
                        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1b4332] uppercase tracking-wide leading-tight">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-[#2d3436] text-base md:text-lg font-medium leading-relaxed max-w-sm mx-auto">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* No Progress Indicators - Removed for clean aesthetic */}
      </div>
    </section>
  );
}
