'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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

interface UserEvents {
  attending: string[];
  cancelled: string[];
}

interface ProfileCalendarProps {
  events: Event[];
  userEvents: UserEvents;
  attendedEvents: EventWithReview[];
}

export default function ProfileCalendar({ events, userEvents, attendedEvents }: ProfileCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div>
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {currentDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
          </span>
        </h2>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="border-gray-300 hover:border-blue-500 text-xs sm:text-sm px-2 sm:px-3"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-1" /> Önceki
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
            className="border-gray-300 hover:border-blue-500 text-xs sm:text-sm px-2 sm:px-3"
          >
            Bugün
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="border-gray-300 hover:border-blue-500 text-xs sm:text-sm px-2 sm:px-3"
          >
            Sonraki <FontAwesomeIcon icon={faChevronRight} className="ml-1" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="grid grid-cols-7 gap-px bg-gray-200 border-b border-gray-200">
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day) => (
            <div key={day} className="text-center py-2 sm:py-4 text-xs sm:text-sm font-bold text-gray-600 bg-white">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {Array.from({ length: 35 }).map((_, i) => {
            const dayNumber = i + 1;
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            
            // Bu gün için etkinlikleri bul
            const dayEvents = events.filter((event: Event) => {
              const eventDate = new Date(event.date);
              return eventDate.getDate() === dayNumber && 
                     eventDate.getMonth() === currentMonth && 
                     eventDate.getFullYear() === currentYear &&
                     (userEvents.attending.includes(event.id) || userEvents.cancelled.includes(event.id));
            });

            // Attended events'i de kontrol et
            const attendedDayEvents = attendedEvents.filter((event: EventWithReview) => {
              const eventDate = new Date(event.date);
              return eventDate.getDate() === dayNumber && 
                     eventDate.getMonth() === currentMonth && 
                     eventDate.getFullYear() === currentYear;
            });

            const attendingEvents = dayEvents.filter((event: Event) => 
              userEvents.attending.includes(event.id)
            );
            const cancelledEvents = dayEvents.filter((event: Event) => 
              userEvents.cancelled.includes(event.id)
            );
            const attendedEventsForDay = attendedDayEvents;

            return (
              <div key={i} className="aspect-square bg-white p-1 sm:p-2 hover:bg-gray-50 transition-colors duration-200 min-h-[60px] sm:min-h-[80px]">
                <div className="text-xs sm:text-sm text-gray-400 font-medium mb-1">{dayNumber}</div>
                
                {/* Etkinlik göstergeleri */}
                <div className="space-y-1">
                  {attendingEvents.slice(0, 2).map((event: Event) => (
                    <div key={event.id} className="w-full h-1 bg-green-500 rounded-full"></div>
                  ))}
                  {cancelledEvents.slice(0, 2).map((event: Event) => (
                    <div key={event.id} className="w-full h-1 bg-red-500 rounded-full"></div>
                  ))}
                  {attendedEventsForDay.slice(0, 2).map((event: EventWithReview) => (
                    <div key={event.id} className="w-full h-1 bg-blue-500 rounded-full"></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 