import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  scrolled?: boolean;
  light?: boolean;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="/logo.png" 
        alt="Shri Krishna Restaurant" 
        className="h-16 md:h-24 w-auto object-contain"
      />
    </div>
  );
}
