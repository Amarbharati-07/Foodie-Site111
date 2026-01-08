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
        className="h-full w-auto object-contain mix-blend-multiply"
      />
    </div>
  );
}
