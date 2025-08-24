import React, { useState, useMemo, useEffect, useRef, useCallback, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Filter, Calendar, MapPin, Search, Clock, ChevronLeft, ChevronRight, Shield, Moon, Sun, Cloud, Zap, Heart, Crown, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TimelineCard from '@/components/timeline/TimelineCard';
import { useAdmin } from '@/contexts/AdminContext';

// GlowCard Component
interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 }
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'blue',
  size = 'md'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', y.toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };

    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getInlineStyles = () => ({
    '--base': base,
    '--spread': spread,
    '--radius': '14',
    '--border': '3',
    '--backdrop': 'hsl(0 0% 60% / 0.12)',
    '--backup-border': 'var(--backdrop)',
    '--size': '200',
    '--outer': '1',
    '--border-size': 'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 150) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
    )`,
    backgroundColor: 'var(--backdrop, transparent)',
    backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
    backgroundPosition: '50% 50%',
    backgroundAttachment: 'fixed',
    border: 'var(--border-size) solid var(--backup-border)',
    position: 'relative' as const,
    touchAction: 'none' as const,
  });

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }
    
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }
    
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${sizeMap[size]}
          aspect-[3/4]
          rounded-2xl 
          relative 
          grid 
          grid-rows-[1fr_auto] 
          shadow-[0_1rem_2rem_-1rem_black] 
          p-4 
          gap-4 
          backdrop-blur-[5px]
          ${className}
        `}
      >
        <div ref={innerRef} data-glow></div>
        {children}
      </div>
    </>
  );
};

// Extended mock data for timeline page
const timelineEvents = [
  {
    id: '1',
    year: '570',
    hijriYear: '-53',
    title: 'Kelahiran Nabi Muhammad SAW',
    subtitle: 'Tahun Gajah - Kelahiran Rasulullah',
    category: 'Biografi',
    location: 'Makkah',
    backgroundImage: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400',
    description: 'Kelahiran Nabi Muhammad SAW pada tahun gajah...'
  },
  {
    id: '2',
    year: '610',
    hijriYear: '1',
    title: 'Wahyu Pertama',
    subtitle: 'Turunnya wahyu pertama di Gua Hira',
    category: 'Wahyu',
    location: 'Makkah',
    backgroundImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
    description: 'Peristiwa turunnya wahyu pertama kepada Nabi Muhammad SAW...'
  },
  {
    id: '3',
    year: '622',
    hijriYear: '1',
    title: 'Hijrah ke Madinah',
    subtitle: 'Perpindahan kaum Muslim dari Makkah ke Madinah',
    category: 'Hijrah',
    location: 'Madinah',
    backgroundImage: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400',
    description: 'Peristiwa hijrah yang menandai dimulainya tahun Hijriyah...'
  },
  {
    id: '4',
    year: '629',
    hijriYear: '8',
    title: 'Fathu Makkah',
    subtitle: 'Pembebasan kota Makkah',
    category: 'Penaklukan',
    location: 'Makkah',
    backgroundImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400',
    description: 'Pembebasan kota Makkah oleh kaum Muslim...'
  },
  {
    id: '5',
    year: '632',
    hijriYear: '11',
    title: 'Wafatnya Rasulullah SAW',
    subtitle: 'Perpindahan Rasulullah ke Rahmatullah',
    category: 'Biografi',
    location: 'Madinah',
    backgroundImage: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=400',
    description: 'Wafatnya Nabi Muhammad SAW di Madinah...'
  },
  {
    id: '6',
    year: '661',
    hijriYear: '41',
    title: 'Dinasti Umayyah',
    subtitle: 'Berdirinya Dinasti Umayyah di Damaskus',
    category: 'Pemerintahan',
    location: 'Damaskus',
    backgroundImage: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400',
    description: 'Dinasti Umayyah menjadi kekhalifahan pertama...'
  }
];

