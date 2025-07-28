'use client';

import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faList, faSpinner } from '@fortawesome/free-solid-svg-icons';
import EventCard from '../features/EventCard';
import Button from '../ui/Button';
import { Event } from '@/types';

interface EventsSectionProps {
  filteredEvents: Event[];
  searchTerm: string;
  selectedCategory: string;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
}

export default function EventsSection({
  filteredEvents,
  searchTerm,
  selectedCategory,
  viewMode,
  setViewMode,
  setSearchTerm,
  setSelectedCategory
}: EventsSectionProps) {
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const eventsPerPage = 6;

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    setDisplayedEvents(filteredEvents.slice(0, eventsPerPage));
  }, [filteredEvents]);

  // Load more events
  const loadMoreEvents = useCallback(() => {
    if (loading) return;
    
    setLoading(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = 0;
      const endIndex = nextPage * eventsPerPage;
      const newEvents = filteredEvents.slice(startIndex, endIndex);
      
      setDisplayedEvents(newEvents);
      setCurrentPage(nextPage);
      setLoading(false);
    }, 500); // Simulate loading delay
  }, [currentPage, filteredEvents, loading]);

  // Check if there are more events to load
  const hasMoreEvents = displayedEvents.length < filteredEvents.length;

  // Intersection Observer for infinite scroll
  const observerRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    
    if (node) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMoreEvents) {
            loadMoreEvents();
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(node);
      return () => observer.disconnect();
    }
  }, [loading, hasMoreEvents, loadMoreEvents]);

  return (
    <div id="events-section" className="max-w-7xl mx-auto px-4 pb-24">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-black text-gray-900 mb-3">
            {searchTerm || selectedCategory ? (
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Arama Sonuçları
              </span>
            ) : (
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Premium Etkinlikler
              </span>
            )}
          </h2>
          <p className="text-gray-600 text-lg">
            <span className="font-bold text-blue-600">{filteredEvents.length}</span> etkinlik bulundu
            {displayedEvents.length < filteredEvents.length && (
              <span className="text-sm text-gray-500 ml-2">
                ({displayedEvents.length} gösteriliyor)
              </span>
            )}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setViewMode('grid')}
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="sm"
            className="flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faThLarge} className="w-4 h-4" />
            <span>Grid</span>
          </Button>
          <Button
            onClick={() => setViewMode('list')}
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            className="flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faList} className="w-4 h-4" />
            <span>Liste</span>
          </Button>
        </div>
      </div>

      {/* Events Grid */}
      {displayedEvents.length > 0 ? (
        <>
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {displayedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreEvents && (
            <div className="text-center mt-12">
              <Button
                onClick={loadMoreEvents}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 mr-2 animate-spin" />
                    Yükleniyor...
                  </>
                ) : (
                  'Daha Fazla Göster'
                )}
              </Button>
            </div>
          )}

          {/* Intersection Observer Target */}
          {hasMoreEvents && (
            <div ref={observerRef} className="h-10" />
          )}
        </>
      ) : (
        /* No Results State */
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faList} className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Etkinlik Bulunamadı</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {searchTerm || selectedCategory 
              ? 'Arama kriterlerinize uygun etkinlik bulunamadı. Farklı anahtar kelimeler deneyebilir veya filtreleri temizleyebilirsiniz.'
              : 'Şu anda gösterilecek etkinlik bulunmuyor.'
            }
          </p>
          {(searchTerm || selectedCategory) && (
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Filtreleri Temizle
            </Button>
          )}
        </div>
      )}
    </div>
  );
} 