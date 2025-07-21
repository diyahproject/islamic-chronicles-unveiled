import React, { createContext, useContext, useState, useEffect } from 'react';

interface Event {
  id: string;
  year: string;
  hijriYear: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  backgroundImage: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  eventCount: number;
  color: string;
}

interface AdminContextType {
  events: Event[];
  categories: Category[];
  lightBgColor: string;
  darkBgColor: string;
  setLightBgColor: (color: string) => void;
  setDarkBgColor: (color: string) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  applyColorChanges: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [lightBgColor, setLightBgColor] = useState('#fcfaf8');
  const [darkBgColor, setDarkBgColor] = useState('#1a1511');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('admin-events');
    const savedCategories = localStorage.getItem('admin-categories');
    const savedLightBg = localStorage.getItem('admin-light-bg');
    const savedDarkBg = localStorage.getItem('admin-dark-bg');

    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedLightBg) setLightBgColor(savedLightBg);
    if (savedDarkBg) setDarkBgColor(savedDarkBg);

    // Apply saved colors
    if (savedLightBg || savedDarkBg) {
      applyColorChanges();
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('admin-events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('admin-categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('admin-light-bg', lightBgColor);
  }, [lightBgColor]);

  useEffect(() => {
    localStorage.setItem('admin-dark-bg', darkBgColor);
  }, [darkBgColor]);

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const applyColorChanges = () => {
    const lightHsl = hexToHsl(lightBgColor);
    const darkHsl = hexToHsl(darkBgColor);
    
    document.documentElement.style.setProperty('--background', lightHsl);
    document.documentElement.style.setProperty('--dark-background', darkHsl);
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...eventData } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: Date.now().toString() };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, categoryData: Partial<Category>) => {
    setCategories(prev => prev.map(category => 
      category.id === id ? { ...category, ...categoryData } : category
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  return (
    <AdminContext.Provider value={{
      events,
      categories,
      lightBgColor,
      darkBgColor,
      setLightBgColor,
      setDarkBgColor,
      addEvent,
      updateEvent,
      deleteEvent,
      addCategory,
      updateCategory,
      deleteCategory,
      applyColorChanges,
    }}>
      {children}
    </AdminContext.Provider>
  );
};