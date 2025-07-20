import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock, MapPin, User, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchResult {
  id: string;
  title: string;
  type: 'event' | 'person' | 'place';
  year: string;
  hijriYear: string;
  description: string;
  location?: string;
}

// Mock search results
const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'Fathu Makkah',
    type: 'event',
    year: '629',
    hijriYear: '8',
    description: 'Pembebasan kota Makkah oleh kaum Muslim yang menandai kemenangan besar...',
    location: 'Makkah'
  },
  {
    id: '2',
    title: 'Khalid ibn al-Walid',
    type: 'person',
    year: '592-638',
    hijriYear: '30-17',
    description: 'Panglima perang Islam yang dijuluki Saif Allah al-Maslul...'
  },
  {
    id: '3',
    title: 'Masjid Nabawi',
    type: 'place',
    year: '622',
    hijriYear: '1',
    description: 'Masjid pertama yang dibangun oleh Nabi Muhammad SAW di Madinah...',
    location: 'Madinah'
  }
];

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search function
  const handleSearch = useCallback(
    (query: string) => {
      if (query.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      
      // Simulate API call
      setTimeout(() => {
        const filtered = mockResults.filter(
          result =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);
    },
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return <Clock size={16} className="text-primary" />;
      case 'person': return <User size={16} className="text-emerald" />;
      case 'place': return <MapPin size={16} className="text-accent" />;
      default: return <Clock size={16} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'event': return 'Peristiwa';
      case 'person': return 'Tokoh';
      case 'place': return 'Tempat';
      default: return 'Lainnya';
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-accent/30 text-accent-foreground rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-emerald bg-clip-text text-transparent mb-4">
            Cari dalam Sejarah
          </h2>
          <p className="text-muted-foreground text-lg">
            Temukan peristiwa, tokoh, atau tempat bersejarah dengan mudah
          </p>
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Cari peristiwa, tokoh, atau tempat bersejarah..."
              value={searchQuery}
              onChange={handleInputChange}
              className="pl-12 pr-20 py-4 text-lg rounded-xl border-2 focus:border-primary bg-card/50 backdrop-blur-sm"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Filter size={20} />
            </Button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-card rounded-xl border border-border"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Periode</label>
                    <select className="w-full p-2 rounded-lg border border-border bg-background">
                      <option>Semua Periode</option>
                      <option>Periode Makkah</option>
                      <option>Periode Madinah</option>
                      <option>Khulafaur Rasyidin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Jenis</label>
                    <select className="w-full p-2 rounded-lg border border-border bg-background">
                      <option>Semua Jenis</option>
                      <option>Peristiwa</option>
                      <option>Tokoh</option>
                      <option>Tempat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Lokasi</label>
                    <select className="w-full p-2 rounded-lg border border-border bg-background">
                      <option>Semua Lokasi</option>
                      <option>Makkah</option>
                      <option>Madinah</option>
                      <option>Damaskus</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search Results */}
        <AnimatePresence>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {isSearching ? (
                <div className="text-center py-8">
                  <div className="animate-shimmer bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded-lg h-20 w-full" />
                  <p className="text-muted-foreground mt-4">Mencari...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ditemukan {searchResults.length} hasil untuk "{searchQuery}"
                  </p>
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-card rounded-xl border border-border shadow-soft hover:shadow-islamic transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {getTypeIcon(result.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">
                              {highlightText(result.title, searchQuery)}
                            </h3>
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              {getTypeLabel(result.type)}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">
                            {highlightText(result.description, searchQuery)}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{result.year} M / {result.hijriYear} H</span>
                            {result.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                {result.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <Search size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    Tidak ada hasil untuk "{searchQuery}"
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Coba kata kunci yang berbeda atau gunakan filter untuk mempersempit pencarian
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SearchSection;