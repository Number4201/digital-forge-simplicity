
import React, { useEffect, lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import { Helmet } from 'react-helmet';
import { useIsMobile } from '@/hooks/use-mobile';

// Lazy load less critical sections to improve initial load time
const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const PricingSection = lazy(() => import('@/components/PricingSection'));
const ContactSection = lazy(() => import('@/components/contact/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));

// Simple loading component
const SectionLoader = () => (
  <div className="w-full h-48 flex items-center justify-center">
    <div className="animate-pulse bg-secondary/40 rounded-md h-12 w-48"></div>
  </div>
);

const Index = () => {
  const isMobile = useIsMobile();
  
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

    // Preload key resources after main content is loaded
    const preloadResources = () => {
      // Add any critical resources that need preloading here
    };
    
    // Wait until idle to preload non-critical resources
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preloadResources);
    } else {
      setTimeout(preloadResources, 2000);
    }

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
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Helmet>
      <Navigation />
      <HeroSection />
      
      <Suspense fallback={<SectionLoader />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <PricingSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
