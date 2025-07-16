import { NextRequest, NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDatabase';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
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

    const { candidateId, isNOTA } = await request.json();

    // COMPREHENSIVE VERIFICATION AND VALIDATION
    const validation = await mockDB.validateVoteRequest(decoded.userId, candidateId, isNOTA);
    
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.message },
        { status: 400 }
      );
    }

    const user = validation.user!;

    // Create vote record with enhanced validation
    try {
      await mockDB.createVote({
        userId: user.id,
        candidateId: isNOTA ? null : candidateId,
        constituency: user.constituency,
        isNOTA: Boolean(isNOTA)
      });
    } catch (voteError: any) {
      return NextResponse.json(
        { error: voteError.message || 'Failed to record vote' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Vote recorded successfully',
      votedFor: isNOTA ? 'NOTA' : 'Candidate',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Vote submission error:', error);
    return NextResponse.json(
      { error: 'Failed to record vote' },
      { status: 500 }
    );
  }
}
