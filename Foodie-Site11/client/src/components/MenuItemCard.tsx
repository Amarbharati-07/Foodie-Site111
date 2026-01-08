import { motion, AnimatePresence } from "framer-motion";
import { type MenuItem } from "@shared/schema";
import { useState } from "react";
import { X, Utensils, Star, Clock, Leaf } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  // Mock ingredients
  const ingredients = ["Fresh Vegetables", "House-made Spices", "Pure Butter", "Himalayan Salt", "Organic Herbs"];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-stone-200/40 hover:shadow-primary/20 transition-all duration-700 flex flex-col h-full border border-stone-100"
      >
        <div className="aspect-[4/5] overflow-hidden bg-stone-50 relative shrink-0">
          {/* Veg Indicator */}
          <div className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-sm p-1.5 rounded-xl shadow-sm border border-stone-100/50">
            <div className="w-5 h-5 border-2 border-green-600 flex items-center justify-center p-[3px] rounded-sm">
              <div className="w-full h-full bg-green-600 rounded-full" />
            </div>
          </div>
          
          {item.isBestseller && (
            <div className="absolute top-6 left-6 z-10 bg-primary px-4 py-2 rounded-full shadow-lg shadow-primary/30">
              <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Signature</span>
            </div>
          )}

          {/* Image with subtle zoom on hover */}
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
            loading="lazy"
          />
          
          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

          {/* Content Over Image */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex justify-between items-end gap-4">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-2xl leading-tight group-hover:text-primary transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-white/70 text-sm font-light line-clamp-2 max-w-[200px]">
                  {item.description}
                </p>
              </div>
              <div className="bg-primary px-4 py-2 rounded-2xl shadow-lg shadow-primary/20 shrink-0">
                <span className="font-bold text-lg">₹{item.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Action */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center backdrop-blur-[2px]">
          <button 
            onClick={() => setShowDetail(true)}
            className="bg-white text-primary px-8 py-3 rounded-full font-bold shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-auto active:scale-95"
          >
            Explore Detail
          </button>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetail && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetail(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setShowDetail(false)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white md:text-stone-900 md:bg-stone-100 md:hover:bg-stone-200 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
              </div>

              {/* Info Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-6 h-6 border-2 border-green-600 flex items-center justify-center p-[3px] rounded-sm">
                    <div className="w-full h-full bg-green-600 rounded-full" />
                  </div>
                  <span className="text-green-600 font-bold text-sm tracking-wide uppercase">Pure Vegetarian</span>
                </div>

                <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight">
                  {item.name}
                </h2>
                
                <div className="flex items-center space-x-6 mb-8">
                  <div className="bg-primary/10 px-6 py-2 rounded-2xl">
                    <span className="font-bold text-2xl text-primary">₹{item.price}</span>
                  </div>
                  {item.isBestseller && (
                    <div className="flex items-center text-amber-500 space-x-1">
                      <Star size={18} className="fill-current" />
                      <span className="font-bold text-sm uppercase tracking-widest">Bestseller</span>
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-stone-400 text-xs uppercase tracking-[0.2em] mb-3">Description</h4>
                    <p className="text-stone-600 text-lg leading-relaxed font-light italic">
                      "{item.description || `A masterfully prepared ${item.name}, blending traditional culinary techniques with contemporary presentation and the freshest vegetarian ingredients.`}"
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-400 text-xs uppercase tracking-[0.2em] mb-4">Key Ingredients</h4>
                    <div className="flex flex-wrap gap-2">
                      {ingredients.map((ing, i) => (
                        <div key={i} className="flex items-center space-x-2 bg-stone-50 px-4 py-2 rounded-full border border-stone-100">
                          <Leaf size={14} className="text-green-600" />
                          <span className="text-stone-600 text-sm font-medium">{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-stone-50 rounded-xl text-stone-400">
                        <Clock size={20} />
                      </div>
                      <div>
                        <span className="block font-bold text-stone-900 text-sm">Preparation</span>
                        <span className="text-stone-500 text-xs tracking-tight">15-20 Mins</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-stone-50 rounded-xl text-stone-400">
                        <Utensils size={20} />
                      </div>
                      <div>
                        <span className="block font-bold text-stone-900 text-sm">Serving Size</span>
                        <span className="text-stone-500 text-xs tracking-tight">Serves 1-2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
