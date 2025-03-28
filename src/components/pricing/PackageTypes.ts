
export type PricingTier = {
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

export interface PackageSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPackage: PricingTier | null;
  showExpressOption: boolean;
}
