'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setEvents, setLoading, setError } from '@/store/eventsSlice';
import { getEvents } from '@/services/eventService';
import { getImagesForEvents } from '@/services/unsplashService';
import { categoriesApi } from '@/services/apiService';
import { LoadingSkeleton, Button, HeroSection, SearchSection, CategoryPills, EventsSection } from '@/components';
import { 
  faLaptopCode, 
  faMusic, 
  faBriefcase, 
  faPalette, 
  faHeartbeat, 
  faUtensils
} from '@fortawesome/free-solid-svg-icons';
import { Event, ApiCategory, ComponentCategory, EventsState } from '@/types';

export default function HomePage() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state: RootState) => state.events as EventsState);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'popularity' | 'price'>('date');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<ComponentCategory[]>([]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getAll();
        if (response.success) {
          // API'den gelen Category'leri ComponentCategory'ye dönüştür
          const componentCategories: ComponentCategory[] = response.data.map((cat: ApiCategory) => ({
            id: cat.id,
            name: cat.name,
            icon: cat.icon, // String olarak kalacak, component'te emoji olarak gösterilecek
            gradient: cat.gradient,
          }));
          setCategories(componentCategories);
        }
      } catch {
        console.warn('Failed to fetch categories, using fallback');
        // Fallback categories
        setCategories([
          { id: '1', name: 'Teknoloji', icon: faLaptopCode, gradient: 'from-blue-500 to-cyan-500' },
          { id: '2', name: 'Müzik', icon: faMusic, gradient: 'from-purple-500 to-pink-500' },
          { id: '3', name: 'İş', icon: faBriefcase, gradient: 'from-green-500 to-emerald-500' },
          { id: '4', name: 'Sanat', icon: faPalette, gradient: 'from-orange-500 to-red-500' },
          { id: '5', name: 'Sağlık', icon: faHeartbeat, gradient: 'from-teal-500 to-green-500' },
          { id: '6', name: 'Yemek', icon: faUtensils, gradient: 'from-yellow-500 to-orange-500' },
        ]);
      }
    };

    fetchCategories();
  }, []);

  // Initial data fetch - Redux ile
  useEffect(() => {
    const fetchEvents = async () => {
      dispatch(setLoading(true));
      try {
        const eventsData = await getEvents();
        
        // Unsplash'ten görselleri al
        const categories = [...new Set(eventsData.map((event: Event) => event.category))];
        const images = await getImagesForEvents(categories);
        
        // Etkinliklere görselleri ekle
        const eventsWithImages = eventsData.map((event: Event) => ({
          ...event,
          image: images[event.category] || '',
        }));
        
        dispatch(setEvents(eventsWithImages));
      } catch {
        dispatch(setError('Etkinlikler yüklenirken bir hata oluştu'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchEvents();
  }, [dispatch]);

  // Filter and sort events - Redux state'ini kullan
  useEffect(() => {
    const filterAndSortEvents = async () => {
      if (!events.length) return;

      let filtered = [...events];

      // Apply search filter
      if (searchTerm) {
        const lowercaseQuery = searchTerm.toLowerCase();
        filtered = filtered.filter((event: Event) => 
          event.title.toLowerCase().includes(lowercaseQuery) ||
          event.location.toLowerCase().includes(lowercaseQuery) ||
          event.description.toLowerCase().includes(lowercaseQuery)
        );
      }

      // Apply category filter
      if (selectedCategory) {
        filtered = filtered.filter((event: Event) => event.category === selectedCategory);
      }

      // Apply sorting
      switch (sortBy) {
        case 'date':
          filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          break;
        case 'popularity':
          filtered.sort((a, b) => b.attendees - a.attendees);
          break;
        case 'price':
          filtered.sort((a, b) => a.price - b.price);
          break;
      }

      setFilteredEvents(filtered);
    };

    filterAndSortEvents();
  }, [events, searchTerm, selectedCategory, sortBy]);

  if (loading) {
  return (
      <div className="min-h-screen">
        {/* Hero Section Skeleton */}
        <div className="relative h-[60vh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center animate-pulse">
              <div className="h-16 bg-white/20 rounded-2xl mb-6 max-w-2xl mx-auto"></div>
              <div className="h-8 bg-white/20 rounded-xl mb-8 max-w-xl mx-auto"></div>
              <div className="flex justify-center space-x-4">
                <div className="h-12 w-32 bg-white/20 rounded-xl"></div>
                <div className="h-12 w-32 bg-white/20 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-16">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
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

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <SearchSection 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
      />

      <CategoryPills 
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <EventsSection 
        filteredEvents={filteredEvents}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setSearchTerm={setSearchTerm}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}
