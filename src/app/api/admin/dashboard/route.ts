import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User, Vote, VotingOfficer } from '@/models';
import { verifyToken } from '@/lib/auth';
import { mockDB } from '@/lib/mockDatabase';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
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
    if (!decoded || !decoded.isVotingOfficer) {
      return NextResponse.json(
        { error: 'Access denied. Voting officer access required.' },
        { status: 403 }
      );
    }

    // Get voting officer details from mock database
    const officer = await mockDB.findOfficerByEmployeeId(decoded.employeeId || decoded.mobile);
    if (!officer) {
      return NextResponse.json(
        { error: 'Voting officer not found' },
        { status: 404 }
      );
    }

    const constituency = officer.constituency;

    // Get statistics using mock database
    const dashboardStats = await mockDB.getVotingStats();

    // Filter stats for the officer's constituency (if not admin)
    let constituencyStats = dashboardStats.constituencyBreakdown[constituency] || {
      registered: 0,
      voted: 0,
      pending: 0
    };

    // If admin (constituency = 'All'), show total stats
    if (constituency === 'All') {
      constituencyStats = {
        registered: dashboardStats.totalRegistered,
        voted: dashboardStats.totalVoted,
        pending: dashboardStats.totalPending
      };
    }

    // Get vote distribution for the constituency
    const voteDistribution = dashboardStats.voteDistribution.candidates
      .filter((candidate: { constituency: string }) => constituency === 'All' || candidate.constituency === constituency)
      .map((candidate: { id: string; name: string; party: string; votes: number }) => ({
        candidateId: candidate.id,
        candidateName: candidate.name,
        candidateParty: candidate.party,
        votes: candidate.votes,
        isNOTA: false
      }));

    // Add NOTA votes
    if (dashboardStats.voteDistribution.nota > 0) {
      voteDistribution.push({
        candidateId: 'NOTA',
        candidateName: 'NOTA',
        candidateParty: 'None',
        votes: dashboardStats.voteDistribution.nota,
        isNOTA: true
      });
    }

    // Get recent activity
    const recentActivity = dashboardStats.recentActivity
      .filter((activity: { constituency: string }) => constituency === 'All' || activity.constituency === constituency)
      .map((activity: { voterName: string; candidateName: string; timestamp: Date }) => ({
        voterName: activity.voterName,
        candidateName: activity.candidateName,
        timestamp: activity.timestamp.toISOString(),
        isNOTA: activity.candidateName === 'NOTA'
      }));

    return NextResponse.json({
      constituency,
      statistics: {
        totalRegistered: constituencyStats.registered,
        totalVoted: constituencyStats.voted,
        totalPending: constituencyStats.pending,
        turnoutPercentage: constituencyStats.registered > 0 ? ((constituencyStats.voted / constituencyStats.registered) * 100).toFixed(2) : '0.00'
      },
      voteDistribution,
      recentActivity
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
