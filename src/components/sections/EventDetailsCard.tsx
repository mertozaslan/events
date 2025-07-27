'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCalendarAlt, faMapMarkerAlt, faDollarSign, faTag } from '@fortawesome/free-solid-svg-icons';

interface EventDetailsCardProps {
  event: any;
  formatDate: (dateString: string) => string;
  formatPrice: (price: number) => string;
}

export default function EventDetailsCard({ event, formatDate, formatPrice }: EventDetailsCardProps) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
        <FontAwesomeIcon icon={faStar} className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2" />
        Etkinlik Detayları
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Tarih & Saat</div>
            <div className="font-semibold text-gray-900">{formatDate(event.date)}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Konum</div>
            <div className="font-semibold text-gray-900">{event.location}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faDollarSign} className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Fiyat</div>
            <div className="font-semibold text-gray-900">{formatPrice(event.price)}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faTag} className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Kategori</div>
            <div className="font-semibold text-gray-900">{event.category}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 