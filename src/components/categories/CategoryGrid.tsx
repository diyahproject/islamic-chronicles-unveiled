import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  eventCount: number;
  color: string;
}

// Mock categories data
const categories: Category[] = [
  {
    id: '1',
    name: 'Periode Makkah',
    description: 'Awal dakwah dan pembentukan umat',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400',
    eventCount: 25,
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: '2',
    name: 'Periode Madinah',
    description: 'Pembentukan negara Islam pertama',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
    eventCount: 32,
    color: 'from-primary to-primary-glow'
  },
  {
    id: '3',
    name: 'Khulafaur Rasyidin',
    description: 'Era empat khalifah pertama',
    image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400',
    eventCount: 28,
    color: 'from-accent to-accent-glow'
  },
  {
    id: '4',
    name: 'Dinasti Umayyah',
    description: 'Ekspansi Islam ke berbagai benua',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400',
    eventCount: 45,
    color: 'from-earth to-amber-600'
  },
  {
    id: '5',
    name: 'Dinasti Abbasiyah',
    description: 'Era keemasan peradaban Islam',
    image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=400',
    eventCount: 67,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: '6',
    name: 'Islam Nusantara',
    description: 'Penyebaran Islam di Asia Tenggara',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400',
    eventCount: 38,
    color: 'from-green-500 to-emerald-500'
  }
];

const CategoryGrid = () => {
  const handleCategoryClick = (category: Category) => {
    // In real app, this would navigate to category page
    console.log('Navigate to category:', category);
  };

  return (
    <section className="py-16 px-6 bg-gradient-card">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kategori Sejarah
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Eksplorasi sejarah Islam berdasarkan periode dan tema yang berbeda
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryClick(category)}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-soft hover:shadow-islamic transition-all duration-300"
            >
              {/* Background Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`} />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  {/* Event Count Badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {category.eventCount} peristiwa
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent-glow transition-colors duration-300">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-white/90 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Arrow Indicator */}
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-sm font-medium"
                  >
                    Jelajahi
                    <ArrowRight size={16} className="ml-1" />
                  </motion.div>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="absolute inset-0 border-2 border-white/30 rounded-2xl"
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Bottom Info */}
              <div className="bg-card p-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Era sejarah penting
                  </span>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                    <span className="text-xs text-muted-foreground">
                      {category.eventCount}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Atau mulai dari timeline lengkap untuk melihat semua peristiwa
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-medium shadow-islamic hover:shadow-golden transition-all duration-300"
          >
            Lihat Timeline Lengkap
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;