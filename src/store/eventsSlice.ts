import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Event {
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
}

export interface EventsState {
  events: Event[];
  userEvents: {
    attending: string[];
    cancelled: string[];
  };
  loading: boolean;
  error: string | null;
}

// localStorage'dan userEvents'i yükle
const loadUserEventsFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('userEvents');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load userEvents from localStorage:', error);
    }
  }
  return {
    attending: [],
    cancelled: [],
  };
};

const initialState: EventsState = {
  events: [],
  userEvents: loadUserEventsFromStorage(),
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    attendEvent: (state, action: PayloadAction<string>) => {
      const eventId = action.payload;
      if (!state.userEvents.attending.includes(eventId)) {
        state.userEvents.attending.push(eventId);
      }
      // Eğer iptal edilmişse, iptal listesinden çıkar
      state.userEvents.cancelled = state.userEvents.cancelled.filter(id => id !== eventId);
      
      // localStorage'a kaydet
      if (typeof window !== 'undefined') {
        localStorage.setItem('userEvents', JSON.stringify(state.userEvents));
      }
    },
    cancelEvent: (state, action: PayloadAction<string>) => {
      const eventId = action.payload;
      state.userEvents.attending = state.userEvents.attending.filter(id => id !== eventId);
      if (!state.userEvents.cancelled.includes(eventId)) {
        state.userEvents.cancelled.push(eventId);
      }
      
      // localStorage'a kaydet
      if (typeof window !== 'undefined') {
        localStorage.setItem('userEvents', JSON.stringify(state.userEvents));
      }
    },
  },
});

export const { setEvents, setLoading, setError, attendEvent, cancelEvent } = eventsSlice.actions;
export default eventsSlice.reducer; 