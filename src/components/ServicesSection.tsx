
import React from 'react';
import { Bot, Calendar, Globe, Zap, BarChart, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: Globe,
    title: 'Moderní webové stránky',
    description: 'Responzivní a rychlé webové stránky s důrazem na uživatelský zážitek a moderní design.'
  },
  {
    icon: Bot,
    title: 'AI Chatboti',
    description: 'Inteligentní chatboti na míru, kteří odpoví na otázky vašich zákazníků 24/7.'
  },
  {
    icon: Calendar,
    title: 'Rezervační systémy',
    description: 'Automatické rezervační systémy propojené s vaším Google kalendářem.'
  },
  {
    icon: Zap,
    title: 'Rychlá implementace',
    description: 'Rychlé nasazení webu s minimálními požadavky na vaši účast.'
  },
  {
    icon: BarChart,
    title: 'SEO optimalizace',
    description: 'Optimalizace pro vyhledávače, která vám zajistí lepší viditelnost na internetu.'
  },
  {
    icon: ShieldCheck,
    title: 'Bezpečnost a podpora',
    description: 'Bezpečnostní opatření a technická podpora, která vás nenechá ve štychu.'
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title">Naše služby</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Jednoduché řešení s pokročilými funkcemi, které vaši konkurenci nechají daleko za vámi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="glass-panel border-white/5 overflow-hidden transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
              style={{ '--index': index } as React.CSSProperties}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-accent/50"></div>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-display">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
