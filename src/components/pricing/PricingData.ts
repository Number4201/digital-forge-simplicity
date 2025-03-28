
import { PricingTier } from './PackageTypes';

export const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Prezentační web',
    description: 'Jednoduchá šablona pro základní prezentaci vašeho podnikání',
    price: 6000,
    deliveryTime: '3 dny',
    features: [
      'Responzivní design',
      'Základní SEO optimalizace',
      'Tvorba obsahu v ceně',
      'Kontaktní formulář',
      'Napojení na Google Analytics',
      'Správa viditelnosti na Google Mapách',
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
    price: 13000,
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
    price: 33000,
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
