
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroActionsProps {
  onConsultationClick: () => void;
  onPricingClick: () => void;
  isSubmitting: boolean;
}

const HeroActions = ({ onConsultationClick, onPricingClick, isSubmitting }: HeroActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
      <Button 
        className="bg-primary/90 hover:bg-primary text-white font-medium rounded-md px-8 py-6 text-lg transition-all min-w-[200px]"
        onClick={onConsultationClick}
        disabled={isSubmitting}
      >
        Konzultace zdarma
      </Button>
      <Button 
        variant="outline" 
        className="bg-transparent border-white/20 text-white font-medium rounded-md px-8 py-6 text-lg hover:bg-white/5 transition-all min-w-[200px]"
        onClick={onPricingClick}
      >
        Balíčky
      </Button>
    </div>
  );
};

export default HeroActions;
