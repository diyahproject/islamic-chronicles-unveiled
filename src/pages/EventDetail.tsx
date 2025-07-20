import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Users, Calendar, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ContextualMetadata from '@/components/event-detail/ContextualMetadata';
import LocationCard from '@/components/event-detail/LocationCard';
import ParticipantsSection from '@/components/event-detail/ParticipantsSection';
import EventNarrative from '@/components/event-detail/EventNarrative';
import ReferencesSection from '@/components/event-detail/ReferencesSection';

// Mock data for the event - would come from API/database
const eventData = {
  id: '3',
  hijriYear: '5',
  hijriMonth: 'Syawal',
  year: '627',
  title: 'Pertempuran Sekutu',
  subtitle: 'Keteguhan Iman di Tengah Kepungan',
  category: 'Perang',
  location: 'Madinah Al-Munawwarah',
  duration: '1 bulan',
  coordinates: [39.6138, 24.4667] as [number, number],
  backgroundImage: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800',
  participants: [
    { name: 'Muslimin', role: 'Pembela Madinah', count: '3,000' },
    { name: 'Quraisy', role: 'Pemimpin Koalisi', count: '4,000' },
    { name: 'Ghatafan', role: 'Sekutu Quraisy', count: '2,000' },
    { name: 'Banu Quraizah', role: 'Pengkhianat Perjanjian', count: '700' }
  ],
  narrative: {
    introduction: 'Perang Al-Ahzab atau Perang Khandaq merupakan salah satu peperangan terbesar yang dihadapi umat Islam pada masa Nabi Muhammad SAW. Perang ini terjadi ketika berbagai suku Arab bersatu untuk menyerang Madinah.',
    keyPoints: [
      'Strategi penggalian parit (khandaq) atas usulan Salman Al-Farisi',
      'Kepungan Madinah selama hampir satu bulan',
      'Pengkhianatan Banu Quraizah yang melanggar perjanjian',
      'Kemenangan Islam melalui badai yang menghancurkan perkemahan musuh'
    ],
    impact: 'Perang ini menandai berakhirnya ancaman besar terhadap Madinah dan memperkuat posisi umat Islam di Jazirah Arab.'
  },
  references: [
    'Sirah Nabawiyah - Ibnu Hisyam',
    'Al-Bidayah wa an-Nihayah - Ibnu Katsir',
    'Fiqh as-Sirah - Muhammad al-Ghazali',
    'The Sealed Nectar - Safi-ur-Rahman al-Mubarakpuri'
  ]
};

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleShare = () => {
    const shareText = `${eventData.title} - ${eventData.subtitle}\n\n${eventData.narrative.introduction}\n\nBaca selengkapnya di aplikasi Sejarah Islam`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-80 overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${eventData.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Navigation */}
        <div className="absolute top-6 left-6 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>

        {/* Share Button */}
        <div className="absolute top-6 right-6 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <ContextualMetadata 
            hijriYear={eventData.hijriYear}
            hijriMonth={eventData.hijriMonth}
            year={eventData.year}
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {eventData.title}
          </h1>
          <p className="text-xl text-white/90">
            {eventData.subtitle}
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Location Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LocationCard 
            location={eventData.location}
            duration={eventData.duration}
            coordinates={eventData.coordinates}
          />
        </motion.div>

        {/* Participants Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ParticipantsSection participants={eventData.participants} />
        </motion.div>

        {/* Event Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <EventNarrative narrative={eventData.narrative} />
        </motion.div>

        {/* References */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ReferencesSection references={eventData.references} />
        </motion.div>

        {/* Share to WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-4"
        >
          <Button 
            onClick={handleShare}
            className="bg-gradient-primary hover:opacity-90"
            size="lg"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Bagikan ke WhatsApp
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;