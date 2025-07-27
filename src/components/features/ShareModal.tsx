'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter as faTwitterBrand, faWhatsapp as faWhatsappBrand, faTelegram as faTelegramBrand } from '@fortawesome/free-brands-svg-icons';

interface ShareModalProps {
  showShareModal: boolean;
  setShowShareModal: (show: boolean) => void;
  handleShare: (platform: string) => void;
}

export default function ShareModal({ showShareModal, setShowShareModal, handleShare }: ShareModalProps) {
  if (!showShareModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Paylaş</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
            <span>Facebook</span>
          </button>
          
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faTwitterBrand} className="w-5 h-5" />
            <span>Twitter</span>
          </button>
          
          <button
            onClick={() => handleShare('whatsapp')}
            className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faWhatsappBrand} className="w-5 h-5" />
            <span>WhatsApp</span>
          </button>
          
          <button
            onClick={() => handleShare('telegram')}
            className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faTelegramBrand} className="w-5 h-5" />
            <span>Telegram</span>
          </button>
        </div>
        
        <button
          onClick={() => setShowShareModal(false)}
          className="w-full p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
        >
          Kapat
        </button>
      </div>
    </div>
  );
} 