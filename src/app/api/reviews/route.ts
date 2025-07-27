import { NextRequest, NextResponse } from 'next/server';
import { dummyEventReviews, getEventReviews, addEventReview } from '@/lib/dummyData';

// Simulated delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  try {
    await delay(300);

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const reviews = getEventReviews(eventId);

    return NextResponse.json({
      success: true,
      data: reviews,
      message: 'Event reviews retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await delay(500);
    const body = await request.json();

    const { eventId, userId, rating, comment } = body;

    if (!eventId || !userId || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const newReview = addEventReview(eventId, userId, rating, comment);

    return NextResponse.json({
      success: true,
      data: newReview,
      message: 'Review added successfully'
    });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add review' },
      { status: 500 }
    );
  }
} 