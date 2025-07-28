'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faQrcode, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

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
  image?: string;
}

interface EventHeaderProps {
  event: Event;
  image: string;
  onShare: () => void;
  onQR: () => void;
}

export default function EventHeader({
  event,
  image,
  onShare,
  onQR
}: EventHeaderProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  const getCapacityColor = () => {
    const percentage = (event.attendees / event.capacity) * 100;
    if (percentage >= 90) return 'text-red-500 bg-red-100 border-red-200';
    if (percentage >= 70) return 'text-orange-500 bg-orange-100 border-orange-200';
    return 'text-green-500 bg-green-100 border-green-200';
  };

  const getCapacityText = () => {
    const percentage = Math.round((event.attendees / event.capacity) * 100);
    if (percentage >= 90) return 'Neredeyse Dolu';
    if (percentage >= 70) return 'Hızla Doluyor';
    return 'Yer Var';
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 sm:mb-12 group">
      <div className="relative h-64 sm:h-80 md:h-96">
        {image ? (
          <Image
            src={image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">{event.category}</span>
          </div>
        )}
        
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex space-x-2 sm:space-x-3">
          <button
            onClick={onShare}
            className="p-2 sm:p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300"
          >
            <FontAwesomeIcon icon={faShare} className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={onQR}
            className="p-2 sm:p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300"
          >
            <FontAwesomeIcon icon={faQrcode} className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        
        {/* Header Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <span className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-semibold border border-white/30">
              {event.category}
            </span>
            <span className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-semibold border border-white/30">
              {formatPrice(event.price)}
            </span>
            <span className={`inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border ${getCapacityColor()}`}>
              {getCapacityText()}
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 leading-tight">
            {event.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm sm:text-lg">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 