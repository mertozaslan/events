import { Event } from '@/store/eventsSlice';

// Event Review Interface
export interface EventReview {
  id: string;
  eventId: string;
  userId: string;
  rating: number; // 1-5 arası
  comment: string;
  createdAt: string;
  userName: string;
  userAvatar?: string;
}

// Extended Event Interface with Reviews
export interface EventWithReviews extends Event {
  reviews: EventReview[];
  averageRating: number;
  reviewCount: number;
}

// User Event History Interface
export interface UserEventHistory {
  userId: string;
  eventId: string;
  status: 'attended' | 'cancelled' | 'upcoming';
  attendedAt?: string;
  rating?: number;
  review?: string;
  reviewId?: string;
}

// Dummy Events Data
export const dummyEvents: Event[] = [
  {
    id: '1',
    title: 'Teknoloji Konferansı 2024',
    date: '2024-12-27T10:00:00Z', // Geçmiş tarih
    location: 'İstanbul Kongre Merkezi',
    description: 'Yapay zeka ve gelecek teknolojileri hakkında kapsamlı bir konferans. Alanında uzman konuşmacılar ile geleceğin teknolojilerini keşfedin. Machine Learning, Blockchain, IoT ve daha fazlası hakkında detaylı sunumlar ve workshop\'lar.',
    image: '',
    category: 'Teknoloji',
    price: 150,
    capacity: 500,
    attendees: 320,
  },
  {
    id: '2',
    title: 'Jazz Gecesi - Özel Performans',
    date: '2025-04-12T20:00:00Z', // Geçmiş tarih
    location: 'Babylon',
    description: 'Eşsiz jazz performansları ile unutulmaz bir gece. Canlı müzik ve lezzetli içecekler eşliğinde. Dünya çapında tanınmış jazz sanatçıları ile birlikte, klasik ve modern jazz eserlerini dinleyin.',
    image: '',
    category: 'Müzik',
    price: 80,
    capacity: 200,
    attendees: 150,
  },
  {
    id: '3',
    title: 'Startup Networking & Pitch Night',
    date: '2025-02-15T18:00:00Z', // Geçmiş tarih
    location: 'Impact Hub İstanbul',
    description: 'Girişimciler için networking etkinliği. Yatırımcılar ve mentorlar ile tanışma fırsatı. Startup\'larınızı tanıtın, yatırımcılardan feedback alın ve potansiyel ortaklar bulun.',
    image: '',
    category: 'İş',
    price: 50,
    capacity: 100,
    attendees: 75,
  },
  {
    id: '4',
    title: 'Çağdaş Fotoğraf Sergisi',
    date: '2025-03-20T14:00:00Z', // Geçmiş tarih
    location: 'İstanbul Modern',
    description: 'Çağdaş Türk fotoğrafçılarının eserlerini sergileyen özel koleksiyon. Modern sanatın en güzel örneklerini görmek için kaçırılmayacak bir fırsat.',
    image: '',
    category: 'Sanat',
    price: 30,
    capacity: 300,
    attendees: 120,
  },
  {
    id: '5',
    title: 'Yoga & Meditasyon Workshop',
    date: '2025-08-25T09:00:00Z',
    location: 'Yoga Studio Kadıköy',
    description: 'Uzman eğitmenler eşliğinde yoga ve meditasyon workshop\'u. Zihinsel ve fiziksel sağlığınızı destekleyin, iç huzurunuzu bulun.',
    image: '',
    category: 'Sağlık',
    price: 60,
    capacity: 50,
    attendees: 35,
  },
  {
    id: '6',
    title: 'Uluslararası Gastronomi Festivali',
    date: '2025-08-30T12:00:00Z',
    location: 'Küçükçiftlik Park',
    description: 'Türkiye\'nin en büyük gastronomi festivali. Dünya mutfaklarından lezzetler, şef yarışmaları ve özel tadım etkinlikleri.',
    image: '',
    category: 'Yemek',
    price: 120,
    capacity: 1000,
    attendees: 750,
  },
  {
    id: '7',
    title: 'Rock Konseri - Underground Bands',
    date: '2025-09-05T21:00:00Z',
    location: 'Dorock XL',
    description: 'Türkiye\'nin en iyi underground rock grupları bir arada. Enerjik performanslar ve unutulmaz anlar.',
    image: '',
    category: 'Müzik',
    price: 45,
    capacity: 400,
    attendees: 280,
  },
  {
    id: '8',
    title: 'Dijital Pazarlama Zirvesi',
    date: '2025-09-10T09:00:00Z',
    location: 'Hilton İstanbul Bosphorus',
    description: 'Dijital pazarlama dünyasının önde gelen uzmanları ile geleceğin trendlerini keşfedin.',
    image: '',
    category: 'İş',
    price: 200,
    capacity: 300,
    attendees: 180,
  },
  {
    id: '9',
    title: 'Klasik Müzik Festivali',
    date: '2025-09-15T19:00:00Z',
    location: 'Lütfi Kırdar ICEC',
    description: 'İstanbul Filarmoni Orkestrası ile klasik müzik gecesi. Mozart, Beethoven ve Bach eserleri.',
    image: '',
    category: 'Müzik',
    price: 150,
    capacity: 800,
    attendees: 600,
  },
  {
    id: '10',
    title: 'Çağdaş Dans Performansı',
    date: '2025-09-20T20:00:00Z',
    location: 'Zorlu PSM',
    description: 'Modern dans ve performans sanatının en güzel örnekleri. Uluslararası dans grupları.',
    image: '',
    category: 'Sanat',
    price: 90,
    capacity: 500,
    attendees: 320,
  },
  {
    id: '11',
    title: 'Blockchain & Kripto Para Konferansı',
    date: '2025-09-25T10:00:00Z',
    location: 'Swissotel The Bosphorus',
    description: 'Blockchain teknolojisi ve kripto para dünyasından uzmanlar ile geleceğin finansını tartışın.',
    image: '',
    category: 'Teknoloji',
    price: 180,
    capacity: 250,
    attendees: 190,
  },
  {
    id: '12',
    title: 'Vegan Yemek Workshop',
    date: '2025-09-30T14:00:00Z',
    location: 'Vegan Kitchen Studio',
    description: 'Vegan yemek yapımı workshop\'u. Sağlıklı ve lezzetli vegan tarifler öğrenin.',
    image: '',
    category: 'Yemek',
    price: 75,
    capacity: 30,
    attendees: 25,
  },
  {
    id: '13',
    title: 'Pilates & Fitness Bootcamp',
    date: '2025-10-05T08:00:00Z',
    location: 'Fitness First Beşiktaş',
    description: 'Yoğun pilates ve fitness bootcamp\'i. Vücudunuzu şekillendirin ve enerjinizi artırın.',
    image: '',
    category: 'Sağlık',
    price: 100,
    capacity: 40,
    attendees: 35,
  },
  {
    id: '14',
    title: 'E-Ticaret Girişimcilik Semineri',
    date: '2025-10-10T13:00:00Z',
    location: 'Google Campus İstanbul',
    description: 'E-ticaret dünyasında başarılı olmanın sırları. Deneyimli girişimcilerden öğrenin.',
    image: '',
    category: 'İş',
    price: 120,
    capacity: 150,
    attendees: 110,
  },
  {
    id: '15',
    title: 'Jazz & Blues Gecesi',
    date: '2025-10-15T21:00:00Z',
    location: 'Nardis Jazz Club',
    description: 'Geleneksel jazz ve blues müziği. Canlı performanslar ve özel kokteyl menüsü.',
    image: '',
    category: 'Müzik',
    price: 60,
    capacity: 120,
    attendees: 95,
  },
  {
    id: '16',
    title: 'Sokak Sanatı Festivali',
    date: '2025-10-20T11:00:00Z',
    location: 'Karaköy Sanat Mahallesi',
    description: 'Sokak sanatının en güzel örnekleri. Graffiti sanatçıları canlı performansları.',
    image: '',
    category: 'Sanat',
    price: 40,
    capacity: 200,
    attendees: 150,
  },
  {
    id: '17',
    title: 'Yapay Zeka & Makine Öğrenmesi',
    date: '2025-10-25T09:00:00Z',
    location: 'Boğaziçi Üniversitesi',
    description: 'AI ve ML alanında uzman akademisyenler ile geleceğin teknolojilerini keşfedin.',
    image: '',
    category: 'Teknoloji',
    price: 160,
    capacity: 200,
    attendees: 140,
  },
  {
    id: '18',
    title: 'Akdeniz Mutfağı Workshop',
    date: '2025-10-30T15:00:00Z',
    location: 'Cooking Studio İstanbul',
    description: 'Akdeniz mutfağının en güzel tariflerini öğrenin. Zeytinyağlı yemekler ve mezeler.',
    image: '',
    category: 'Yemek',
    price: 85,
    capacity: 25,
    attendees: 20,
  },
  {
    id: '19',
    title: 'Mindfulness & Stres Yönetimi',
    date: '2025-11-05T10:00:00Z',
    location: 'Wellness Center',
    description: 'Mindfulness teknikleri ile stres yönetimi. Günlük hayatta huzur bulun.',
    image: '',
    category: 'Sağlık',
    price: 70,
    capacity: 35,
    attendees: 30,
  },
  {
    id: '20',
    title: 'Freelance & Remote Work Summit',
    date: '2025-11-10T11:00:00Z',
    location: 'Impact Hub İstanbul',
    description: 'Freelance çalışma ve uzaktan iş dünyası. Başarılı freelancer\'lardan deneyimler.',
    image: '',
    category: 'İş',
    price: 90,
    capacity: 100,
    attendees: 75,
  },
  {
    id: '21',
    title: 'Blockchain & Web3 Summit',
    date: '2025-11-15T09:00:00Z',
    location: 'Swissotel The Bosphorus',
    description: 'Blockchain teknolojileri ve Web3 ekosistemi hakkında kapsamlı bir zirve. NFT, DeFi, Metaverse konularında uzman görüşleri.',
    image: '',
    category: 'Teknoloji',
    price: 200,
    capacity: 300,
    attendees: 250,
  },
  {
    id: '22',
    title: 'Klasik Müzik Festivali',
    date: '2025-11-20T19:00:00Z',
    location: 'Lütfi Kırdar ICEC',
    description: 'Dünya çapında tanınmış orkestralar ve solistler ile klasik müzik festivali. Mozart, Beethoven ve diğer büyük bestecilerin eserleri.',
    image: '',
    category: 'Müzik',
    price: 120,
    capacity: 800,
    attendees: 650,
  },
  {
    id: '23',
    title: 'Dijital Pazarlama Konferansı',
    date: '2025-11-25T10:00:00Z',
    location: 'Hilton Istanbul Bosphorus',
    description: 'Dijital pazarlama trendleri, sosyal medya stratejileri ve growth hacking teknikleri hakkında kapsamlı konferans.',
    image: '',
    category: 'İş',
    price: 80,
    capacity: 400,
    attendees: 280,
  },
  {
    id: '24',
    title: 'Modern Sanat Bienali',
    date: '2025-12-01T11:00:00Z',
    location: 'Sakıp Sabancı Müzesi',
    description: 'Uluslararası modern sanat bienali. Çağdaş sanatın en güncel örneklerini görmek için eşsiz bir fırsat.',
    image: '',
    category: 'Sanat',
    price: 45,
    capacity: 500,
    attendees: 320,
  },
  {
    id: '25',
    title: 'Fitness & Wellness Expo',
    date: '2025-12-05T10:00:00Z',
    location: 'CNR Expo Center',
    description: 'Fitness ve wellness dünyasından en son trendler, ekipmanlar ve uzman görüşleri. Sağlıklı yaşam için her şey.',
    image: '',
    category: 'Sağlık',
    price: 40,
    capacity: 1000,
    attendees: 750,
  },
  {
    id: '26',
    title: 'Street Food Festival',
    date: '2025-12-10T12:00:00Z',
    location: 'Maltepe Sahil',
    description: 'Dünya çapında street food lezzetleri. Farklı kültürlerden sokak yemekleri ve özel tarifler.',
    image: '',
    category: 'Yemek',
    price: 25,
    capacity: 2000,
    attendees: 1800,
  },
];

