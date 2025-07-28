'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faLink } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter as faTwitterBrand, faWhatsapp as faWhatsappBrand, faTelegram as faTelegramBrand } from '@fortawesome/free-brands-svg-icons';

interface EventShareCardProps {
  event: any;
  handleShare: (platform: string) => void;
}

export default function EventShareCard({ event, handleShare }: EventShareCardProps) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
        <FontAwesomeIcon icon={faShare} className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" />
        Paylaş
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
          <span className="text-sm">Facebook</span>
        </button>
        
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faTwitterBrand} className="w-4 h-4" />
          <span className="text-sm">Twitter</span>
        </button>
        
        <button
          onClick={() => handleShare('whatsapp')}
          className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faWhatsappBrand} className="w-4 h-4" />
          <span className="text-sm">WhatsApp</span>
        </button>
        
        <button
          onClick={() => handleShare('telegram')}
          className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faTelegramBrand} className="w-4 h-4" />
          <span className="text-sm">Telegram</span>
        </button>
      </div>
      
      <button
        onClick={() => handleShare('copy')}
        className="w-full mt-2 flex items-center justify-center space-x-2 p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
      >
        <FontAwesomeIcon icon={faLink} className="w-4 h-4" />
        <span className="text-sm">Linki Kopyala</span>
      </button>
    </div>
  );
} 