'use client';

import Link from 'next/link';
import Button from '../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faMapMarkerAlt, 
  faEye 
} from '@fortawesome/free-solid-svg-icons';

interface EventCardProps {
  event: any;
}

export default function EventCard({ event }: EventCardProps) {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Ücretsiz' : `${price} ₺`;
  };



  const getCapacityColor = () => {
    const percentage = (event.attendees / event.capacity) * 100;
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getCapacityText = () => {
    const percentage = (event.attendees / event.capacity) * 100;
    if (percentage >= 90) return 'Neredeyse Dolu';
    if (percentage >= 70) return 'Hızla Doluyor';
    return 'Yer Var';
  };

  return (
    <Link href={`/event/${event.id}`} className="group block h-full">
      <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group-hover:border-blue-200 h-full flex flex-col">
        {/* Image Section - Fixed Height */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">{event.category}</span>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-900 border border-white/20">
              {event.category}
            </span>
          </div>
          
          {/* Price Badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-white/90 backdrop-blur-sm text-gray-900 border border-white/20">
              {formatPrice(event.price)}
            </span>
          </div>
          
          {/* Capacity Badge */}
          <div className="absolute bottom-4 right-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getCapacityColor()} border border-current/20`}>
              {getCapacityText()}
            </span>
          </div>
        </div>

        {/* Content Section - Flex Grow */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title - Fixed Height */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
            {event.title}
          </h3>
          
          {/* Date & Location - Fixed Height */}
          <div className="flex items-center space-x-4 mb-4 text-gray-600 min-h-[1.5rem]">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium truncate">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium truncate">{event.location}</span>
            </div>
          </div>
          
          {/* Description - Fixed Height */}
          <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow min-h-[4.5rem]">
            {event.description}
          </p>
          
          {/* Progress Bar - Fixed Height */}
          <div className="mb-6 flex-shrink-0">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Katılımcı</span>
              <span>{event.attendees} / {event.capacity}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Action Buttons - Fixed Height */}
          <div className="flex space-x-3 flex-shrink-0">
            <Button
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
            >
              <FontAwesomeIcon icon={faEye} className="mr-2" /> Detayları Gör
            </Button>
          </div>
        </div>
        
        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none"></div>
      </div>
    </Link>
  );
} 