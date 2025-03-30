
import React from 'react';
import { Phone, Mail, MapPin, Zap, MessageCircle } from 'lucide-react';
import { WhatsappIcon } from 'lucide-react';

const ContactInfo = () => {
  return (
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
        <ContactInfoItem 
          icon={<Phone className="h-5 w-5 text-primary" />} 
          title="Telefon" 
          content="+420 724 059 986" 
        />
        <ContactInfoItem 
          icon={<Mail className="h-5 w-5 text-primary" />} 
          title="Email" 
          content="tvorba@digitalnikovari.cz" 
        />
        <ContactInfoItem 
          icon={<MapPin className="h-5 w-5 text-primary" />} 
          title="Adresa" 
          content="V.Vlčka 205, 273 51" 
        />
        <ContactInfoItem 
          icon={<MessageCircle className="h-5 w-5 text-[#25D366]" />} 
          title="WhatsApp" 
          content="+420 724 059 986"
          link="https://wa.me/420724059986" 
        />
      </div>
    </div>
  );
};

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
}

const ContactInfoItem = ({ icon, title, content, link }: ContactInfoItemProps) => {
  const ContentElement = link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
      {content}
    </a>
  ) : (
    <p className="text-muted-foreground">{content}</p>
  );

  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-base font-medium">{title}</h4>
        {ContentElement}
      </div>
    </div>
  );
};

export default ContactInfo;
