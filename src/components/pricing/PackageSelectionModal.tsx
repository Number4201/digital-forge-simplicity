
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { FormValues } from './FormSchema';
import { PackageSelectionModalProps } from './PackageTypes';
import PackageDetails from './PackageDetails';
import PackageSelectionForm from './PackageSelectionForm';

const PackageSelectionModal = ({ 
  open, 
  onOpenChange, 
  selectedPackage,
  showExpressOption 
}: PackageSelectionModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!selectedPackage) return null;

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // First save to Supabase database
      const { error: dbError } = await supabase
        .from('contact_form_submissions')
        .insert({
          form_type: 'package_selection',
          name: data.name,
          email: data.email || '',
          phone: data.phone || null,
          company: data.company || null,
          message: `Zájem o balíček: ${selectedPackage.name}`,
          website_type: data.websiteType,
          questions: data.questions || null,
          package_name: selectedPackage.name,
          express_option: showExpressOption,
        });
      
      if (dbError) throw dbError;
      
      // Then call the edge function to send email notification
      const messageBody = `
Zájem o balíček: ${selectedPackage.name}
${showExpressOption ? '(s Express dodáním)' : ''}

Jméno: ${data.name}
${data.company ? `Firma: ${data.company}` : ''}
${data.email ? `Email: ${data.email}` : ''}
${data.phone ? `Telefon: ${data.phone}` : ''}

O jaký web půjde: ${data.websiteType}
${data.questions ? `Dotazy: ${data.questions}` : ''}
      `;
      
      await supabase.functions.invoke('contact-form', {
        body: { 
          name: data.name, 
          email: data.email || 'neposkytnut@email.cz', 
          subject: `Objednávka balíčku: ${selectedPackage.name}`, 
          message: messageBody
        }
      });
      
      toast({
        title: "Formulář odeslán",
        description: "Děkujeme za váš zájem, brzy se vám ozveme.",
      });
      
      onOpenChange(false);
    } catch (error: any) {
      console.error('Chyba při odesílání formuláře:', error);
      toast({
        title: "Chyba",
        description: error.message || "Něco se pokazilo. Zkuste to prosím později.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        
        <PackageDetails 
          selectedPackage={selectedPackage}
          showExpressOption={showExpressOption}
        />

        <PackageSelectionForm
          selectedPackage={selectedPackage}
          showExpressOption={showExpressOption}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PackageSelectionModal;
