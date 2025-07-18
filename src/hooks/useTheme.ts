import { useEffect } from 'react';
import configData from '../data/config.json';
import { ConfigData } from '../../types';

const typedConfigData = configData as ConfigData;

export const useTheme = () => {
  useEffect(() => {
    const { colors } = typedConfigData;
    
    // Aplikuj kolory jako CSS custom properties
    const root = document.documentElement;
    
    // Ustaw wszystkie kolory z config.json jako CSS variables
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-light', colors.primaryLight);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-secondary-light', colors.secondaryLight);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-accent-light', colors.accentLight);
    root.style.setProperty('--color-dark', colors.dark);
    root.style.setProperty('--color-light', colors.light);
    root.style.setProperty('--color-white', colors.white);
    root.style.setProperty('--color-black', colors.black);
    root.style.setProperty('--color-text-primary', colors.textPrimary);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-background-light', colors.backgroundLight);
    root.style.setProperty('--color-background-dark', colors.backgroundDark);
    
    // Konwertuj hex na RGB dla alpha variants
    const hexToRgb = (hex: string): string => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (result) {
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        return `${r}, ${g}, ${b}`;
      }
      return '0, 0, 0';
    };
    
    // Dodaj RGB variants dla półprzezroczystych efektów
    root.style.setProperty('--color-primary-rgb', hexToRgb(colors.primary));
    root.style.setProperty('--color-secondary-rgb', hexToRgb(colors.secondary));
    root.style.setProperty('--color-accent-rgb', hexToRgb(colors.accent));
    
  }, []);
  
  return typedConfigData.colors;
};
