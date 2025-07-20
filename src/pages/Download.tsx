import React from 'react';
import { motion } from 'framer-motion';
import { Download as DownloadIcon, FileText, Image, Book, Smartphone, Monitor, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  format: string;
  size: string;
  icon: React.ElementType;
  downloadUrl: string;
  category: 'mobile' | 'desktop' | 'document';
}

const downloadItems: DownloadItem[] = [
  {
    id: '1',
    title: 'Aplikasi Mobile Android',
    description: 'Aplikasi lengkap untuk Android dengan fitur offline',
    format: 'APK',
    size: '45 MB',
    icon: Smartphone,
    downloadUrl: '#',
    category: 'mobile'
  },
  {
    id: '2',
    title: 'Aplikasi Desktop Windows',
    description: 'Versi desktop untuk Windows dengan semua fitur',
    format: 'EXE',
    size: '120 MB',
    icon: Monitor,
    downloadUrl: '#',
    category: 'desktop'
  },
  {
    id: '3',
    title: 'E-Book Timeline Sejarah Islam',
    description: 'Ringkasan lengkap timeline dalam format PDF',
    format: 'PDF',
    size: '15 MB',
    icon: Book,
    downloadUrl: '#',
    category: 'document'
  },
  {
    id: '4',
    title: 'Infografis Peristiwa Penting',
    description: 'Koleksi infografis high-resolution',
    format: 'ZIP',
    size: '25 MB',
    icon: Image,
    downloadUrl: '#',
    category: 'document'
  },
  {
    id: '5',
    title: 'Aplikasi Tablet iPad',
    description: 'Optimized untuk iPad dengan interface yang responsif',
    format: 'IPA',
    size: '50 MB',
    icon: Tablet,
    downloadUrl: '#',
    category: 'mobile'
  },
  {
    id: '6',
    title: 'Panduan Pembelajaran',
    description: 'Panduan lengkap menggunakan aplikasi',
    format: 'PDF',
    size: '8 MB',
    icon: FileText,
    downloadUrl: '#',
    category: 'document'
  }
];

const Download = () => {
  const handleDownload = (item: DownloadItem) => {
    // In real app, this would trigger actual download
    console.log('Download:', item);
    alert(`Downloading ${item.title}...`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mobile': return '📱';
      case 'desktop': return '💻';
      case 'document': return '📄';
      default: return '📁';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'mobile': return 'Aplikasi Mobile';
      case 'desktop': return 'Aplikasi Desktop';
      case 'document': return 'Dokumen';
      default: return 'Lainnya';
    }
  };

  const categories = ['mobile', 'desktop', 'document'];

  return (
    <div className="min-h-screen pt-8 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 mb-12"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-emerald bg-clip-text text-transparent mb-4">
            Download Gratis
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dapatkan aplikasi dan materi pembelajaran sejarah Islam secara gratis
          </p>
        </div>
      </motion.div>

      {/* Download Categories */}
      {categories.map((category, categoryIndex) => {
        const categoryItems = downloadItems.filter(item => item.category === category);
        
        return (
          <motion.section
            key={category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
            className="px-6 mb-12"
          >
            <div className="max-w-6xl mx-auto">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{getCategoryIcon(category)}</span>
                <h2 className="text-2xl font-bold text-foreground">
                  {getCategoryName(category)}
                </h2>
              </div>

              {/* Download Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryItems.map((item, index) => {
                  const Icon = item.icon;
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (categoryIndex * 0.2) + (index * 0.1), duration: 0.5 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-card rounded-2xl p-6 border border-border shadow-soft hover:shadow-islamic transition-all duration-300"
                    >
                      {/* Icon */}
                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-4">
                        <Icon size={32} className="text-primary-foreground" />
                      </div>

                      {/* Content */}
                      <h3 className="font-semibold text-lg mb-2 text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* File Info */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <span className="px-2 py-1 bg-accent/10 text-accent rounded-full font-medium">
                          {item.format}
                        </span>
                        <span>{item.size}</span>
                      </div>

                      {/* Download Button */}
                      <Button
                        onClick={() => handleDownload(item)}
                        className="w-full bg-gradient-primary hover:shadow-islamic transition-all duration-300 group"
                      >
                        <DownloadIcon size={16} className="mr-2 group-hover:animate-bounce" />
                        Download
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        );
      })}

      {/* Info Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="px-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-card rounded-2xl p-8 border border-border">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Informasi Download</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 text-primary">✅ Gratis Selamanya</h4>
                  <p className="text-muted-foreground">Semua materi dapat diunduh tanpa biaya</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-emerald">🔄 Update Berkala</h4>
                  <p className="text-muted-foreground">Konten diperbarui secara rutin</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-accent">📱 Multi Platform</h4>
                  <p className="text-muted-foreground">Tersedia untuk berbagai device</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Download;