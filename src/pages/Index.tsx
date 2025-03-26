
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import PricingSection from '@/components/PricingSection';
// Portfolio section is hidden but kept in the code for future use
// import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';

const Index = () => {
  useEffect(() => {
    // Apply intro effect to elements with intro-effect class
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.intro-effect').forEach((el) => {
      observer.observe(el);
    });

    // Handle hash navigation for direct links
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    // Check for hash on initial load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Tvorba webových stránek rychle a levně | Digitální kováři</title>
        <meta name="description" content="Vytváříme profesionální webové stránky rychle a za dostupné ceny. Kompletní řešení od informačních webů až po komplexní byznys řešení." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Helmet>
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PricingSection />
      {/* Portfolio section is hidden but kept in the code for future use */}
      {/* <PortfolioSection /> */}
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
