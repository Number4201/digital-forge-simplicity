
import React from 'react';
import { ArrowDown } from 'lucide-react';

interface ScrollIndicatorProps {
  targetId: string;
  label: string;
}

const ScrollIndicator = ({ targetId, label }: ScrollIndicatorProps) => {
  const scrollToTarget = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
      <a 
        href={`#${targetId}`} 
        className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors duration-300"
        onClick={scrollToTarget}
      >
        <span className="text-sm mb-2">{label}</span>
        <ArrowDown className="h-5 w-5" />
      </a>
    </div>
  );
};

export default ScrollIndicator;
