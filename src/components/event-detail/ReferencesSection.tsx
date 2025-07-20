import React from 'react';
import { BookMarked } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ReferencesSectionProps {
  references: string[];
}

const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  references
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BookMarked className="w-6 h-6 text-primary" />
        Referensi
      </h3>
      
      <div className="space-y-2">
        {references.map((reference, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
          >
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold flex-shrink-0 mt-0.5">
              {index + 1}
            </div>
            <p className="text-muted-foreground">
              {reference}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ReferencesSection;