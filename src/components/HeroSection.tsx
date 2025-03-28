
import React, { useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

const HeroSection = () => {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      
      setConsultationOpen(false);
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent/5 to-transparent"></div>
        <div className="absolute -top-[40%] -left-[60%] w-[140%] h-[140%] rounded-full bg-secondary/5 animate-spin-slow"></div>
        <div className="absolute -bottom-[30%] -right-[50%] w-[120%] h-[120%] rounded-full bg-primary/5 animate-spin-slow"></div>
      </div>

      {/* Removed text boxes at the top */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10">
        <div className="space-y-12 text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight">
            Jednoduché webové stránky.
            <br />
            <span className="text-accent">Pokročilé funkce.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Vytváříme weby, které pracují za vás. S integrovanými AI chatboty, automatickým rezervačním systémem a propojením s Google kalendářem.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button 
              className="bg-primary/90 hover:bg-primary text-white font-medium rounded-md px-8 py-6 text-lg transition-all min-w-[200px]"
              onClick={() => setConsultationOpen(true)}
              disabled={isSubmitting}
            >
              Konzultace zdarma
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white/20 text-white font-medium rounded-md px-8 py-6 text-lg hover:bg-white/5 transition-all min-w-[200px]"
              onClick={scrollToPricing}
            >
              Balíčky
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
        <a 
          href="#services" 
          className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors duration-300"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-sm mb-2">Zjistit více</span>
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>

      <Dialog open={consultationOpen} onOpenChange={setConsultationOpen}>
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
              <Button type="button" variant="outline" onClick={() => setConsultationOpen(false)}>
                Zrušit
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Odesílám..." : "Odeslat"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
