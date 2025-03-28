import React from 'react';
import { Check, Clock, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PricingTier } from './PackageTypes';

interface PricingCardProps {
  tier: PricingTier;
  index: number;
  expressOptionId: string | null;
  toggleExpressOption: (id: string) => void;
  openPackageModal: (tier: PricingTier) => void;
}

const PricingCard = ({ 
  tier, 
  index, 
  expressOptionId, 
  toggleExpressOption,
  openPackageModal 
}: PricingCardProps) => {
  const isPopular = tier.popular === true;
  const showExpressOption = tier.expressOption !== undefined;
  const isExpressEnabled = expressOptionId === tier.id;

  return (
    <div className={`relative rounded-lg border shadow-md overflow-hidden flex flex-col ${isPopular ? 'border-primary/50' : 'border-secondary/50'}`}>
      {isPopular && (
        <Badge className="absolute top-3 right-3 rounded-full uppercase text-xs font-bold tracking-wider z-10">
          Popular
        </Badge>
      )}

      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-semibold text-center font-display">{tier.name}</h3>
        <p className="text-muted-foreground text-center mt-2">{tier.description}</p>

        <div className="flex items-baseline justify-center mt-6">
          {tier.discountPrice ? (
            <>
              <span className="text-3xl font-bold font-display">{tier.discountPrice.toLocaleString()} Kč</span>
              <span className="ml-1 text-muted-foreground line-through">{tier.price.toLocaleString()} Kč</span>
            </>
          ) : (
            <span className="text-3xl font-bold font-display">{tier.price.toLocaleString()} Kč</span>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2">
          <Clock className="h-4 w-4" />
          <span>Dodání do {tier.deliveryTime}</span>
        </div>

        <ul className="mt-8 space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {showExpressOption && (
        <div className="p-6 bg-secondary/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Expresní doručení</span>
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => toggleExpressOption(tier.id)}
            >
              {isExpressEnabled ? 'Zrušit' : 'Aktivovat'}
            </Button>
          </div>
          {isExpressEnabled && tier.expressOption && (
            <div className="mt-4 text-sm text-muted-foreground">
              Dokončíme váš web do {tier.expressOption.deliveryTime} za příplatek 
              {tier.expressOption.discountPrice 
                ? ` ${tier.expressOption.discountPrice.toLocaleString()} Kč`
                : ` ${tier.expressOption.price.toLocaleString()} Kč`}
            </div>
          )}
        </div>
      )}

      <div className="p-6 border-t border-secondary/50">
        <Button className="w-full justify-center gap-2" onClick={() => openPackageModal(tier)}>
          Objednat <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
