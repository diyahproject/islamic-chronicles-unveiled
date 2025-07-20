import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import TimelineSection from '@/components/timeline/TimelineSection';
import CategoryGrid from '@/components/categories/CategoryGrid';
import SearchSection from '@/components/search/SearchSection';

const Index = () => {
  // CTA link - set to null to hide the button, or provide a URL
  const ctaLink = "https://example.com/mulai-belajar"; // Set to null to hide

  return (
    <div className="min-h-screen">
      {/* Hero Section with conditional CTA */}
      <HeroSection ctaLink={ctaLink} />
      
      {/* Timeline Section */}
      <TimelineSection />
      
      {/* Category Grid */}
      <CategoryGrid />
      
      {/* Search Section */}
      <SearchSection />
    </div>
  );
};

export default Index;
