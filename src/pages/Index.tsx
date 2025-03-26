
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

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
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
