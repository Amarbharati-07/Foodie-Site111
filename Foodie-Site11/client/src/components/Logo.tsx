import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  scrolled?: boolean;
  light?: boolean;
}

export function Logo({ className, light }: LogoProps) {
  const brandTeal = "#1d9e9e";

  return (
    <div className={cn("flex flex-col items-start leading-none", className)}>
      <div className="flex items-start gap-1 mb-1">
        <div className="relative">
          <span
            className={cn(
              "font-serif text-3xl md:text-5xl font-bold tracking-tighter block",
              light ? "text-white" : "text-[#1d9e9e]"
            )}
            style={{ 
              fontFamily: "'Cinzel', serif",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.1))"
            }}
          >
            श्री कृष्णा
          </span>
          {/* Swash underline effect */}
          <div 
            className={cn(
              "absolute -bottom-2 -left-2 w-full h-1 rounded-full",
              light ? "bg-white/40" : "bg-[#1d9e9e]/30"
            )}
            style={{ 
              borderRadius: "100% 0% 100% 0% / 100% 0% 100% 0%",
              transform: "rotate(-2deg) skewX(-20deg)"
            }}
          />
        </div>
        <div className="flex -space-x-3 mt-1 md:mt-2 scale-90 md:scale-100 origin-top-left">
          {/* Peacock Feathers - High Fidelity matching the image */}
          <div className="relative w-6 h-9 bg-[#95d5b2] rounded-full rotate-[-30deg] border border-[#2d6a4f]/20 shadow-sm overflow-hidden flex items-center justify-center">
            <div className="w-4 h-6 bg-[#fff9c4] rounded-full flex items-center justify-center">
              <div className="w-2.5 h-4 bg-[#4361ee] rounded-full flex items-center justify-center">
                <div className="w-1.5 h-2 bg-[#3c096c] rounded-full" />
              </div>
            </div>
          </div>
          <div className="relative w-6 h-9 bg-[#b7e4c7] rounded-full rotate-[-15deg] -mt-3 border border-[#2d6a4f]/20 shadow-sm overflow-hidden flex items-center justify-center z-10">
            <div className="w-4 h-6 bg-[#fff9c4] rounded-full flex items-center justify-center">
              <div className="w-2.5 h-4 bg-[#4361ee] rounded-full flex items-center justify-center">
                <div className="w-1.5 h-2 bg-[#3c096c] rounded-full" />
              </div>
            </div>
          </div>
          <div className="relative w-6 h-9 bg-[#d8f3dc] rounded-full rotate-[5deg] -mt-1 border border-[#2d6a4f]/20 shadow-sm overflow-hidden flex items-center justify-center z-20">
            <div className="w-4 h-6 bg-[#fff9c4] rounded-full flex items-center justify-center">
              <div className="w-2.5 h-4 bg-[#4361ee] rounded-full flex items-center justify-center">
                <div className="w-1.5 h-2 bg-[#3c096c] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <span
        className={cn(
          "font-sans text-[0.7rem] md:text-[1rem] font-black tracking-[0.4em] uppercase mt-1 md:ml-12",
          light ? "text-white/90" : "text-[#1d9e9e]"
        )}
        style={{ 
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "0.3em"
        }}
      >
        RESTAURANT
      </span>
    </div>
  );
}
