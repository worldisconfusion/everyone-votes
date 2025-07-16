import { NextRequest, NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDatabase';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get auth token from header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get constituency from query params
    const { searchParams } = new URL(request.url);
    const constituency = searchParams.get('constituency');

    if (!constituency) {
      return NextResponse.json(
        { error: 'Constituency is required' },
        { status: 400 }
      );
    }

    // Get candidates for the constituency using mock database
    const candidates = await mockDB.getCandidatesByConstituency(constituency);

    // Format candidates for frontend
    const formattedCandidates = candidates.map(candidate => ({
      _id: candidate.id,
      name: candidate.name,
      party: candidate.party,
      symbol: candidate.photoUrl, // Using photoUrl as symbol for now
      description: candidate.description
    }));

    return NextResponse.json({
      candidates: formattedCandidates,
      constituency
    });

  } catch (error) {
    console.error('Get candidates error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch candidates' },
      { status: 500 }
    );
  }
}
