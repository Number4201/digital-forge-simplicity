
import React from 'react';
import LazyImage from './LazyImage';
import { Check } from 'lucide-react';

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
                "Digitální řemeslo s důrazem na výsledky."
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative overflow-hidden rounded-3xl aspect-square animate-image-glow">
              <LazyImage 
                src="https://images.unsplash.com/photo-1642132652897-6ef7bed2a527?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                alt="Digitální kovárna - tvorba moderních webových stránek"
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
