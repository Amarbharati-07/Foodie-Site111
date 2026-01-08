import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 font-sans relative z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Logo className="mb-6 scale-90 origin-left" />
            <p className="text-[#4b5563] text-sm leading-relaxed max-w-xs">
              Experience the divine taste of authentic pure vegetarian cuisine, crafted with love and tradition since generations.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-[#1b4332] font-bold text-sm tracking-widest uppercase mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Menu', 'About', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}>
                    <div className="text-[#6b7280] hover:text-[#1b4332] text-sm transition-colors cursor-pointer inline-block">
                      {item}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-[#1b4332] font-bold text-sm tracking-widest uppercase mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <MapPin className="text-[#1b4332] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={16} />
                <span className="text-[#6b7280] text-sm">Ambernath, Maharashtra, India</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="text-[#1b4332] shrink-0 group-hover:rotate-12 transition-transform" size={16} />
                <a href="tel:+917028684786" className="text-[#6b7280] hover:text-[#1b4332] text-sm transition-colors">+91 7028684786</a>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="text-[#1b4332] shrink-0 group-hover:-rotate-12 transition-transform" size={16} />
                <a href="mailto:shrikrishnapureveg@gmail.com" className="text-[#6b7280] hover:text-[#1b4332] text-sm transition-colors">shrikrishnapureveg@gmail.com</a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-[#1b4332] font-bold text-sm tracking-widest uppercase mb-6">Opening Hours</h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-[#6b7280]">Mon - Fri</span>
                <span className="text-[#1b4332] font-semibold">11:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between text-sm border-t border-slate-50 pt-2">
                <span className="text-[#6b7280]">Sat - Sun</span>
                <span className="text-[#1b4332] font-semibold">11:00 AM - 11:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs tracking-widest uppercase font-bold text-[#9ca3af]">
          <p>© 2026 SHRI KRISHNA RESTAURANT. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8">
             <span className="hover:text-[#1b4332] cursor-pointer transition-colors">Privacy Policy</span>
             <span className="hover:text-[#1b4332] cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
