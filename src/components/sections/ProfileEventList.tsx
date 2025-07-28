'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faStar, faBullseye, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
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

interface EventWithReview extends Event {
  userRating?: number;
  userReview?: string;
  userReviewId?: string;
  attendedAt?: string;
  averageRating?: number;
  reviewCount?: number;
}

interface ProfileEventListProps {
  filteredEvents: (Event | EventWithReview)[];
  activeTab: 'upcoming' | 'past' | 'attended' | 'calendar';
  setSelectedEvent: (event: EventWithReview | null) => void;
  setShowReviewModal: (show: boolean) => void;
  renderStars: (rating: number, interactive?: boolean, onChange?: (rating: number) => void) => React.ReactElement;
}

export default function ProfileEventList({ 
  filteredEvents, 
  activeTab, 
  setSelectedEvent, 
  setShowReviewModal,
  renderStars 
}: ProfileEventListProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <FontAwesomeIcon
              icon={activeTab === 'upcoming' ? faBullseye :
                    activeTab === 'attended' ? faCalendarAlt : faCalendarAlt}
              className="text-2xl sm:text-4xl text-gray-400"
            />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            {activeTab === 'upcoming' ? 'Rezervasyonunuz yok' : 
             activeTab === 'attended' ? 'Henüz hiçbir etkinliğe katılmadınız' :
             'İptal edilen etkinlik yok'}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
            {activeTab === 'upcoming'
              ? 'Henüz hiçbir etkinliğe rezervasyon yapmadınız. Etkinlikleri keşfedin!'
              : activeTab === 'attended'
              ? 'Etkinliklere katılarak deneyimlerinizi zenginleştirin ve puanlayın.'
              : 'Henüz hiçbir etkinliği iptal etmediniz.'}
          </p>
          <Button 
            onClick={() => window.location.href = '/'} 
            size="lg" 
            className="shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <FontAwesomeIcon icon={faBullseye} className="mr-2" /> Etkinlikleri Keşfet
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {filteredEvents.map((event: Event | EventWithReview) => (
            <div key={event.id} className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-16 sm:w-20 text-center">
                    <div className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide">
                      {new Date(event.date).toLocaleDateString('tr-TR', { month: 'short' })}
                    </div>
                    <div className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-black text-gray-900">
                      {new Date(event.date).getDate()}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2 sm:mb-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="flex-shrink-0 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <span className="font-medium text-sm sm:text-base">{event.location}</span>
                  </div>
                  <div className="text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-2 mb-3">
                    {event.description}
                  </div>
                  
                  {/* Rating and Review Section for Attended Events */}
                  {activeTab === 'attended' && 'userRating' in event && (
                    <div className="space-y-3">
                      {event.userRating ? (
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">Puanınız:</span>
                            {renderStars(event.userRating)}
                          </div>
                          {event.averageRating && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-700">Genel Puan:</span>
                              {renderStars(event.averageRating)}
                              <span className="text-xs text-gray-500">({event.reviewCount} yorum)</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-gray-700">Henüz puanlamadınız</span>
                          <Button
                            onClick={() => {
                              setSelectedEvent(event as EventWithReview);
                              setShowReviewModal(true);
                            }}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <FontAwesomeIcon icon={faStar} className="mr-2" /> Puanla
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 