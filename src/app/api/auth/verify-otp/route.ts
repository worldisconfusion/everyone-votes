import { NextRequest, NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDatabase';
import { generateToken, validateMobile } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { mobile, otp } = await request.json();

    // Validate mobile number
    if (!validateMobile(mobile)) {
      return NextResponse.json(
        { error: 'Invalid mobile number format' },
        { status: 400 }
      );
    }

    // Verify OTP using mock database
    const otpResult = await mockDB.verifyOTP(mobile, otp);

    if (!otpResult.success) {
      return NextResponse.json(
        { error: otpResult.message },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await mockDB.findUserByMobile(mobile);
    
    if (user) {
      // Existing user - login
      const token = generateToken({
        userId: user.id,
        mobile: user.mobile
      });

      return NextResponse.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          mobile: user.mobile,
          fullName: user.name,
          constituency: user.constituency,
          isVerified: true,
          hasVoted: user.hasVoted
        },
        isNewUser: false
      });
    } else {
      // New user - return success but indicate registration needed
      return NextResponse.json({
        message: 'OTP verified successfully',
        isNewUser: true,
        mobile
      });
    }

  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
