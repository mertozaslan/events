'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getUserProfile } from '@/services/profileService';
import { getEvents } from '@/services/eventService';
import { Button, LoadingSkeleton, ProfileSidebar, ProfileTabs, ProfileCalendar, ProfileEventList, ReviewModal } from '@/components';

interface UserEvents {
  attending: string[];
  cancelled: string[];
}

interface EventsState {
  userEvents: UserEvents;
}

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

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  interests: string[];
  stats: {
    totalEvents: number;
    attendedEvents: number;
    cancelledEvents: number;
    favoriteCategories: string[];
    averageRating: number;
    totalReviews: number;
  };
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    language: string;
  };
}

interface EventWithReview {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  category: string;
  price: number;
  capacity: number;
  attendees: number;
  userRating?: number;
  userReview?: string;
  userReviewId?: string;
  attendedAt?: string;
  averageRating?: number;
  reviewCount?: number;
}

export default function ProfilePage() {
  const { userEvents } = useSelector((state: RootState) => state.events as EventsState);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [attendedEvents, setAttendedEvents] = useState<EventWithReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'attended' | 'calendar'>('upcoming');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventWithReview | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileData, eventsData] = await Promise.all([
          getUserProfile(),
          getEvents()
        ]);
        setProfile(profileData);
        setEvents(eventsData);

        // Fetch attended events with reviews
        try {
          const response = await fetch('/api/profile?type=attended');
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setAttendedEvents(data.data);
            }
          }
        } catch {
          console.warn('Failed to fetch attended events');
        }
      } catch {
        setError('Veriler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFilteredEvents = () => {
    if (activeTab === 'upcoming') {
      // Planladıklarım - sadece katılınacak etkinlikler
      return events.filter((event: Event) => 
        userEvents.attending.includes(event.id)
      );
    } else if (activeTab === 'past') {
      // İptal Edilenler - sadece iptal edilen etkinlikler
      return events.filter((event: Event) => 
        userEvents.cancelled.includes(event.id)
      );
    } else if (activeTab === 'attended') {
      // Geçmiş Etkinlikler - katılınan etkinlikler
      return attendedEvents;
    }
    return [];
  };

  const handleAddReview = async () => {
    if (!selectedEvent || !reviewComment.trim()) return;

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          userId: profile?.id,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });

      if (response.ok) {
        // Refresh attended events
        const refreshResponse = await fetch('/api/profile?type=attended');
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          if (data.success) {
            setAttendedEvents(data.data);
          }
        }
        
        setShowReviewModal(false);
        setSelectedEvent(null);
        setReviewRating(5);
        setReviewComment('');
      }
    } catch {
      console.error('Failed to add review');
    }
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive && onChange ? () => onChange(star) : undefined}
            className={`text-lg ${interactive ? 'cursor-pointer' : ''}`}
            disabled={!interactive}
          >
            {star <= rating ? '⭐' : '☆'}
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-16 max-w-lg mx-4 border border-red-100">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Bir şeyler ters gitti</h3>
          <p className="text-red-600 text-lg mb-8 leading-relaxed">{error}</p>
          <Button onClick={() => window.location.reload()} size="lg" className="shadow-lg">
            🔄 Tekrar Dene
          </Button>
        </div>
      </div>
    );
  }

  const filteredEvents = getFilteredEvents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
          {/* Sidebar */}
          <ProfileSidebar 
            profile={profile} 
            userEvents={userEvents} 
            attendedEvents={attendedEvents} 
          />

          {/* Main Content */}
          <div className="col-span-1 lg:col-span-8 space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Tabs */}
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="p-4 sm:p-6 lg:p-8">
              {activeTab === 'calendar' ? (
                <ProfileCalendar 
                  events={events} 
                  userEvents={userEvents} 
                  attendedEvents={attendedEvents} 
                />
              ) : (
                <ProfileEventList
                  filteredEvents={filteredEvents}
                  activeTab={activeTab}
                  setSelectedEvent={setSelectedEvent}
                  setShowReviewModal={setShowReviewModal}
                  renderStars={renderStars}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        showReviewModal={showReviewModal}
        setShowReviewModal={setShowReviewModal}
        selectedEvent={selectedEvent}
        reviewRating={reviewRating}
        setReviewRating={setReviewRating}
        reviewComment={reviewComment}
        setReviewComment={setReviewComment}
        handleAddReview={handleAddReview}
        renderStars={renderStars}
      />
    </div>
  );
} 