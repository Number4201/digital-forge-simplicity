
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Clock, Check, Zap } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

// Validation schema for the form
const formSchema = z.object({
  name: z.string().min(2, { message: 'Jméno musí mít alespoň 2 znaky' }),
  company: z.string().optional(),
  websiteType: z.string().min(3, { message: 'Popište prosím o jaký web půjde' }),
  questions: z.string().optional(),
  phone: z.string()
    .regex(/^(\+420)? ?[0-9]{3} ?[0-9]{3} ?[0-9]{3}$/, { 
      message: 'Neplatné telefonní číslo. Formát: +420 123 456 789' 
    })
    .optional()
    .or(z.literal('')),
  email: z.string()
    .email({ message: 'Neplatná emailová adresa' })
    .optional()
    .or(z.literal('')),
}).refine(data => data.phone || data.email, {
  message: 'Zadejte prosím telefonní číslo nebo email',
  path: ['phone'],
});

type FormValues = z.infer<typeof formSchema>;

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

interface PackageSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPackage: PricingTier | null;
  showExpressOption: boolean;
}

const PackageSelectionModal = ({ 
  open, 
  onOpenChange, 
  selectedPackage,
  showExpressOption 
}: PackageSelectionModalProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      websiteType: '',
      questions: '',
      phone: '',
      email: '',
    },
  });

  if (!selectedPackage) return null;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data, "Selected package:", selectedPackage);
    
    toast({
      title: "Formulář odeslán",
      description: "Děkujeme za váš zájem, brzy se vám ozveme.",
    });
    
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4 md:p-6 w-[calc(100vw-32px)] md:w-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-display">
            Balíček: {selectedPackage.name}
          </DialogTitle>
          <DialogDescription>
            Vyplňte prosím níže uvedené informace pro objednání balíčku
          </DialogDescription>
        </DialogHeader>
        
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jméno</FormLabel>
                    <FormControl>
                      <Input placeholder="Vaše jméno" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firma</FormLabel>
                    <FormControl>
                      <Input placeholder="Název firmy (nepovinné)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="websiteType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>O jaký web půjde</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Popište stručně jaký web potřebujete a k čemu bude sloužit" 
                      rows={3} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="questions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dotazy</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Máte-li nějaké další dotazy či požadavky, napište nám je sem" 
                      rows={3} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefonní číslo</FormLabel>
                    <FormControl>
                      <Input placeholder="+420 123 456 789" {...field} />
                    </FormControl>
                    <FormDescription>
                      Vyplňte telefon nebo email
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="vas@email.cz" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="mt-6 sm:mt-8">
              <Button type="submit" className="w-full">
                Odeslat objednávku
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PackageSelectionModal;
