
import React from 'react';
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
        <div className="flex flex-col items-center">
          <div className="animate-fade-in max-w-3xl mx-auto text-center">
            <h2 className="section-title text-center">Naše filosofie</h2>
            <p className="text-xl text-muted-foreground mb-8 text-center">
              V Digitalní kováři přistupujeme k tvorbě webů jako k řemeslu. Naším cílem je vytvářet 
              webové stránky, které nejsou jen vizuálně atraktivní, ale především efektivní 
              nástroje pro váš byznys. Spojujeme moderní technologie s prověřenými postupy, 
              abychom vám poskytli řešení, které generuje reálné výsledky.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto">
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

            <div className="mt-12 text-lg mx-auto">
              <div className="italic text-muted-foreground border-l-4 border-accent/50 pl-4 py-2 flex items-center bg-secondary/20 rounded-r-lg max-w-md mx-auto">
                <Sparkles className="h-5 w-5 text-accent mr-2" />
                <p>"Digitální řemeslo s důrazem na výsledky."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
