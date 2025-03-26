
import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import LazyImage from './LazyImage';
import { cn } from '@/lib/utils';

// Example projects - these would be replaced with actual projects
const projects = [
  {
    title: 'E-commerce s integrovaným chatbotem',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    description: 'Moderní e-shop s AI asistentem, který pomáhá zákazníkům s výběrem produktů.'
  },
  {
    title: 'Rezervační systém pro kadeřnictví',
    category: 'Booking',
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    description: 'Intuitivní rezervační systém napojený na Google kalendář pro řízení obsazenosti.'
  },
  {
    title: 'Webové stránky pro právní kancelář',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1625225233840-695456021cde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    description: 'Profesionální prezentace s online poradnou a automatickým sjednáváním schůzek.'
  },
  {
    title: 'Portfolio pro fotografa',
    category: 'Portfolio',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    description: 'Minimalistické portfolio s důrazem na vizuální prezentaci fotografických prací.'
  }
];

const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title">Naše projekty</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Ukázka našich realizovaných projektů, které kombinují jednoduchost a funkčnost
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-secondary/60 text-foreground/70 hover:bg-secondary/80'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ '--index': index } as React.CSSProperties}
            >
              <div className="aspect-video relative">
                <LazyImage
                  src={project.image}
                  alt={project.title}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-sm font-medium text-primary mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-display font-bold mb-2">{project.title}</h3>
                    <p 
                      className={cn(
                        "text-muted-foreground transition-all duration-300 max-w-md",
                        hoveredIndex === index ? "opacity-100" : "opacity-0 translate-y-4"
                      )}
                    >
                      {project.description}
                    </p>
                  </div>
                  
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center transition-all duration-300",
                      hoveredIndex === index 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-4"
                    )}
                  >
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
