
import React from 'react';
import { Clock, Check, Zap } from 'lucide-react';
import { PricingTier } from './PackageTypes';

interface PackageDetailsProps {
  selectedPackage: PricingTier;
  showExpressOption: boolean;
}

const PackageDetails = ({ selectedPackage, showExpressOption }: PackageDetailsProps) => {
  return (
    <div className="bg-secondary/30 p-4 rounded-md mb-6">
      <div className="flex items-baseline gap-2 mb-2">
        {selectedPackage.discountPrice ? (
          <>
            <span className="text-xl font-bold font-display">{selectedPackage.discountPrice.toLocaleString()} Kč</span>
            <span className="text-sm text-muted-foreground line-through">{selectedPackage.price.toLocaleString()} Kč</span>
          </>
        ) : (
          <span className="text-xl font-bold font-display">{selectedPackage.price.toLocaleString()} Kč</span>
        )}
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Clock className="h-4 w-4" />
        <span>Dodání: <strong className="text-foreground">
          {selectedPackage.deliveryTime}
          {showExpressOption && selectedPackage.expressOption ? 
            ` (Express: ${selectedPackage.expressOption.deliveryTime})` : 
            ''}
        </strong></span>
      </div>

      {showExpressOption && selectedPackage.expressOption && (
        <div className="mb-4 p-3 bg-primary/10 rounded-md border border-primary/20">
          <div className="flex items-center gap-2 text-sm mb-1">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">Express dodání aktivováno</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Dokončíme váš web do {selectedPackage.expressOption.deliveryTime} za příplatek 
            {selectedPackage.expressOption.discountPrice 
              ? ` ${selectedPackage.expressOption.discountPrice.toLocaleString()} Kč`
              : ` ${selectedPackage.expressOption.price.toLocaleString()} Kč`}
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <h4 className="text-sm font-medium mb-1">Obsah balíčku:</h4>
        <ul className="space-y-1.5">
          {selectedPackage.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackageDetails;
