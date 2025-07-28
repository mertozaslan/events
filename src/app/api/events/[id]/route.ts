import { NextRequest, NextResponse } from 'next/server';
import { getEventById } from '@/lib/dummyData';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Add delay to simulate real API
    await new Promise(resolve => setTimeout(resolve, 300));

    const event = getEventById(id);

    if (!event) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not found',
          message: 'Etkinlik bulunamadı'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: event
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Etkinlik detayları yüklenirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    // Simulate updating an event
    const event = getEventById(id);

    if (!event) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not found',
          message: 'Etkinlik bulunamadı'
        },
        { status: 404 }
      );
    }

    const updatedEvent = {
      ...event,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    // Add delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      data: updatedEvent,
      message: 'Etkinlik başarıyla güncellendi'
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Etkinlik güncellenirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const event = getEventById(id);

    if (!event) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not found',
          message: 'Etkinlik bulunamadı'
        },
        { status: 404 }
      );
    }

    // Add delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 600));

    return NextResponse.json({
      success: true,
      message: 'Etkinlik başarıyla silindi'
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Etkinlik silinirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
} 