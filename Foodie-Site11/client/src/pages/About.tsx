import { motion } from "framer-motion";
import { UtensilsCrossed, Leaf, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">Tradition meets Taste</h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
              Serving authentic vegetarian cuisine with love and passion since 2010.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop" 
                    alt="Restaurant Interior" 
                    className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800&auto=format&fit=crop" 
                    alt="Chef Cooking" 
                    className="rounded-2xl shadow-lg w-full h-64 object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/50 rounded-full blur-3xl opacity-50" />
              </div>
            </div>

            <div className="lg:w-1/2 space-y-8">
              <h2 className="font-serif text-4xl font-bold text-foreground">
                About Shri Krishna Restaurant
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Nestled in the heart of Ambernath, Shri Krishna Restaurant has been a beloved culinary destination for over a decade. We believe that vegetarian food is not just about vegetables; it's about the celebration of nature's bounty prepared with aromatic spices and traditional techniques.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our menu is a carefully curated journey through the flavors of India, featuring crispy South Indian dosas, rich North Indian curries, and zesty Chinese delicacies. Every dish is prepared fresh, ensuring that you get nothing but the best quality and taste.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                    <Leaf />
                  </div>
                  <h3 className="font-serif font-bold text-lg">100% Pure Veg</h3>
                  <p className="text-sm text-muted-foreground">Dedicated separate kitchen for pure vegetarian cooking.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                    <UtensilsCrossed />
                  </div>
                  <h3 className="font-serif font-bold text-lg">Authentic Recipes</h3>
                  <p className="text-sm text-muted-foreground">Traditional recipes passed down through generations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-foreground text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Award className="w-10 h-10 text-primary" />, 
                title: "Quality First", 
                desc: "We never compromise on the quality of ingredients. Fresh produce, premium spices, and hygiene are our top priorities." 
              },
              { 
                icon: <Users className="w-10 h-10 text-primary" />, 
                title: "Customer Delight", 
                desc: "Your satisfaction is our reward. Our staff is trained to provide warm, attentive service to make your dining experience memorable." 
              },
              { 
                icon: <Leaf className="w-10 h-10 text-primary" />, 
                title: "Sustainable Practices", 
                desc: "We believe in giving back to nature. We minimize food waste and use eco-friendly packaging for our takeaways." 
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors text-center"
              >
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h3 className="font-serif text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