// Dummy Event Reviews Data
export const dummyEventReviews: EventReview[] = [
  {
    id: 'review-1',
    eventId: '1',
    userId: 'user-1',
    rating: 5,
    comment: 'Harika bir konferanstı! Yapay zeka konusunda çok değerli bilgiler aldım. Konuşmacılar çok deneyimliydi.',
    createdAt: '2024-07-28T10:00:00Z',
    userName: 'Mert Özaslan',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'review-2',
    eventId: '1',
    userId: 'user-2',
    rating: 4,
    comment: 'Genel olarak iyiydi ama biraz daha pratik örnekler olsaydı daha iyi olurdu.',
    createdAt: '2024-07-28T14:30:00Z',
    userName: 'Ayşe Demir',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'review-3',
    eventId: '2',
    userId: 'user-1',
    rating: 5,
    comment: 'Muhteşem bir jazz gecesi! Performanslar gerçekten etkileyiciydi. Kesinlikle tekrar giderim.',
    createdAt: '2024-08-13T09:15:00Z',
    userName: 'Mert Özaslan',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'review-4',
    eventId: '3',
    userId: 'user-1',
    rating: 4,
    comment: 'Networking için çok faydalı bir etkinlik. Birkaç potansiyel yatırımcı ile tanıştım.',
    createdAt: '2024-08-16T11:20:00Z',
    userName: 'Mert Özaslan',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'review-5',
    eventId: '4',
    userId: 'user-1',
    rating: 3,
    comment: 'Sergi güzel ama biraz küçüktü. Daha fazla eser olsaydı daha iyi olurdu.',
    createdAt: '2024-08-21T16:45:00Z',
    userName: 'Mert Özaslan',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
];

// Dummy User Event History
export const dummyUserEventHistory: UserEventHistory[] = [
  {
    userId: 'user-1',
    eventId: '1',
    status: 'attended',
    attendedAt: '2024-07-27T10:00:00Z',
    rating: 5,
    review: 'Harika bir konferanstı! Yapay zeka konusunda çok değerli bilgiler aldım.',
    reviewId: 'review-1',
  },
  {
    userId: 'user-1',
    eventId: '2',
    status: 'attended',
    attendedAt: '2024-08-12T20:00:00Z',
    rating: 5,
    review: 'Muhteşem bir jazz gecesi! Performanslar gerçekten etkileyiciydi.',
    reviewId: 'review-3',
  },
  {
    userId: 'user-1',
    eventId: '3',
    status: 'attended',
    attendedAt: '2024-08-15T18:00:00Z',
    rating: 4,
    review: 'Networking için çok faydalı bir etkinlik. Birkaç potansiyel yatırımcı ile tanıştım.',
    reviewId: 'review-4',
  },
  {
    userId: 'user-1',
    eventId: '4',
    status: 'attended',
    attendedAt: '2024-08-20T14:00:00Z',
    rating: 3,
    review: 'Sergi güzel ama biraz küçüktü. Daha fazla eser olsaydı daha iyi olurdu.',
    reviewId: 'review-5',
  },
  {
    userId: 'user-1',
    eventId: '5',
    status: 'upcoming',
  },
  {
    userId: 'user-1',
    eventId: '6',
    status: 'upcoming',
  },
  {
    userId: 'user-1',
    eventId: '7',
    status: 'cancelled',
  },
];

// Dummy User Profile Data
export interface UserProfile {
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

export const dummyUserProfile: UserProfile = {
  id: 'user-1',
  name: 'Mert Özaslan',
  email: 'mert@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  bio: 'Teknoloji tutkunu ve etkinlik sever. Yeni deneyimler keşfetmeyi ve insanlarla tanışmayı seviyorum.',
  location: 'Ankara, Türkiye',
  interests: ['Teknoloji', 'Müzik', 'Sanat', 'İş'],
  stats: {
    totalEvents: 12,
    attendedEvents: 4,
    cancelledEvents: 1,
    favoriteCategories: ['Teknoloji', 'Müzik'],
    averageRating: 4.25,
    totalReviews: 4,
  },
  preferences: {
    notifications: true,
    newsletter: true,
    language: 'tr',
  },
};

// Dummy Categories Data
export interface Category {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  description: string;
  eventCount: number;
}

export const dummyCategories: Category[] = [
  {
    id: '1',
    name: 'Teknoloji',
    icon: '💻',
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Teknoloji konferansları, hackathon\'lar ve workshop\'lar',
    eventCount: 2,
  },
  {
    id: '2',
    name: 'Müzik',
    icon: '🎵',
    gradient: 'from-purple-500 to-pink-500',
    description: 'Konserler, müzik festivalleri ve performanslar',
    eventCount: 2,
  },
  {
    id: '3',
    name: 'İş',
    icon: '💼',
    gradient: 'from-green-500 to-emerald-500',
    description: 'Networking etkinlikleri ve iş konferansları',
    eventCount: 2,
  },
  {
    id: '4',
    name: 'Sanat',
    icon: '🎨',
    gradient: 'from-orange-500 to-red-500',
    description: 'Sergiler, bienaller ve sanat etkinlikleri',
    eventCount: 2,
  },
  {
    id: '5',
    name: 'Sağlık',
    icon: '🏥',
    gradient: 'from-teal-500 to-green-500',
    description: 'Wellness, fitness ve sağlık etkinlikleri',
    eventCount: 2,
  },
  {
    id: '6',
    name: 'Yemek',
    icon: '🍽️',
    gradient: 'from-yellow-500 to-orange-500',
    description: 'Gastronomi festivalleri ve yemek etkinlikleri',
    eventCount: 2,
  },
];

// Helper functions
export const getEventById = (id: string): Event | null => {
  return dummyEvents.find(event => event.id === id) || null;
};

export const getEventsByCategory = (category: string): Event[] => {
  return dummyEvents.filter(event => event.category === category);
};

export const searchEvents = (query: string): Event[] => {
  const lowercaseQuery = query.toLowerCase();
  return dummyEvents.filter(event => 
    event.title.toLowerCase().includes(lowercaseQuery) ||
    event.location.toLowerCase().includes(lowercaseQuery) ||
    event.description.toLowerCase().includes(lowercaseQuery)
  );
};

export const getUpcomingEvents = (): Event[] => {
  const now = new Date();
  return dummyEvents
    .filter(event => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getPopularEvents = (): Event[] => {
  return dummyEvents
    .sort((a, b) => b.attendees - a.attendees)
    .slice(0, 6);
};

// New helper functions for reviews and history
export const getEventReviews = (eventId: string): EventReview[] => {
  return dummyEventReviews.filter(review => review.eventId === eventId);
};

export const getUserEventHistory = (userId: string): UserEventHistory[] => {
  return dummyUserEventHistory.filter(history => history.userId === userId);
};

export const getAttendedEvents = (): Event[] => {
  const attendedEventIds = dummyUserEventHistory
    .filter(history => history.status === 'attended')
    .map(history => history.eventId);
  
  return dummyEvents.filter(event => attendedEventIds.includes(event.id));
};

export const getEventWithReviews = (eventId: string): EventWithReviews | null => {
  const event = getEventById(eventId);
  if (!event) return null;

  const reviews = getEventReviews(eventId);
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return {
    ...event,
    reviews,
    averageRating: Math.round(averageRating * 10) / 10,
    reviewCount: reviews.length,
  };
};

export const addEventReview = (eventId: string, userId: string, rating: number, comment: string): EventReview => {
  const newReview: EventReview = {
    id: `review-${Date.now()}`,
    eventId,
    userId,
    rating,
    comment,
    createdAt: new Date().toISOString(),
    userName: dummyUserProfile.name,
    userAvatar: dummyUserProfile.avatar,
  };

  dummyEventReviews.push(newReview);
  return newReview;
}; 