import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeDemo: React.FC = () => {
  const colors = useTheme();

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-theme-primary">Demo Systemu Kolorów</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded bg-theme-primary text-white">
          <h4 className="font-bold">Primary</h4>
          <p className="text-sm">{colors.primary}</p>
        </div>
        
        <div className="p-4 rounded bg-theme-secondary text-white">
          <h4 className="font-bold">Secondary</h4>
          <p className="text-sm">{colors.secondary}</p>
        </div>
        
        <div className="p-4 rounded bg-theme-accent text-white">
          <h4 className="font-bold">Accent</h4>
          <p className="text-sm">{colors.accent}</p>
        </div>
        
        <div className="p-4 rounded bg-theme-primary-50 border border-theme-primary">
          <h4 className="font-bold text-theme-primary">Primary 50%</h4>
          <p className="text-sm text-theme-text-secondary">Półprzezroczyste</p>
        </div>
        
        <div className="p-4 rounded bg-theme-background border border-theme-secondary">
          <h4 className="font-bold text-theme-secondary">Background</h4>
          <p className="text-sm text-theme-text-secondary">{colors.background}</p>
        </div>
        
        <div className="p-4 rounded bg-gradient-primary text-white">
          <h4 className="font-bold">Gradient</h4>
          <p className="text-sm">CSS Variable</p>
        </div>
      </div>

      <div className="space-y-4">
        <button className="bg-theme-primary hover:bg-theme-primary-light text-white px-6 py-3 rounded-lg transition-colors">
          Button Primary
        </button>
        
        <button className="bg-theme-secondary hover:bg-theme-secondary-light text-white px-6 py-3 rounded-lg transition-colors ml-4">
          Button Secondary
        </button>
        
        <button className="border-2 border-theme-accent text-theme-accent hover:bg-theme-accent hover:text-white px-6 py-3 rounded-lg transition-all ml-4">
          Button Outline
        </button>
      </div>

      <div className="mt-6 p-4 bg-theme-background-light rounded-lg">
        <p className="text-theme-text-primary">
          <strong>Jak zmienić kolory:</strong> Edytuj sekcję "colors" w pliku 
          <code className="bg-gray-100 px-2 py-1 rounded mx-1">src/data/config.json</code>
          i kolory automatycznie się zmienią na całej stronie!
        </p>
      </div>
    </div>
  );
};

export default ThemeDemo;
