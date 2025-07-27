'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faUserPlus, faUserMinus, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components';

interface EventActionCardProps {
  event: any;
  isAttending: boolean;
  isCancelled: boolean;
  handleAttend: () => void;
  handleCancel: () => void;
  handleAddToCalendar: () => void;
}

export default function EventActionCard({
  event,
  isAttending,
  isCancelled,
  handleAttend,
  handleCancel,
  handleAddToCalendar
}: EventActionCardProps) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
        <FontAwesomeIcon icon={faBullseye} className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
        Katılım
      </h3>
      
      <div className="space-y-4">
        {isAttending ? (
          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faUserMinus} className="mr-2" /> Katılımı İptal Et
          </Button>
        ) : isCancelled ? (
          <Button
            onClick={handleAttend}
            className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Tekrar Katıl
          </Button>
        ) : (
          <Button
            onClick={handleAttend}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Katılıyorum
          </Button>
        )}
        
        <Button
          onClick={handleAddToCalendar}
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Google Takvime Ekle
        </Button>
      </div>
    </div>
  );
} 