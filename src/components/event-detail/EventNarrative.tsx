import React from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Narrative {
  introduction: string;
  keyPoints: string[];
  impact: string;
}

interface EventNarrativeProps {
  narrative: Narrative;
}

const EventNarrative: React.FC<EventNarrativeProps> = ({
  narrative
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-primary" />
        Deskripsi Peristiwa
      </h3>
      
      <div className="space-y-6">
        {/* Introduction */}
        <div>
          <p className="text-muted-foreground leading-relaxed text-justify">
            {narrative.introduction}
          </p>
        </div>

        {/* Key Points */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-foreground">
            Poin-Poin Utama:
          </h4>
          <div className="space-y-3">
            {narrative.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg border border-primary/20">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Dampak dan Signifikansi:
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {narrative.impact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EventNarrative;