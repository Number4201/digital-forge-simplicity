
import React from 'react';
import { Phone, Mail, MapPin, Zap, MessageCircle } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-bold mb-6">Spojte se s námi</h2>
      <div className="space-y-6">
        <ContactInfoItem 
          icon={<Phone className="h-5 w-5 text-primary" />} 
          title="Telefon" 
          content="+420 724 059 986" 
        />
        <ContactInfoItem 
          icon={<Mail className="h-5 w-5 text-primary" />} 
          title="Email" 
          content="info@digitalnikovari.cz" 
        />
        <ContactInfoItem 
          icon={<Zap className="h-5 w-5 text-primary" />} 
          title="Rychlá odpověď" 
          content="Do 24 hodin" 
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
