
import React from 'react';

const HeroHeading = () => {
  return (
    <div className="space-y-12 text-center max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight text-center">
        Jednoduché webové stránky.
        <br />
        <span className="text-accent">Pokročilé funkce.</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-center">
        Vytváříme weby, které pracují za vás. S integrovanými AI chatboty, automatickým rezervačním systémem a propojením s Google kalendářem.
      </p>
    </div>
  );
};

export default HeroHeading;
