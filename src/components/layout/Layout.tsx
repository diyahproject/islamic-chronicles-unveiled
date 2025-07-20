import React from 'react';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pb-20">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;