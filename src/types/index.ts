import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface Event {
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

export interface ApiCategory {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  description: string;
  eventCount: number;
}

export interface ComponentCategory {
  id: string;
  name: string;
  icon: string | IconProp;
  gradient: string;
}

export interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
} 