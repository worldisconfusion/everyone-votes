import { NextRequest, NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDatabase';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { employeeId, password } = await request.json();

    if (!employeeId || !password) {
      return NextResponse.json(
        { success: false, message: 'Employee ID and password are required' },
        { status: 400 }
      );
    }

    const officer = await mockDB.findOfficerByEmployeeId(employeeId);
    
    if (!officer) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = password === officer.password;
    
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { 
        userId: officer.id,
        mobile: officer.employeeId, // Using employeeId as identifier
        isVotingOfficer: true,
        officerId: officer.id,
        employeeId: officer.employeeId,
        role: officer.role 
      },
      'everyone_votes_demo_secret_key_2024_careeco_assignment',
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      success: true,
      token,
      officer: {
        id: officer.id,
        name: officer.name,
        employeeId: officer.employeeId,
        constituency: officer.constituency,
        role: officer.role
      }
    });

  } catch (error) {
    console.error('Officer login error:', error);
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
}