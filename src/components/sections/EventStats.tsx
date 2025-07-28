'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  price: number;
  attendees: number;
  capacity: number;
  image: string;
}

interface EventStatsProps {
  event: Event;
}

export default function EventStats({ event }: EventStatsProps) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
        <FontAwesomeIcon icon={faUsers} className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2 sm:mr-3" />
        Etkinlik İstatistikleri
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="text-center group">
          <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">{event.attendees}</div>
          <div className="text-gray-600">Katılımcı</div>
        </div>
        <div className="text-center group">
          <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">{event.capacity}</div>
          <div className="text-gray-600">Kapasite</div>
        </div>
        <div className="text-center group">
          <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
            {Math.round((event.attendees / event.capacity) * 100)}%
          </div>
          <div className="text-gray-600">Doluluk</div>
        </div>
      </div>
      
      {/* Enhanced Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Katılım Durumu</span>
          <span>{event.attendees} / {event.capacity}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
} 