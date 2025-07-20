import React from 'react';
import { Calendar } from 'lucide-react';

interface ContextualMetadataProps {
  hijriYear: string;
  hijriMonth: string;
  year: string;
}

const ContextualMetadata: React.FC<ContextualMetadataProps> = ({
  hijriYear,
  hijriMonth,
  year
}) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-gradient-golden px-4 py-2 rounded-full">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-black" />
          <span className="text-black font-bold text-sm">
            {hijriYear} H - {hijriMonth}
          </span>
        </div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
        <span className="text-white/90 text-sm">
          {year} M
        </span>
      </div>
    </div>
  );
};

export default ContextualMetadata;