import { NextRequest, NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDatabase';
import { generateToken, validateAadhar, validateVoterID, validateMobile } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { 
      mobile, 
      aadharNumber, 
      voterIdNumber, 
      fullName, 
      dateOfBirth, 
      constituency 
    } = await request.json();

    // Validate all inputs
    if (!validateMobile(mobile)) {
      return NextResponse.json(
        { error: 'Invalid mobile number format' },
        { status: 400 }
      );
    }

    if (!validateAadhar(aadharNumber)) {
      return NextResponse.json(
        { error: 'Invalid Aadhar number format (12 digits required)' },
        { status: 400 }
      );
    }

    if (!validateVoterID(voterIdNumber)) {
      return NextResponse.json(
        { error: 'Invalid Voter ID format (3 letters + 7 digits required)' },
        { status: 400 }
      );
    }

    if (!fullName || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: 'Full name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!dateOfBirth || new Date(dateOfBirth) >= new Date()) {
      return NextResponse.json(
        { error: 'Invalid date of birth' },
        { status: 400 }
      );
    }

    if (!constituency || constituency.trim().length < 2) {
      return NextResponse.json(
        { error: 'Constituency is required' },
        { status: 400 }
      );
    }

    // Create new user with enhanced validation
    try {
      const user = await mockDB.createUser({
        mobile,
        aadharNumber,
        voterID: voterIdNumber,
        name: fullName.trim(),
        dateOfBirth: dateOfBirth,
        constituency: constituency.trim(),
        hasVoted: false
      });

      // Generate token
      const token = generateToken({
        userId: user.id,
        mobile: user.mobile
      });

      return NextResponse.json({
        message: 'Registration successful',
        token,
        user: {
          id: user.id,
          mobile: user.mobile,
          fullName: user.name,
          constituency: user.constituency,
          isVerified: true,
          hasVoted: user.hasVoted
        }
      });
    } catch (registrationError: any) {
      return NextResponse.json(
        { error: registrationError.message || 'Registration failed' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
