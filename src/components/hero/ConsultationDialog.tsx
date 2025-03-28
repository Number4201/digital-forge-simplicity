
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface ConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConsultationDialog: React.FC<ConsultationDialogProps> = ({ open, onOpenChange }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email && !phone) {
      toast({
        title: "Chyba",
        description: "Zadejte prosím email nebo telefon",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('contact_form_submissions')
        .insert({
          form_type: 'quick_consultation',
          name: 'Rychlá konzultace',
          email: email || '',
          phone: phone || null,
          message: note || 'Zájem o rychlou konzultaci',
          notes: note || null
        });

      if (error) throw error;

      // Also call the edge function to send email notification
      await supabase.functions.invoke('contact-form', {
        body: { 
          name: 'Rychlá konzultace', 
          email: email || 'neposkytnut@email.cz', 
          subject: 'Žádost o konzultaci', 
          message: `Kontakt: ${email || ''}, Telefon: ${phone || ''}, Poznámka: ${note || 'Bez poznámky'}`
        }
      });
      
      toast({
        title: "Úspěšně odesláno",
        description: "Brzy vás budeme kontaktovat",
      });
      
      onOpenChange(false);
      setEmail('');
      setPhone('');
      setNote('');
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Konzultace zdarma</DialogTitle>
          <DialogDescription>
            Nechte nám kontakt a my se vám ozveme pro nezávaznou konzultaci vašeho projektu.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input 
              id="email" 
              type="email" 
              placeholder="vas@email.cz" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">Stačí vyplnit email nebo telefon</p>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Telefon
            </label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+420 123 456 789" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="note" className="block text-sm font-medium mb-1">
              Poznámka
            </label>
            <Textarea 
              id="note" 
              placeholder="Např. psát na whatsapp a pod."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Zrušit
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Odesílám..." : "Odeslat"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationDialog;
