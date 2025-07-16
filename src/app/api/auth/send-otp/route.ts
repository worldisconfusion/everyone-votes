import { NextRequest, NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDatabase';

export async function POST(request: NextRequest) {
  try {
    const { mobile } = await request.json();

    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, message: 'Invalid mobile number' },
        { status: 400 }
      );
    }

    const result = await mockDB.sendOTP(mobile);

    return NextResponse.json({
      success: true,
      message: result.message,
      otp: result.otp,
      expiresIn: 300
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}