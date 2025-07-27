'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components';

interface EventMapProps {
  event: any;
}

export default function EventMap({ event }: EventMapProps) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
        <FontAwesomeIcon icon={faMap} className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mr-2 sm:mr-3" />
        Konum
      </h2>
      <div className="bg-gray-100 rounded-2xl h-56 sm:h-72 md:h-80 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 font-medium">{event.location}</p>
          <Button 
            onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.location)}`, '_blank')}
            size="sm"
            className="mt-4"
          >
            <FontAwesomeIcon icon={faMap} className="mr-2" /> Haritada Göster
          </Button>
        </div>
      </div>
    </div>
  );
} 