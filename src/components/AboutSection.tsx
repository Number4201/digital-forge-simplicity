
import React from 'react';
import LazyImage from './LazyImage';
import { Check, Sparkles } from 'lucide-react';

const aboutPoints = [
  'Webové stránky s důrazem na konverze a funkčnost',
  'Intuitivní uživatelské rozhraní přizpůsobené vašim zákazníkům',
  'Moderní technologie zajišťující rychlost a výkon',
  'Bezproblémová integrace s externími službami a nástroji',
  'Plně responzivní design optimalizovaný pro všechna zařízení',
  'Kód postavený s ohledem na bezpečnost a snadnou údržbu'
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <h2 className="section-title">Naše filosofie</h2>
            <p className="text-xl text-muted-foreground mb-8">
              V Digitalní kováři přistupujeme k tvorbě webů jako k řemeslu. Naším cílem je vytvářet 
              webové stránky, které nejsou jen vizuálně atraktivní, ale především efektivní 
              nástroje pro váš byznys. Spojujeme moderní technologie s prověřenými postupy, 
              abychom vám poskytli řešení, které generuje reálné výsledky.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutPoints.map((point, index) => (
                <div 
                  key={index} 
                  className="feature-point bg-secondary/20 border border-secondary/30 rounded-lg p-3 hover:shadow-lg"
                >
                  <div className="flex items-start">
                    <div className="mt-1 flex-shrink-0 bg-accent/10 rounded-full p-1.5">
                      <Check className="feature-point-icon text-accent" />
                    </div>
                    <div className="ml-3">
                      <span className="text-foreground/90 font-medium">{point}</span>
                    </div>
                  </div>
                  <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 rounded-lg"></div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-lg">
              <div className="italic text-muted-foreground border-l-4 border-accent/50 pl-4 py-2 flex items-center bg-secondary/20 rounded-r-lg">
                <Sparkles className="h-5 w-5 text-accent mr-2" />
                <p>"Digitální řemeslo s důrazem na výsledky."</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative overflow-hidden rounded-full aspect-square animate-circle-glow">
              <LazyImage 
                src="/lovable-uploads/9bf0c41e-9d09-48a2-bffa-10bf9b26e000.png" 
                alt="Digitální cloud - propojená data a technologie"
                className="object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent rounded-full"></div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full bg-primary/5 filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
