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

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { userEvents } = useSelector((state: RootState) => state.events as any);
  
  const [event, setEvent] = useState<any>(null);
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
      } catch (err) {
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
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        return;
    }
    
    window.open(shareUrl, '_blank');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
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
    if (percentage >= 90) return 'text-red-600 bg-red-100 border-red-200';
    if (percentage >= 70) return 'text-orange-600 bg-orange-100 border-orange-200';
    return 'text-green-600 bg-green-100 border-green-200';
  };

  const getCapacityText = () => {
    const percentage = (event.attendees / event.capacity) * 100;
    if (percentage >= 90) return 'Neredeyse Dolu';
    if (percentage >= 70) return 'Hızla Doluyor';
    return 'Yer Var';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-16 max-w-lg mx-4 border border-red-100">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <FontAwesomeIcon icon={faExclamationTriangle} className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Bir şeyler ters gitti</h3>
          <p className="text-red-600 text-lg mb-8 leading-relaxed">{error}</p>
          <div className="flex space-x-4">
            <Button onClick={() => router.back()} size="lg" className="shadow-lg">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Geri Dön
            </Button>
            <Button onClick={() => window.location.reload()} size="lg" className="shadow-lg">
              <FontAwesomeIcon icon={faRefresh} className="mr-2" /> Tekrar Dene
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Event Header */}
        <EventHeader
          event={event}
          image={image}
          setShowShareModal={setShowShareModal}
          setShowQRModal={setShowQRModal}
          formatDate={formatDate}
          formatPrice={formatPrice}
          getCapacityColor={getCapacityColor}
          getCapacityText={getCapacityText}
        />

        {/* Enhanced Event Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <EventDescription event={event} />
            <EventStats event={event} />
            <EventMap event={event} />
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <EventActionCard
              event={event}
              isAttending={isAttending}
              isCancelled={isCancelled}
              handleAttend={handleAttend}
              handleCancel={handleCancel}
              handleAddToCalendar={handleAddToCalendar}
            />
            <EventDetailsCard
              event={event}
              formatDate={formatDate}
              formatPrice={formatPrice}
            />
            <EventShareCard
              event={event}
              handleShare={handleShare}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ShareModal
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        handleShare={handleShare}
      />
      <QRModal
        showQRModal={showQRModal}
        setShowQRModal={setShowQRModal}
      />
    </div>
  );
} 