'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface EventDescriptionProps {
  event: any;
}

export default function EventDescription({ event }: EventDescriptionProps) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
        <FontAwesomeIcon icon={faStar} className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3" />
        Etkinlik Hakkında
      </h2>
      <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
        {event.description}
      </p>
    </div>
  );
} 