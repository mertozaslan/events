'use client';

import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faList, faBullseye, faSpinner } from '@fortawesome/free-solid-svg-icons';
import EventCard from '../features/EventCard';
import Button from '../ui/Button';

interface EventsSectionProps {
  filteredEvents: any[];
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
  const [displayedEvents, setDisplayedEvents] = useState<any[]>([]);
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
        <div className="hidden md:flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-3 rounded-xl transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FontAwesomeIcon icon={faThLarge} className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-3 rounded-xl transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FontAwesomeIcon icon={faList} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Events Grid/List */}
      {displayedEvents.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            {searchTerm || selectedCategory ? 'Arama sonucu bulunamadı' : 'Etkinlik bulunamadı'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
            {searchTerm || selectedCategory 
              ? 'Farklı anahtar kelimeler deneyebilir veya filtreleri temizleyebilirsiniz.' 
              : 'Yakında yeni etkinlikler eklenecek. Bizi takip etmeye devam edin!'
            }
          </p>
          {(searchTerm || selectedCategory) && (
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              size="lg"
              className="shadow-xl"
            >
              🎯 Tüm Etkinlikleri Görüntüle
            </Button>
          )}
        </div>
              ) : (
          <>
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr' 
                : 'space-y-6'
            }`}>
              {displayedEvents.map((event: any) => (
                <div key={event.id} className="h-full">
                  <EventCard event={event} />
                </div>
              ))}
            </div>


            {/* Intersection Observer Target for Infinite Scroll */}
            {hasMoreEvents && (
              <div 
                ref={observerRef}
                className="h-20 flex items-center justify-center mt-8"
              >
                {loading && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
                    <span>Yükleniyor...</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}
    </div>
  );
} 