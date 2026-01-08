import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1517244683847-745431f57235?q=80&w=1200", category: "Food" },
  { id: 2, src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200", category: "Food" },
  { id: 3, src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200", category: "Ambience" },
  { id: 4, src: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200", category: "Food" },
  { id: 5, src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200", category: "Ambience" },
  { id: 6, src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200", category: "Kitchen" },
  { id: 7, src: "https://images.unsplash.com/photo-1606471191009-63994c53433b?q=80&w=1200", category: "Food" },
  { id: 8, src: "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1200", category: "Food" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-20 pb-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 pt-10">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">Visual Journey</span>
          <h1 className="font-serif text-5xl font-bold mt-3 mb-6">Our Gallery</h1>
          <p className="text-muted-foreground text-lg">
            A glimpse into our vibrant dishes and cozy ambience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer bg-muted"
              onClick={() => setSelectedImage(img.src)}
            >
              <img 
                src={img.src} 
                alt={`Gallery image ${img.id}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                  <ZoomIn size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage}
              alt="Full screen"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
