
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !message) {
      toast({
        title: "Chyba",
        description: "Vyplňte prosím email a zprávu",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally send the data to your backend
    console.log("Contact form submitted:", { name, email, subject, message });
    
    toast({
      title: "Zpráva odeslána",
      description: "Děkujeme za váš zájem, brzy se vám ozveme.",
    });
    
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title">Kontaktujte nás</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Začněme společně pracovat na vašem projektu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="animate-fade-in">
            <div className="glass-panel p-8 rounded-2xl">
              <h3 className="text-2xl font-display font-bold mb-6">Pojďme si promluvit</h3>
              <p className="text-muted-foreground mb-8">
                Ať už máte jasnou představu o svém projektu nebo teprve hledáte inspiraci, 
                jsme tu pro vás. Vyplňte formulář a my se vám ozveme, nebo nás rovnou kontaktujte některým z uvedených způsobů.
              </p>

              <div className="bg-primary/10 rounded-xl p-4 mb-8 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-medium">Rychlá odezva</h4>
                  <p className="text-muted-foreground">
                    Odpovídáme na zprávy prakticky okamžitě mezi 7:00 - 22:00 každý den. 
                    Neváhejte nás kontaktovat s jakýmkoliv dotazem.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Telefon</h4>
                    <p className="text-muted-foreground">+420 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Email</h4>
                    <p className="text-muted-foreground">info@digitalni-kovari.cz</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Adresa</h4>
                    <p className="text-muted-foreground">Technologická 13, Praha 6, 160 00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in">
            <form className="glass-panel p-8 rounded-2xl" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Jméno
                  </label>
                  <Input
                    id="name"
                    placeholder="Vaše jméno"
                    className="bg-secondary/40 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
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
                    className="bg-secondary/40 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
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
                  className="bg-secondary/40 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Zpráva
                </label>
                <Textarea
                  id="message"
                  placeholder="Popište nám váš projekt..."
                  rows={6}
                  className="bg-secondary/40 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary text-white font-medium py-6 hover:bg-primary/90 transition-all group"
              >
                Odeslat zprávu
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                <span>Odpovídáme prakticky okamžitě mezi 7:00 - 22:00</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
