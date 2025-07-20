import React from 'react';

interface IslamicPatternProps {
  className?: string;
  variant?: 'geometric' | 'floral' | 'calligraphy';
}

export const IslamicPattern: React.FC<IslamicPatternProps> = ({ 
  className = '', 
  variant = 'geometric' 
}) => {
  const patterns = {
    geometric: (
      <svg className={`absolute inset-0 w-full h-full ${className}`} viewBox="0 0 100 100">
        <defs>
          <pattern id="islamic-geo" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M10 0L20 10L10 20L0 10Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-geo)" />
      </svg>
    ),
    floral: (
      <svg className={`absolute inset-0 w-full h-full ${className}`} viewBox="0 0 100 100">
        <defs>
          <pattern id="islamic-floral" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
            <circle cx="12.5" cy="12.5" r="3" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
            <path
              d="M12.5 6.5 Q15.5 9.5 12.5 12.5 Q9.5 9.5 12.5 6.5Z"
              fill="currentColor"
              opacity="0.05"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-floral)" />
      </svg>
    ),
    calligraphy: (
      <svg className={`absolute inset-0 w-full h-full ${className}`} viewBox="0 0 100 100">
        <defs>
          <pattern id="islamic-cal" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path
              d="M5 15 Q15 5 25 15 Q15 25 5 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.06"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-cal)" />
      </svg>
    )
  };

  return patterns[variant];
};