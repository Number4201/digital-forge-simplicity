
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Služby', path: '#services' },
  { name: 'O nás', path: '#about' },
  { name: 'Reference', path: '#portfolio' },
  { name: 'Kontakt', path: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:py-5 md:px-12 lg:px-24',
        {
          'bg-background/80 backdrop-blur-lg shadow-md': isScrolled,
          'bg-transparent': !isScrolled
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2">
          <span className="text-2xl font-display font-bold tracking-tight text-foreground animate-pulse-slow">
            Digitalní kováři
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="text-sm font-medium text-foreground/80 hover:text-foreground hover-effect"
            >
              {item.name}
            </a>
          ))}
          <Button className="bg-primary text-white font-medium rounded-md px-5 py-2 hover:bg-primary/90 transition-all">
            Začít spolupráci
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-foreground hover:text-foreground/80 hover-effect"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 top-16 bg-background z-40 transform transition-transform duration-300 ease-in-out md:hidden',
          {
            'translate-x-0': mobileMenuOpen,
            'translate-x-full': !mobileMenuOpen,
          }
        )}
      >
        <div className="flex flex-col p-8 space-y-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-foreground hover:text-foreground/80 hover-effect"
            >
              {item.name}
            </a>
          ))}
          <Button className="bg-primary text-white font-medium rounded-md px-5 py-6 hover:bg-primary/90 transition-all w-full">
            Začít spolupráci
            <ChevronRight className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
