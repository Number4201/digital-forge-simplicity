
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Clock, Check, Zap, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import PackageSelectionModal from './PackageSelectionModal';
import { useIsMobile } from '@/hooks/use-mobile';

type PricingTier = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  deliveryTime: string;
  features: string[];
  popular?: boolean;
  expressOption?: {
    deliveryTime: string;
    price: number;
    discountPrice?: number;
  };
  securityCertificate?: {
    name: string;
    description?: string;
    discount?: boolean;
  };
};

const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Prezentační web',
    description: 'Jednoduchá šablona pro základní prezentaci vašeho podnikání',
    price: 3000,
    discountPrice: 1800,
    deliveryTime: '3 dny',
    features: [
      'Responzivní design',
      'Základní SEO optimalizace',
      'Tvorba obsahu v ceně',
      'Kontaktní formulář',
      'Napojení na Google Analytics',
    ],
    securityCertificate: {
      name: 'SSL certifikát',
      description: 'Základní šifrování komunikace',
    }
  },
  {
    id: 'custom',
    name: 'Prémiový web',
    description: 'Web na míru s pokročilými funkcemi podle vašich požadavků',
    price: 5000,
    deliveryTime: '14 dní',
    popular: true,
    features: [
      'Vše z Prezentačního webu',
      'Vlastní grafický design',
      'Interaktivní prvky',
      'SEO optimalizace',
      'Optimalizace pro vysokou konverzi',
      'Napojení na sociální sítě',
      'Administrační systém',
    ],
    expressOption: {
      deliveryTime: '48 hodin',
      price: 10000,
      discountPrice: 6500,
    },
    securityCertificate: {
      name: 'SSL certifikát',
      description: 'Rozšířená validace domény',
    }
  },
  {
    id: 'ecommerce',
    name: 'Byznys řešení',
    description: 'Komplexní web s e-shopem a vlastní databází',
    price: 27000,
    deliveryTime: '30 dní',
    features: [
      'Vše z Prémiového webu',
      'E-shop s napojením na platební brány',
      'Vlastní databáze produktů',
      'Napojení na skladový systém',
      'AI chatbot pro zákaznickou podporu',
      'Pokročilá analytika',
      'API integrace na míru',
    ],
    securityCertificate: {
      name: 'DigiCert EV SSL certifikát',
      description: 'Nejvyšší úroveň zabezpečení a ověření',
      discount: true,
    }
  },
];

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
            <Card 
              key={tier.id}
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
          ))}
        </div>

        <div className="bg-secondary/60 rounded-xl p-4 md:p-6 border border-border/40 backdrop-blur-sm animate-fade-in hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-bold mb-2">Správa webu</h3>
              <p className="text-muted-foreground">Průběžná aktualizace obsahu, monitoring a technická podpora</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-2xl font-bold font-display">od 700 Kč <span className="text-sm font-normal text-muted-foreground">/ měsíc</span></div>
            </div>
          </div>
        </div>
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
