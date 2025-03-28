
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Clock, Check, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PricingTier } from './PackageTypes';

interface PricingCardProps {
  tier: PricingTier;
  index: number;
  expressOptionId: string | null;
  toggleExpressOption: (tierId: string) => void;
  openPackageModal: (tier: PricingTier) => void;
}

const PricingCard = ({ 
  tier, 
  index, 
  expressOptionId,
  toggleExpressOption,
  openPackageModal
}: PricingCardProps) => {
  return (
    <Card 
      className={cn(
        "relative border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 h-full transform hover:-translate-y-1 hover:shadow-lg",
        "animate-fade-in [animation-delay:var(--delay)]",
        tier.popular ? "border-primary/40 shadow-[0_0_15px_rgba(155,135,245,0.1)]" : ""
      )}
      style={{ '--delay': `${index * 150}ms` } as React.CSSProperties}
    >
      {tier.popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-primary px-4 py-1 rounded-full text-xs font-medium text-primary-foreground">
            Nejoblíbenější
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-display mb-2">{tier.name}</CardTitle>
        <CardDescription className="text-muted-foreground min-h-[60px]">
          {tier.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-baseline gap-2">
            {tier.discountPrice ? (
              <>
                <span className="text-2xl md:text-3xl font-bold font-display">{tier.discountPrice.toLocaleString()} Kč</span>
                <span className="text-lg md:text-xl text-muted-foreground line-through">{tier.price.toLocaleString()} Kč</span>
              </>
            ) : (
              <span className="text-2xl md:text-3xl font-bold font-display">{tier.price.toLocaleString()} Kč</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Dodání: <strong className="text-foreground">{tier.deliveryTime}</strong></span>
        </div>

        {tier.securityCertificate && (
          <div className="flex items-center gap-2 text-sm border border-border/50 rounded-md p-2 bg-secondary/50">
            <Shield className="h-4 w-4 text-green-500" />
            <div>
              <span className="font-medium text-foreground">{tier.securityCertificate.name}</span>
              {tier.securityCertificate.description && (
                <p className="text-xs text-muted-foreground">{tier.securityCertificate.description}</p>
              )}
              {tier.securityCertificate.discount && (
                <p className="text-xs text-emerald-500 font-medium">Se slevou 30%</p>
              )}
            </div>
          </div>
        )}

        {tier.expressOption && (
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex justify-between items-center border-dashed"
              onClick={() => toggleExpressOption(tier.id)}
            >
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Express dodání</span>
              </div>
              <ArrowUpRight className={cn("h-4 w-4 transition-transform", expressOptionId === tier.id ? "rotate-90" : "")} />
            </Button>
            
            {expressOptionId === tier.id && tier.expressOption && (
              <div className="mt-3 p-3 bg-secondary/60 rounded-md text-sm">
                <div className="font-medium mb-1">Express do {tier.expressOption.deliveryTime}</div>
                <div className="flex items-baseline gap-2 mb-2">
                  {tier.expressOption.discountPrice ? (
                    <>
                      <span className="font-bold">+{tier.expressOption.discountPrice.toLocaleString()} Kč</span>
                      <span className="text-muted-foreground line-through text-xs">+{tier.expressOption.price.toLocaleString()} Kč</span>
                    </>
                  ) : (
                    <span className="font-bold">+{tier.expressOption.price.toLocaleString()} Kč</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <ul className="space-y-2.5">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={tier.popular ? "default" : "outline"}
          onClick={() => openPackageModal(tier)}
        >
          Vybrat balíček
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
