import React from 'react';
import { Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Participant {
  name: string;
  role: string;
  count: string;
}

interface ParticipantsSectionProps {
  participants: Participant[];
}

const ParticipantsSection: React.FC<ParticipantsSectionProps> = ({
  participants
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Users className="w-6 h-6 text-primary" />
        Pihak Terlibat
      </h3>
      
      <div className="grid gap-4">
        {participants.map((participant, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-foreground text-lg">
                {participant.name}
              </h4>
              <p className="text-muted-foreground text-sm">
                {participant.role}
              </p>
            </div>
            
            <Badge variant="secondary" className="font-bold">
              {participant.count} orang
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ParticipantsSection;