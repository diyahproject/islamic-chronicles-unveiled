import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IslamicPattern } from '@/components/ui/islamic-pattern';
import heroImage from '@/assets/hero-islamic-architecture.jpg';

interface HeroSectionProps {
  ctaLink?: string | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ ctaLink }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Islamic Architecture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-emerald/70" />
        <IslamicPattern variant="geometric" className="text-white/10" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-golden rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-emerald rounded-full opacity-15 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white mb-6">
            <BookOpen size={16} />
            <span className="text-sm font-medium">Sejarah Islam Digital</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Jejak Peradaban
          <span className="block bg-gradient-to-r from-accent-glow to-accent bg-clip-text text-transparent">
            Islam
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Jelajahi perjalanan sejarah Islam dari masa ke masa dengan timeline interaktif, 
          peta geografis, dan cerita-cerita menginspirasi yang membentuk peradaban dunia.
        </motion.p>

        {ctaLink && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-soft hover:shadow-golden transition-all duration-300 text-lg px-8 py-6 rounded-xl group"
            >
              <a href={ctaLink} className="inline-flex items-center gap-2">
                Mulai Penjelajahan
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Button>
          </motion.div>
        )}

        {/* Floating Statistics */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 text-white"
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">1400+</div>
            <div className="text-sm text-white/80">Tahun Sejarah</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">500+</div>
            <div className="text-sm text-white/80">Peristiwa Penting</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">100+</div>
            <div className="text-sm text-white/80">Tokoh Bersejarah</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full p-1"
        >
          <div className="w-1 h-3 bg-white/70 rounded-full mx-auto" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;