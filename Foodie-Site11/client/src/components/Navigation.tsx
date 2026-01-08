import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 font-sans border-b border-slate-100",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-center relative">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <div className={cn(
                  "text-sm font-bold tracking-[0.15em] uppercase cursor-pointer relative py-1 transition-all duration-300",
                  location === link.href 
                    ? "text-[#1b4332] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:bg-[#1b4332]" 
                    : "text-[#4b5563] hover:text-[#1b4332]"
                )}>
                  {link.name}
                </div>
              </Link>
            ))}
            <a 
              href="tel:+917028684786" 
              className={cn(
                "flex items-center space-x-2 px-8 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm",
                "bg-[#1b4332] text-white hover:bg-[#2d6a4f] hover:shadow-md active:scale-95 border border-[#1b4332]/20"
              )}
            >
              <Phone size={14} fill="currentColor" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 rounded-full backdrop-blur-sm transition-colors",
              scrolled ? "bg-muted text-foreground" : "bg-white/10 text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-0 top-0 bg-background z-40 flex flex-col pt-24 px-6"
          >
             <button
                className="absolute top-6 right-6 p-2 rounded-full bg-muted text-foreground"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <div 
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-2xl font-serif cursor-pointer py-2",
                      location === link.href ? "text-primary italic" : "text-foreground"
                    )}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
              <div className="pt-8 flex justify-center">
                <a 
                  href="tel:+917028684786"
                  className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium shadow-xl shadow-primary/30 flex items-center space-x-3"
                >
                  <Phone size={20} />
                  <span>+91 7028684786</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
