
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      <div className="glass-panel p-12 rounded-3xl max-w-md w-full text-center animate-fade-in">
        <div className="relative mb-8 w-24 h-24 mx-auto">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-slow"></div>
          <div className="absolute inset-4 bg-primary/30 rounded-full"></div>
          <span className="absolute inset-0 flex items-center justify-center text-4xl font-display font-bold">
            404
          </span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-display font-bold mb-4">Stránka nenalezena</h1>
        
        <p className="text-muted-foreground mb-8">
          Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.
        </p>
        
        <Button asChild className="inline-flex items-center bg-primary hover:bg-primary/90 text-white transition-colors">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zpět na hlavní stránku
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
