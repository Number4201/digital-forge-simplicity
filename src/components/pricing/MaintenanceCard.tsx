
import React from 'react';

const MaintenanceCard = () => {
  return (
    <div className="bg-secondary/60 rounded-xl p-4 md:p-6 border border-border/40 backdrop-blur-sm animate-fade-in hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-xl font-display font-bold mb-2">Správa webu</h3>
          <p className="text-muted-foreground">Průběžná aktualizace obsahu, monitoring a technická podpora</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="text-2xl font-bold font-display">od 700 Kč <span className="text-sm font-normal text-muted-foreground">/ měsíc</span></div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceCard;
