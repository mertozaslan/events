import { NextRequest, NextResponse } from 'next/server';
import { dummyUserProfile, dummyUserEventHistory, getAttendedEvents, getEventWithReviews } from '@/lib/dummyData';

// Simulated delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  try {
    await delay(500); // Simulate network delay

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'history') {
      // Return user event history
      return NextResponse.json({
        success: true,
        data: dummyUserEventHistory,
        message: 'User event history retrieved successfully'
      });
    }

    if (type === 'attended') {
      // Return attended events with reviews
      const attendedEvents = getAttendedEvents();
      const eventsWithReviews = attendedEvents.map(event => {
        const eventWithReviews = getEventWithReviews(event.id);
        const userHistory = dummyUserEventHistory.find(h => h.eventId === event.id);
        
        return {
          ...event,
          userRating: userHistory?.rating,
          userReview: userHistory?.review,
          userReviewId: userHistory?.reviewId,
          attendedAt: userHistory?.attendedAt,
          ...eventWithReviews
        };
      });

      return NextResponse.json({
        success: true,
        data: eventsWithReviews,
        message: 'Attended events retrieved successfully'
      });
    }

    // Default: return user profile
    return NextResponse.json({
      success: true,
      data: dummyUserProfile,
      message: 'User profile retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profile data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await delay(300);
    const body = await request.json();

    // Update user profile logic here
    console.log('Updating user profile:', body);

    return NextResponse.json({
      success: true,
      data: { ...dummyUserProfile, ...body },
      message: 'User profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 