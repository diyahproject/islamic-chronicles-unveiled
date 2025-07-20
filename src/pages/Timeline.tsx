import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Calendar, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TimelineCard from '@/components/timeline/TimelineCard';

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

const Timeline = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(timelineEvents);

  const categories = ['all', 'Biografi', 'Wahyu', 'Hijrah', 'Penaklukan', 'Pemerintahan'];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterEvents(query, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterEvents(searchQuery, category);
  };

  const filterEvents = (query: string, category: string) => {
    let filtered = timelineEvents;

    if (category !== 'all') {
      filtered = filtered.filter(event => event.category === category);
    }

    if (query) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.subtitle.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
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
            Menampilkan {filteredEvents.length} dari {timelineEvents.length} peristiwa
          </p>
        </div>
      </motion.div>

      {/* Timeline Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <TimelineCard
                key={event.id}
                event={event}
                index={index}
                onCardClick={handleCardClick}
              />
            ))}
          </div>

          {filteredEvents.length === 0 && (
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
                  setFilteredEvents(timelineEvents);
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