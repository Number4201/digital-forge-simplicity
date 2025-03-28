
import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent/5 to-transparent"></div>
      <div className="absolute -top-[40%] -left-[60%] w-[140%] h-[140%] rounded-full bg-secondary/5 animate-spin-slow"></div>
      <div className="absolute -bottom-[30%] -right-[50%] w-[120%] h-[120%] rounded-full bg-primary/5 animate-spin-slow"></div>
    </div>
  );
};

export default BackgroundEffects;
