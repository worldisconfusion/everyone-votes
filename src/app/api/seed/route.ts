import { NextRequest, NextResponse } from 'next/server';
import seedDatabase from '@/lib/seedDatabase';

export async function POST(request: NextRequest) {
  try {
    // Allow seeding in demo mode (no environment check needed)
    console.log('Seeding mock database for demo...');

    const result = await seedDatabase();
    
    return NextResponse.json({
      message: 'Database seeded successfully',
      data: result
    });

  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
