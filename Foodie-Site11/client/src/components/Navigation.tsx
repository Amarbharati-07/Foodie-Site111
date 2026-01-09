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
    { name: "Reservation", href: "/reservation" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={cn(
          "flex items-center justify-between px-6 md:px-10 py-3 rounded-full transition-all duration-500 border",
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-white/20" 
            : "bg-white/90 backdrop-blur-sm border-white/10 shadow-sm"
        )}>
          <Link href="/">
            <div className="cursor-pointer transition-transform duration-500 hover:scale-105">
              <Logo className={cn("transition-all duration-500", scrolled ? "h-12 md:h-14" : "h-14 md:h-18")} />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <div className={cn(
                  "relative px-4 py-2 text-sm font-medium tracking-wide cursor-pointer transition-all duration-300 group",
                  location === link.href 
                    ? "text-primary" 
                    : "text-slate-600 hover:text-primary"
                )}>
                  <span className="relative z-10">{link.name}</span>
                  {location === link.href ? (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/40 blur-[2px]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  ) : (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-1.5" />
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="tel:+917028684786" 
              className={cn(
                "hidden md:flex items-center space-x-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-500",
                "bg-[#6B8E23] text-white hover:bg-[#556B2F] hover:shadow-lg hover:shadow-primary/20 active:scale-95 shadow-sm"
              )}
            >
              <Phone size={14} className="opacity-90" />
              <span>Call Now</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "md:hidden p-2 rounded-full transition-all duration-300",
                scrolled ? "bg-primary/10 text-primary" : "bg-white/20 text-slate-700"
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-4 top-24 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 z-40 overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <div 
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-xl font-medium tracking-wide cursor-pointer py-3 px-4 rounded-2xl transition-all duration-300",
                      location === link.href 
                        ? "bg-primary/10 text-primary translate-x-2" 
                        : "text-slate-600 hover:bg-slate-50 hover:translate-x-1"
                    )}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
              <div className="pt-4">
                <a 
                  href="tel:+917028684786"
                  className="w-full bg-primary text-white py-4 rounded-2xl text-lg font-medium shadow-lg shadow-primary/20 flex items-center justify-center space-x-3 active:scale-[0.98] transition-transform"
                >
                  <Phone size={18} />
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