// Hijri Year Card Component
const HijriYearCard = ({ 
  yearData, 
  glowColor, 
  isActive, 
  onClick 
}: { 
  yearData: { year: string; events: any[] }, 
  glowColor: GlowCardProps['glowColor'],
  isActive: boolean,
  onClick: () => void
}) => {
  const getYearIcon = (year: string) => {
    const yearNum = parseInt(year.replace('-', ''));
    const icons = [Shield, Moon, Sun, Cloud, Zap, Heart, Crown, Sparkles, Star, Calendar];
    return icons[yearNum % icons.length];
  };
  
  const IconComponent = getYearIcon(yearData.year);
  
  return (
    <GlowCard 
      glowColor={glowColor} 
      size="sm" 
      className={`group hover:scale-105 transition-all duration-500 cursor-pointer flex-shrink-0 ${
        isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
      }`}
    >
      <div 
        className="flex flex-col items-center justify-center h-full text-center p-2"
        onClick={onClick}
      >
        <IconComponent className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
        
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-white mb-1">
            {yearData.year.startsWith('-') ? yearData.year.substring(1) : yearData.year}
          </h2>
          <p className="text-sm text-gray-300">
            {yearData.year.startsWith('-') ? 'Sebelum H' : 'Hijriyah'}
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-yellow-300 transition-colors">
            {yearData.events.length} Peristiwa
          </h3>
          <p className="text-xs text-gray-400 italic group-hover:text-gray-300 transition-colors">
            Tahun {yearData.year.startsWith('-') ? 'Sebelum Hijriyah' : 'Hijriyah'}
          </p>
        </div>
        
        <div className="flex space-x-1 mt-3">
          {[...Array(Math.min(5, yearData.events.length))].map((_, i) => (
            <div 
              key={i} 
              className="w-1 h-1 rounded-full bg-yellow-400 group-hover:bg-yellow-300 transition-colors duration-300"
            />
          ))}
        </div>
      </div>
    </GlowCard>
  );
};

