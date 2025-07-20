import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type TextSize = 'small' | 'medium' | 'large';

interface ThemeContextType {
  theme: Theme;
  textSize: TextSize;
  toggleTheme: () => void;
  setTextSize: (size: TextSize) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [textSize, setTextSizeState] = useState<TextSize>('medium');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedTextSize = localStorage.getItem('textSize') as TextSize;
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedTextSize) {
      setTextSizeState(savedTextSize);
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-text-size', textSize);
    localStorage.setItem('textSize', textSize);
  }, [textSize]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size);
  };

  return (
    <ThemeContext.Provider value={{ theme, textSize, toggleTheme, setTextSize }}>
      {children}
    </ThemeContext.Provider>
  );
};