
import React, { useState } from 'react';
import BackgroundEffects from './hero/BackgroundEffects';
import HeroHeading from './hero/HeroHeading';
import HeroActions from './hero/HeroActions';
import ScrollIndicator from './hero/ScrollIndicator';
import ConsultationDialog from './hero/ConsultationDialog';

const HeroSection = () => {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      <BackgroundEffects />

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10">
        <HeroHeading />
        
        <HeroActions 
          onConsultationClick={() => setConsultationOpen(true)}
          onPricingClick={scrollToPricing}
          isSubmitting={isSubmitting}
        />
      </div>

      <ScrollIndicator targetId="services" label="Zjistit více" />

      <ConsultationDialog 
        open={consultationOpen} 
        onOpenChange={setConsultationOpen} 
      />
    </section>
  );
};

export default HeroSection;