const Timeline = () => {
  const { events: adminEvents } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Combine mock events with admin events
  const allEvents = useMemo(() => {
    const combinedEvents = [...timelineEvents];
    
    // Add admin events if they have hijriYear
    adminEvents.forEach(adminEvent => {
      if (adminEvent.hijriYear) {
        combinedEvents.push({
          ...adminEvent,
          year: adminEvent.year || '',
          hijriYear: adminEvent.hijriYear,
          subtitle: adminEvent.subtitle || '',
          backgroundImage: adminEvent.backgroundImage || 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400'
        });
      }
    });
    
    return combinedEvents;
  }, [adminEvents]);

  const categories = ['all', 'Biografi', 'Wahyu', 'Hijrah', 'Penaklukan', 'Pemerintahan'];
  
  // Group events by Hijri year
  const eventsByHijriYear = useMemo(() => {
    let filtered = allEvents;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Group by hijriYear and sort
    const grouped = filtered.reduce((acc, event) => {
      const hijriYear = event.hijriYear;
      if (!acc[hijriYear]) {
        acc[hijriYear] = [];
      }
      acc[hijriYear].push(event);
      return acc;
    }, {} as Record<string, typeof allEvents>);
    
    // Convert to sorted array
    return Object.keys(grouped)
      .sort((a, b) => {
        const yearA = parseInt(a.replace('-', ''));
        const yearB = parseInt(b.replace('-', ''));
        if (a.startsWith('-') && !b.startsWith('-')) return -1;
        if (!a.startsWith('-') && b.startsWith('-')) return 1;
        return a.startsWith('-') ? yearB - yearA : yearA - yearB;
      })
      .map(year => ({
        year,
        events: grouped[year]
      }));
  }, [allEvents, selectedCategory, searchQuery]);

  // Carousel controls
  const cardWidth = 192 + 32; // w-48 + gap-8
  const visibleCards = 4;
  const maxIndex = Math.max(0, eventsByHijriYear.length - visibleCards);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentYearIndex(prev => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentYearIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const colors: GlowCardProps['glowColor'][] = ['blue', 'purple', 'green', 'red', 'orange'];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCardClick = (event: any) => {
    window.location.href = `/event/${event.id}`;
  };

  return (
    <div className="min-h-screen pt-8 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 mb-8"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Timeline Sejarah Islam
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Perjalanan lengkap sejarah Islam dari masa ke masa dalam timeline interaktif
          </p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="px-6 mb-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Cari peristiwa dalam timeline..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 py-3 rounded-xl"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-3 rounded-xl border border-border bg-background text-foreground"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Semua Kategori' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground">
            Menampilkan {eventsByHijriYear.reduce((acc, yearGroup) => acc + yearGroup.events.length, 0)} dari {allEvents.length} peristiwa dalam {eventsByHijriYear.length} tahun Hijriyah
          </p>
        </div>
      </motion.div>

      {/* Year Carousel */}
      {eventsByHijriYear.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full bg-gradient-to-r from-background via-primary/5 to-background py-8 mb-8"
        >
          <div className="relative">
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              disabled={currentYearIndex === 0}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 backdrop-blur-sm rounded-full p-3 transition-all duration-300 ${
                currentYearIndex === 0 
                  ? 'bg-muted/20 text-muted-foreground cursor-not-allowed' 
                  : 'bg-background/20 hover:bg-background/30 text-foreground hover:scale-110'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={nextSlide}
              disabled={currentYearIndex === maxIndex}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 backdrop-blur-sm rounded-full p-3 transition-all duration-300 ${
                currentYearIndex === maxIndex 
                  ? 'bg-muted/20 text-muted-foreground cursor-not-allowed' 
                  : 'bg-background/20 hover:bg-background/30 text-foreground hover:scale-110'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Cards Container */}
            <div 
              className="overflow-hidden px-16"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                className="flex transition-transform duration-700 ease-in-out gap-8"
                style={{ 
                  transform: `translateX(-${currentYearIndex * cardWidth}px)`,
                  width: `${eventsByHijriYear.length * cardWidth}px`
                }}
              >
                {eventsByHijriYear.map((yearData, index) => (
                  <HijriYearCard 
                    key={yearData.year}
                    yearData={yearData}
                    glowColor={colors[index % colors.length]}
                    isActive={index === currentYearIndex}
                    onClick={() => {
                      setCurrentYearIndex(index);
                      // Scroll to the events section
                      setTimeout(() => {
                        const eventsSection = document.getElementById('events-section');
                        if (eventsSection) {
                          eventsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {[...Array(Math.min(maxIndex + 1, eventsByHijriYear.length))].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentYearIndex(Math.min(index, maxIndex))}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentYearIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground hover:bg-muted-foreground/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Selected Year Events */}
      <motion.div
        id="events-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="px-6"
      >
        <div className="max-w-6xl mx-auto">
          {eventsByHijriYear.length > 0 && (
            <motion.div
              key={currentYearIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Selected Year Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3 bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl px-6 py-4">
                  <Clock className="text-primary" size={28} />
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">
                      {eventsByHijriYear[currentYearIndex]?.year.startsWith('-') 
                        ? `${eventsByHijriYear[currentYearIndex]?.year.substring(1)} Sebelum Hijriyah` 
                        : `${eventsByHijriYear[currentYearIndex]?.year} Hijriyah`
                      }
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {eventsByHijriYear[currentYearIndex]?.events.length} peristiwa
                    </p>
                  </div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent"></div>
              </div>

              {/* Events Grid for selected year */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsByHijriYear[currentYearIndex]?.events.map((event, eventIndex) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: eventIndex * 0.1, duration: 0.4 }}
                  >
                    <TimelineCard
                      event={event}
                      index={eventIndex}
                      onCardClick={handleCardClick}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {eventsByHijriYear.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Calendar size={64} className="mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tidak ada peristiwa ditemukan</h3>
              <p className="text-muted-foreground mb-4">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                variant="outline"
              >
                Reset Filter
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Timeline;