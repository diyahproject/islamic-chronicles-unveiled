import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, Download, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    { icon: Home, label: 'Beranda', path: '/' },
    { icon: Clock, label: 'Timeline', path: '/timeline' },
    { icon: Download, label: 'Download', path: '/download' },
    { icon: Settings, label: 'Pengaturan', path: '/settings' },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border"
    >
      <div className="flex items-center justify-around px-2 py-3 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center p-2 min-w-[64px] group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-primary text-primary-foreground shadow-islamic' 
                    : 'text-muted-foreground group-hover:text-primary group-hover:bg-muted'
                }`}
              >
                <Icon size={20} />
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </motion.div>
              <span className={`text-xs mt-1 transition-colors duration-300 ${
                isActive ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;