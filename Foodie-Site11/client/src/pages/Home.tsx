import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Clock, MapPin, Phone } from "lucide-react";
import { useCategories } from "../hooks/use-restaurant";
import { useState, useEffect } from "react";
import KrishnaSpecials from "../components/KrishnaSpecials";
import Reviews from "./Reviews";
import video1 from "../assets/generated_videos/chef_preparing_fresh_vegetarian_meal.mp4";
import video2 from "../assets/generated_videos/premium_vegetarian_restaurant_interior_ambiance.mp4";
import video3 from "../assets/generated_videos/fresh_food_serving.mp4";

const HERO_VIDEOS = [video1, video2, video3];

export default function Home() {
  const { data: categories } = useCategories();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Featured categories for the home page
  const featuredCategories = categories?.slice(0, 6) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0 bg-black">
          <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-primary/10 z-10 pointer-events-none mix-blend-overlay" />
          
          {HERO_VIDEOS.map((video, index) => (
            <motion.div
              key={video}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentVideoIndex === index ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              >
                <source src={video} type="video/mp4" />
              </video>
            </motion.div>
          ))}
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center text-white space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-primary tracking-[0.2em] uppercase text-sm md:text-base font-bold mb-4">
              Est. 2010 • Pure Vegetarian
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
              Authentic Flavors <br /> 
              <span className="text-divine">
                Divine Taste
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 font-light leading-relaxed">
              Experience the finest South Indian, North Indian, and Chinese cuisine in Ambernath. 
              Pure vegetarian delicacies crafted with passion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8"
          >
            <Link href="/menu">
              <div className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 cursor-pointer flex items-center space-x-2">
                <span>View Full Menu</span>
                <ArrowRight size={18} />
              </div>
            </Link>
            <Link href="/reservation">
              <div className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold transition-all duration-300 cursor-pointer">
                Book a Table
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Info Bar */}
      <div className="bg-white py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Clock size={20} />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-serif font-bold text-base">Opening Hours</h3>
                <p className="text-xs text-muted-foreground">Mon-Sun: 8:45 AM - 10:45 PM</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin size={20} />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-serif font-bold text-base">Location</h3>
                <p className="text-xs text-muted-foreground">Ambernath (West), Thane</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Star size={20} className="fill-current" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-serif font-bold text-base">4.0/5 Rating</h3>
                <p className="text-xs text-muted-foreground">Loved by 1000+ Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <KrishnaSpecials />

      {/* Featured Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Discover</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-4">Our Menu Highlights</h2>
            <p className="text-muted-foreground text-base">
              From crispy Dosas to rich Paneer gravies, explore our wide range of pure vegetarian delights suited for every palate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.length > 0 ? (
              featuredCategories.map((cat, idx) => (
                <Link key={cat.id} href={`/menu`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer relative h-[400px] rounded-2xl overflow-hidden shadow-lg"
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                    <img 
                      src={cat.bannerImage} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-white">
                      <h3 className="font-serif text-3xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300">{cat.name}</h3>
                      <p className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm text-gray-200">
                        {cat.description || "Explore delicious items in this category"}
                      </p>
                      <div className="w-12 h-1 bg-primary mt-4 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              // Loading skeletons
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[400px] rounded-2xl bg-muted animate-pulse" />
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/menu">
              <div className="inline-flex items-center space-x-2 text-primary font-bold uppercase tracking-widest hover:text-primary/80 transition-colors cursor-pointer border-b-2 border-primary pb-1">
                <span>View All Categories</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* CTA Section */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 skew-x-12 transform translate-x-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">Ordering for a Party?</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                We accept bulk orders for small parties, birthdays, and family gatherings. 
                Get the best pure vegetarian food delivered hot and fresh to your venue.
              </p>
              <ul className="space-y-3 pt-4">
                <li className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Customizable Menu Options</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Timely Delivery</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Special Bulk Pricing</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <a 
                href="tel:+917028684786" 
                className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden font-bold text-white transition-all duration-300 bg-primary rounded-full hover:bg-white hover:text-primary shadow-xl shadow-primary/20"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                <span className="relative flex items-center space-x-3 text-lg">
                  <Phone size={24} />
                  <span>Call +91 7028684786</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          const restaurantDetails = "Hello\\n\\nThank you for contacting Shri Krishna Pure Vegetarian.\\n\\nRestaurant Name: Shri Krishna Pure Vegetarian\\nAddress: Ambernath, Maharashtra, India\\nContact Number: +91 9372842906\\nEmail ID: shrikrishnapureveg@gmail.com\\n\\nPlease find our complete food menu attached for your reference.\\n\\nWe look forward to serving you.";
          const msg = encodeURIComponent(restaurantDetails);
          window.open("https://wa.me/919372842906?text=" + msg, "_blank");
        }}
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-500/40 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <svg viewBox="0 0 24 24" className="w-8 h-8 relative z-10 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.button>
    </div>
  );
}
