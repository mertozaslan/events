'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRModal({ isOpen, onClose }: QRModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-sm mx-4 shadow-2xl text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">QR Kod</h3>
        <div className="bg-gray-100 rounded-2xl p-8 mb-6">
          <FontAwesomeIcon icon={faQrcode} className="w-32 h-32 text-gray-400" />
        </div>
        <p className="text-gray-600 mb-6">QR kodu tarayarak etkinlik bilgilerine hızlıca erişebilirsiniz.</p>
        <button
          onClick={onClose}
          className="w-full p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
        >
          Kapat
        </button>
      </div>
    </div>
  );
} 