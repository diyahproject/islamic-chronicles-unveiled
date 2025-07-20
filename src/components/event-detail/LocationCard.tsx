import React, { useEffect, useRef } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationCardProps {
  location: string;
  duration: string;
  coordinates: [number, number];
}

const LocationCard: React.FC<LocationCardProps> = ({
  location,
  duration,
  coordinates
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Initialize map
    mapInstance.current = L.map(mapRef.current, {
      center: [coordinates[1], coordinates[0]],
      zoom: 10,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance.current);

    // Add marker
    const customIcon = L.divIcon({
      html: '<div class="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center"><div class="w-2 h-2 bg-white rounded-full"></div></div>',
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    L.marker([coordinates[1], coordinates[0]], { icon: customIcon })
      .addTo(mapInstance.current)
      .bindPopup(location);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [coordinates, location]);

  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-primary" />
        Informasi Tempat
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Location Info */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
            <div>
              <p className="font-semibold text-foreground">Lokasi</p>
              <p className="text-muted-foreground">{location}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-muted-foreground mt-1" />
            <div>
              <p className="font-semibold text-foreground">Durasi</p>
              <p className="text-muted-foreground">{duration}</p>
            </div>
          </div>
        </div>

        {/* Mini Map */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Peta Lokasi</p>
          <div 
            ref={mapRef}
            className="h-32 rounded-lg border border-border overflow-hidden"
          />
        </div>
      </div>
    </Card>
  );
};

export default LocationCard;