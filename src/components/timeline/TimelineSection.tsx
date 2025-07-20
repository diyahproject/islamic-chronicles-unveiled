import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TimelineCard from './TimelineCard';

// Mock data - in real app this would come from API/database
const mockTimelineEvents = [
  {
    id: '1',
    year: '610',
    hijriYear: '1',
    title: 'Wahyu Pertama',
    subtitle: 'Turunnya wahyu pertama di Gua Hira',
    category: 'Wahyu',
    location: 'Makkah',
    backgroundImage: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400',
    description: 'Peristiwa turunnya wahyu pertama kepada Nabi Muhammad SAW di Gua Hira...'
  },
  {
    id: '2',
    year: '622',
    hijriYear: '1',
    title: 'Hijrah ke Madinah',
    subtitle: 'Perpindahan kaum Muslim dari Makkah ke Madinah',
    category: 'Hijrah',
    location: 'Madinah',
    backgroundImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
    description: 'Peristiwa hijrah yang menandai dimulainya tahun Hijriyah...'
  },
  {
    id: '3',
    year: '629',
    hijriYear: '8',
    title: 'Fathu Makkah',
    subtitle: 'Pembebasan kota Makkah',
    category: 'Penaklukan',
    location: 'Makkah',
    backgroundImage: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400',
    description: 'Pembebasan kota Makkah oleh kaum Muslim...'
  },
  {
    id: '4',
    year: '661',
    hijriYear: '41',
    title: 'Dinasti Umayyah',
    subtitle: 'Berdirinya Dinasti Umayyah di Damaskus',
    category: 'Pemerintahan',
    location: 'Damaskus',
    backgroundImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400',
    description: 'Dinasti Umayyah menjadi kekhalifahan pertama...'
  },
  {
    id: '5',
    year: '750',
    hijriYear: '132',
    title: 'Dinasti Abbasiyah',
    subtitle: 'Dimulainya era keemasan Islam',
    category: 'Pemerintahan',
    location: 'Baghdad',
    backgroundImage: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=400',
    description: 'Era keemasan peradaban Islam dimulai...'
  }
];

const TimelineSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // width of card + gap
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  const handleCardClick = (event: any) => {
    // In real app, this would navigate to detail page
    console.log('Navigate to event detail:', event);
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Timeline Sejarah Islam
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Jelajahi perjalanan sejarah Islam dari masa ke masa melalui peristiwa-peristiwa penting
          </p>
        </motion.div>

        {/* Timeline Navigation */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-6 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground shadow-soft"
            >
              <ChevronLeft size={20} />
            </Button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-6 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground shadow-soft"
            >
              <ChevronRight size={20} />
            </Button>
          </div>

          {/* Timeline Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {mockTimelineEvents.map((event, index) => (
              <TimelineCard
                key={event.id}
                event={event}
                index={index}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>

        {/* Timeline Progress Indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 h-1 bg-gradient-primary rounded-full mx-auto"
          style={{ width: '60%' }}
        />
      </div>
    </section>
  );
};

export default TimelineSection;