import { Link } from "wouter";
import { UtensilsCrossed, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 text-center">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <UtensilsCrossed size={40} className="text-muted-foreground opacity-50" />
      </div>
      
      <h1 className="font-serif text-6xl font-bold text-primary mb-2">404</h1>
      <h2 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Oops! It looks like you've taken a wrong turn. The dish you are looking for is not on our menu.
      </p>

      <Link href="/">
        <div className="px-8 py-3 bg-primary text-white rounded-full font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
          Return Home
        </div>
      </Link>
    </div>
  );
}
