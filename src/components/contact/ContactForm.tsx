
import React, { useState } from 'react';
import { Send, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from '@/hooks/use-mobile';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !message) {
      toast({
        title: "Chyba",
        description: "Vyplňte prosím email a zprávu",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First save to Supabase database directly
      const { error: dbError } = await supabase
        .from('contact_form_submissions')
        .insert({
          form_type: 'contact_page',
          name: name || 'Neznámý',
          email,
          subject: subject || 'Kontaktní formulář',
          message,
        });
      
      if (dbError) throw dbError;
      
      // Then call the edge function to send email notification
      const { error } = await supabase.functions.invoke('contact-form', {
        body: { name, email, subject, message }
      });
      
      if (error) throw error;
      
      toast({
        title: "Zpráva odeslána",
        description: "Děkujeme za váš zájem, brzy se vám ozveme.",
      });
      
      // Reset formuláře
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
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

  // Optimize rendering for mobile devices
  const inputClasses = "bg-secondary/40 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary";
  const formClasses = isMobile ? "glass-panel p-6 rounded-xl" : "glass-panel p-8 rounded-2xl";

  return (
    <form className={formClasses} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Jméno
          </label>
          <Input
            id="name"
            placeholder="Vaše jméno"
            className={inputClasses}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="vas@email.cz"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Předmět
        </label>
        <Input
          id="subject"
          placeholder="S čím vám můžeme pomoci?"
          className={inputClasses}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Zpráva
        </label>
        <Textarea
          id="message"
          placeholder="Popište nám váš projekt..."
          rows={isMobile ? 4 : 6}
          className={`${inputClasses} resize-none`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-primary text-white font-medium py-5 hover:bg-primary/90 transition-all group"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Odesílám...
          </>
        ) : (
          <>
            Odeslat zprávu
            <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Zap className="h-4 w-4 text-primary" />
        <span>Odpovídáme prakticky okamžitě mezi 7:00 - 22:00</span>
      </div>
    </form>
  );
};

export default ContactForm;
