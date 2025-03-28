
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import PackageSelectionModal from './pricing/PackageSelectionModal';
import PricingCard from './pricing/PricingCard';
import MaintenanceCard from './pricing/MaintenanceCard';
import { pricingTiers } from './pricing/PricingData';
import { PricingTier } from './pricing/PackageTypes';

const PricingSection = () => {
  const [expressOptionId, setExpressOptionId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PricingTier | null>(null);
  const isMobile = useIsMobile();

  const toggleExpressOption = (tierId: string) => {
    if (expressOptionId === tierId) {
      setExpressOptionId(null);
    } else {
      setExpressOptionId(tierId);
    }
  };

  const openPackageModal = (tier: PricingTier) => {
    setSelectedPackage(tier);
    setModalOpen(true);
  };

  return (
    <section id="pricing" className="section-padding bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="section-title mb-0 relative z-10">Naše řešení</h2>
            <div className="absolute inset-x-0 bottom-0 h-3 bg-accent/10 -rotate-1"></div>
          </div>
          <p className="section-subtitle max-w-3xl mx-auto">
            Vyberte si z našich balíčků podle vašich potřeb a rozpočtu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              index={index}
              expressOptionId={expressOptionId}
              toggleExpressOption={toggleExpressOption}
              openPackageModal={openPackageModal}
            />
          ))}
        </div>

        <MaintenanceCard />
      </div>

      <PackageSelectionModal 
        open={modalOpen}
        onOpenChange={setModalOpen}
        selectedPackage={selectedPackage}
        showExpressOption={selectedPackage && expressOptionId === selectedPackage.id}
      />
    </section>
  );
};

export default PricingSection;
