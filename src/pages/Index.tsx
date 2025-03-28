
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
      // Preload critical images or assets for mobile optimization
      if (isMobile) {
        // Optimize for mobile by delaying non-critical resources
        setTimeout(() => {
          const links = Array.from(document.querySelectorAll('a[href^="#"]'));
          links.forEach(link => {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              const targetId = link.getAttribute('href')?.substring(1);
              if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth' });
                }
              }
            });
          });
        }, 1000);
      }
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
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Tvorba webových stránek rychle a kvalitně | Digitální kováři</title>
        <meta name="description" content="Vytváříme profesionální webové stránky rychle a za dostupné ceny. S AI chatboty, rezervačním systémem a propojením s Google kalendářem." />
        <meta name="keywords" content="tvorba webových stránek, webdesign, profesionální web, AI chatbot, rezervační systém" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="canonical" href="https://digitalnikovari.cz" />
        
        {/* Preload critical assets for better performance */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/montserrat.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Structured data for LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Digitální kováři",
            "description": "Profesionální tvorba webových stránek s AI chatboty, rezervačním systémem a Google kalendářem.",
            "url": "https://digitalnikovari.cz",
            "telephone": "+420123456789",
            "email": "info@digitalnikovari.cz",
            "priceRange": "6000-33000 Kč",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Praha",
              "addressRegion": "Praha",
              "addressCountry": "CZ"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "17:00"
            }
          })}
        </script>
        
        {/* Structured data for Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Tvorba webových stránek",
            "provider": {
              "@type": "Organization",
              "name": "Digitální kováři"
            },
            "areaServed": "Česká republika",
            "offers": {
              "@type": "Offer",
              "price": "6000",
              "priceCurrency": "CZK"
            }
          })}
        </script>
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
