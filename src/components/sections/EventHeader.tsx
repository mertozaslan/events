'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faQrcode, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface EventHeaderProps {
  event: any;
  image: string;
  setShowShareModal: (show: boolean) => void;
  setShowQRModal: (show: boolean) => void;
  formatDate: (dateString: string) => string;
  formatPrice: (price: number) => string;
  getCapacityColor: () => string;
  getCapacityText: () => string;
}

export default function EventHeader({
  event,
  image,
  setShowShareModal,
  setShowQRModal,
  formatDate,
  formatPrice,
  getCapacityColor,
  getCapacityText
}: EventHeaderProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 sm:mb-12 group">
      <div className="relative h-64 sm:h-80 md:h-96">
        {image ? (
          <img
            src={image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
            onClick={() => setShowShareModal(true)}
            className="p-2 sm:p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300"
          >
            <FontAwesomeIcon icon={faShare} className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => setShowQRModal(true)}
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