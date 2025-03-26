
import React from 'react';
import LazyImage from './LazyImage';
import { Check } from 'lucide-react';

const aboutPoints = [
  'Jednoduché a čisté webové stránky',
  'Funkční a intuitivní rozhraní',
  'Moderní technologie s důrazem na výkon',
  'Propojení s externími službami',
  'Responzivní design pro všechna zařízení',
  'Pečlivá implementace s důrazem na detail'
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <h2 className="section-title">Naše filosofie</h2>
            <p className="text-xl text-muted-foreground mb-8">
              V Digitalní kováři věříme, že nejlepší weby jsou ty, které jsou jednoduché na pohled, 
              ale silné ve své funkčnosti. Jako moderní kováři tvarujeme digitální nástroje, 
              které vám pomohou uspět v online prostředí.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-foreground/90">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 text-lg">
              <p className="italic text-muted-foreground border-l-4 border-accent/50 pl-4">
                "Keep it simple, keep it functional."
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative overflow-hidden rounded-3xl aspect-square animate-image-glow">
              <LazyImage 
                src="https://images.unsplash.com/photo-1642132652897-6ef7bed2a527?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                alt="Digital blacksmith workshop"
                className="object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full bg-primary/5 filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
