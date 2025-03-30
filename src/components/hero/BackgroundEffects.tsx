
import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent/5 to-transparent"></div>
      {/* Removed circular elements with animations as requested */}
    </div>
  );
};

export default BackgroundEffects;
