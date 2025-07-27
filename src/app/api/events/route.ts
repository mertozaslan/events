import { NextRequest, NextResponse } from 'next/server';
import { dummyEvents, searchEvents, getEventsByCategory, getUpcomingEvents, getPopularEvents } from '@/lib/dummyData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'date';
    const limit = searchParams.get('limit');
    const type = searchParams.get('type'); // upcoming, popular, all

    // Varsayılan olarak sadece gelecek etkinlikleri getir
    let events = getUpcomingEvents();

    // Filter by search query
    if (search) {
      const searchResults = searchEvents(search);
      // Arama sonuçlarını da gelecek etkinliklerle filtrele
      events = searchResults.filter(event => new Date(event.date) > new Date());
    }

    // Filter by category
    if (category && category !== 'all') {
      const categoryResults = getEventsByCategory(category);
      // Kategori sonuçlarını da gelecek etkinliklerle filtrele
      events = categoryResults.filter(event => new Date(event.date) > new Date());
    }

    // Filter by type
    if (type === 'all') {
      events = [...dummyEvents]; // Tüm etkinlikler (geçmiş + gelecek)
    } else if (type === 'popular') {
      events = getPopularEvents();
    }
    // type === 'upcoming' varsayılan davranış (zaten yukarıda set edildi)

    // Sort events
    switch (sort) {
      case 'date':
        events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'popularity':
        events.sort((a, b) => b.attendees - a.attendees);
        break;
      case 'price':
        events.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        events.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        events.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    // Apply limit
    if (limit) {
      events = events.slice(0, parseInt(limit));
    }

    // Add delay to simulate real API
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      data: events,
      meta: {
        total: events.length,
        search,
        category,
        sort,
        limit: limit ? parseInt(limit) : null,
        type,
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Etkinlikler yüklenirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Simulate creating a new event
    const newEvent = {
      id: (dummyEvents.length + 1).toString(),
      ...body,
      attendees: 0,
      createdAt: new Date().toISOString(),
    };

    // Add delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      data: newEvent,
      message: 'Etkinlik başarıyla oluşturuldu'
    }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Etkinlik oluşturulurken bir hata oluştu'
      },
      { status: 500 }
    );
  }
} 