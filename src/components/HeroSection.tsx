
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent/5 to-transparent"></div>
        <div className="absolute -top-[40%] -left-[60%] w-[140%] h-[140%] rounded-full bg-secondary/5 animate-spin-slow"></div>
        <div className="absolute -bottom-[30%] -right-[50%] w-[120%] h-[120%] rounded-full bg-primary/5 animate-spin-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10">
        <div className="space-y-12 text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight">
            Jednoduché webové stránky.
            <br />
            <span className="text-accent">Pokročilé funkce.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Vytváříme weby, které pracují za vás. S integrovanými AI chatboty, automatickým rezervačním systémem a propojením s Google kalendářem.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button 
              className="bg-primary/90 hover:bg-primary text-white font-medium rounded-md px-8 py-6 text-lg transition-all min-w-[200px]"
              onClick={scrollToContact}
            >
              Konzultace zdarma
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white/20 text-white font-medium rounded-md px-8 py-6 text-lg hover:bg-white/5 transition-all min-w-[200px]"
              onClick={scrollToPricing}
            >
              Balíčky
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
        <a 
          href="#services" 
          className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors duration-300"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-sm mb-2">Zjistit více</span>
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
