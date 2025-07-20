import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';

interface TimelineEvent {
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

interface TimelineCardProps {
  event: TimelineEvent;
  index: number;
  onCardClick: (event: TimelineEvent) => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event, index, onCardClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onCardClick(event)}
      className="relative flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden cursor-pointer group shadow-soft hover:shadow-islamic transition-all duration-300"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${event.backgroundImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        {/* Hijri Year Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="absolute top-4 right-4 bg-gradient-golden px-3 py-1 rounded-full text-black text-sm font-bold"
        >
          {event.hijriYear} H
        </motion.div>

        {/* Category Badge */}
        <div className="inline-flex items-center gap-1 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium mb-3 w-fit">
          <Calendar size={12} />
          {event.category}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-300">
          {event.title}
        </h3>

        {/* Subtitle */}
        <p className="text-white/90 text-sm mb-4 line-clamp-2">
          {event.subtitle}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            {event.location}
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            {event.year} M
          </div>
        </div>

        {/* Hover Indicator */}
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-golden"
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id={`pattern-${event.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 0L20 10L10 20L0 10Z" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#pattern-${event.id})`} />
        </svg>
      </div>
    </motion.div>
  );
};

export default TimelineCard;