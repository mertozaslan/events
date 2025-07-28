'use client';

import { Button } from '@/components';

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

interface ReviewModalProps {
  showReviewModal: boolean;
  setShowReviewModal: (show: boolean) => void;
  selectedEvent: Event | null;
  reviewRating: number;
  setReviewRating: (rating: number) => void;
  reviewComment: string;
  setReviewComment: (comment: string) => void;
  handleAddReview: () => void;
  renderStars: (rating: number, interactive?: boolean, onChange?: (rating: number) => void) => React.ReactElement;
}

export default function ReviewModal({
  showReviewModal,
  setShowReviewModal,
  selectedEvent,
  reviewRating,
  setReviewRating,
  reviewComment,
  setReviewComment,
  handleAddReview,
  renderStars
}: ReviewModalProps) {
  if (!showReviewModal || !selectedEvent) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Etkinlik Değerlendirmesi</h3>
          <button
            onClick={() => setShowReviewModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">{selectedEvent.title}</h4>
          <p className="text-sm text-gray-600">{selectedEvent.location}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Puanınız</label>
            {renderStars(reviewRating, true, setReviewRating)}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Yorumunuz</label>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Etkinlik hakkında düşüncelerinizi paylaşın..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setShowReviewModal(false)}
            className="flex-1"
          >
            İptal
          </Button>
          <Button
            onClick={handleAddReview}
            disabled={!reviewComment.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Gönder
          </Button>
        </div>
      </div>
    </div>
  );
} 