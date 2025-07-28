'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { attendEvent, cancelEvent } from '@/store/eventsSlice';
import { getEventById } from '@/services/eventService';
import { getRandomImage } from '@/services/unsplashService';
import { Button, LoadingSkeleton, EventHeader, EventDescription, EventStats, EventMap, EventActionCard, EventDetailsCard, EventShareCard, ShareModal, QRModal } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft,
  faExclamationTriangle,
  faRefresh
} from '@fortawesome/free-solid-svg-icons';

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

interface UserEvents {
  attending: string[];
  cancelled: string[];
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { userEvents } = useSelector((state: RootState) => state.events as { userEvents: UserEvents });
  
  const [event, setEvent] = useState<Event | null>(null);
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showShareModal, setShowShareModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const isAttending = userEvents.attending.includes(params.id as string);
  const isCancelled = userEvents.cancelled.includes(params.id as string);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        
        // Fetch event data from backend
        const eventData = await getEventById(params.id as string);
        
        if (!eventData) {
          setError('Etkinlik bulunamadı');
          return;
        }

        setEvent(eventData);

        // Fetch image from Unsplash
        try {
          const unsplashImage = await getRandomImage(eventData.category);
          setImage(unsplashImage);
        } catch (imageError) {
          console.warn('Failed to fetch image:', imageError);
          // Continue without image
        }
      } catch {
        setError('Etkinlik yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [params.id]);

  const handleAttend = () => {
    dispatch(attendEvent(params.id as string));
  };

  const handleCancel = () => {
    dispatch(cancelEvent(params.id as string));
  };

  const handleAddToCalendar = () => {
    if (!event) return;

    const eventDate = new Date(event.date);
    const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${eventDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    window.open(calendarUrl, '_blank');
  };

  const handleShare = (platform: string) => {
    if (!event) return;

    const url = window.location.href;
    const text = `${event.title} - ${event.location}`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-16 max-w-lg mx-4 border border-red-100">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <FontAwesomeIcon icon={faExclamationTriangle} className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Bir şeyler ters gitti</h3>
          <p className="text-red-600 text-lg mb-8 leading-relaxed">{error || 'Etkinlik bulunamadı'}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.back()} size="lg" className="shadow-lg">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Geri Dön
            </Button>
            <Button onClick={() => window.location.reload()} size="lg" className="shadow-lg">
              <FontAwesomeIcon icon={faRefresh} className="mr-2" />
              Tekrar Dene
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <EventHeader 
        event={event}
        image={image}
        onShare={() => setShowShareModal(true)}
        onQR={() => setShowQRModal(true)}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <EventDescription event={event} />
            <EventStats event={event} />
            <EventMap event={event} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <EventActionCard 
              isAttending={isAttending}
              isCancelled={isCancelled}
              onAttend={handleAttend}
              onCancel={handleCancel}
              onAddToCalendar={handleAddToCalendar}
            />
            <EventDetailsCard event={event} />
            <EventShareCard 
              event={event}
              handleShare={handleShare}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShare={handleShare}
      />
      
      <QRModal 
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
      />
    </div>
  );
} 