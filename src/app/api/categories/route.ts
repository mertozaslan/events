import { NextResponse } from 'next/server';
import { dummyCategories } from '@/lib/dummyData';

export async function GET() {
  try {
    // Add delay to simulate real API
    await new Promise(resolve => setTimeout(resolve, 200));

    return NextResponse.json({
      success: true,
      data: dummyCategories
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Kategoriler yüklenirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
} 