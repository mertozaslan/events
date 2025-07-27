import { Event } from '@/store/eventsSlice';
import { eventsApi, ApiResponse } from './apiService';

// Fallback to dummy data if API fails
import { dummyEvents, getEventById as getDummyEventById } from '@/lib/dummyData';

export const getEvents = async (): Promise<Event[]> => {
  try {
    const response: ApiResponse<Event[]> = await eventsApi.getAll();
    
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Etkinlikler yüklenemedi');
    }
  } catch (error) {
    console.warn('API failed, using dummy data:', error);
    // Fallback to dummy data - sadece gelecek etkinlikler
    const now = new Date();
    return dummyEvents
      .filter(event => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
};

export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    const response: ApiResponse<Event> = await eventsApi.getById(id);
    
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Etkinlik bulunamadı');
    }
  } catch (error) {
    console.warn('API failed, using dummy data:', error);
    // Fallback to dummy data
    return getDummyEventById(id);
  }
};

export const searchEvents = async (query: string): Promise<Event[]> => {
  try {
    const response: ApiResponse<Event[]> = await eventsApi.getAll({ search: query });
    
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Arama yapılamadı');
    }
  } catch (error) {
    console.warn('API failed, using dummy data:', error);
    // Fallback to dummy data with search - sadece gelecek etkinlikler
    const now = new Date();
    const lowercaseQuery = query.toLowerCase();
    return dummyEvents
      .filter(event => 
        (event.title.toLowerCase().includes(lowercaseQuery) ||
         event.location.toLowerCase().includes(lowercaseQuery) ||
         event.description.toLowerCase().includes(lowercaseQuery)) &&
        new Date(event.date) > now
      );
  }
};

export const getEventsByCategory = async (category: string): Promise<Event[]> => {
  try {
    const response: ApiResponse<Event[]> = await eventsApi.getAll({ category });
    
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Kategori etkinlikleri yüklenemedi');
    }
  } catch (error) {
    console.warn('API failed, using dummy data:', error);
    // Fallback to dummy data - sadece gelecek etkinlikler
    const now = new Date();
    return dummyEvents
      .filter(event => event.category === category && new Date(event.date) > now);
  }
};

export const getUpcomingEvents = async (): Promise<Event[]> => {
  try {
    const response: ApiResponse<Event[]> = await eventsApi.getAll({ type: 'upcoming' });
    
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Yaklaşan etkinlikler yüklenemedi');
    }
  } catch (error) {
    console.warn('API failed, using dummy data:', error);
    // Fallback to dummy data
    const now = new Date();
    return dummyEvents
      .filter(event => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
};

export const getPopularEvents = async (): Promise<Event[]> => {
  try {
    const response: ApiResponse<Event[]> = await eventsApi.getAll({ type: 'popular' });
    
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Popüler etkinlikler yüklenemedi');
    }
  } catch (error) {
    console.warn('API failed, using dummy data:', error);
    // Fallback to dummy data
    return dummyEvents
      .sort((a, b) => b.attendees - a.attendees)
      .slice(0, 6);
  }
};

export const createEvent = async (eventData: Partial<Event>): Promise<Event> => {
  try {
    const response: ApiResponse<Event> = await eventsApi.create(eventData);
    
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Etkinlik oluşturulamadı');
    }
  } catch (error) {
    console.error('Failed to create event:', error);
    throw error;
  }
};

export const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event> => {
  try {
    const response: ApiResponse<Event> = await eventsApi.update(id, eventData);
    
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Etkinlik güncellenemedi');
    }
  } catch (error) {
    console.error('Failed to update event:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string): Promise<void> => {
  try {
    const response: ApiResponse<any> = await eventsApi.delete(id);
    
    if (!response.success) {
      throw new Error(response.message || 'Etkinlik silinemedi');
    }
  } catch (error) {
    console.error('Failed to delete event:', error);
    throw error;
  }
}; 