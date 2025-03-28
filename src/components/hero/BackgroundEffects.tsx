
import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent/5 to-transparent"></div>
      
      {/* Upravené pozice a velikosti kruhů pro lepší pokrytí */}
      <div className="absolute -top-[30%] -left-[40%] w-[170%] h-[170%] rounded-full bg-secondary/5 animate-spin-slow"></div>
      <div className="absolute -bottom-[20%] -right-[30%] w-[150%] h-[150%] rounded-full bg-primary/5 animate-spin-slow"></div>
      
      {/* Přidaný třetí kruh pro lepší vyplnění prázdného prostoru */}
      <div className="absolute bottom-[10%] left-[10%] w-[120%] h-[120%] rounded-full bg-accent/5 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
    </div>
  );
};

export default BackgroundEffects;
