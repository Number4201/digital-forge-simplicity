
import React from 'react';
import { ChevronRight, Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/70 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Digitalní kováři</h3>
            <p className="text-muted-foreground mb-6">
              Tvoříme weby, které kombinují jednoduchost designu s pokročilou funkcionalitou pro moderní firmy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5 text-foreground/80" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5 text-foreground/80" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Linkedin className="h-5 w-5 text-foreground/80" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5 text-foreground/80" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Služby</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Webové stránky
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  AI Chatboti
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Rezervační systémy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  SEO Optimalizace
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Užitečné odkazy</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  O nás
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Kariéra
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Přihlaste se k odběru novinek z oblasti webového vývoje a AI.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Váš email"
                className="flex-1 py-2 px-4 bg-white/5 border border-white/10 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-white px-4 rounded-r-md hover:bg-primary/90 transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <div>
            &copy; {currentYear} Digitalní kováři. Všechna práva vyhrazena.
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-foreground transition-colors">Zásady ochrany osobních údajů</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Podmínky použití</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
