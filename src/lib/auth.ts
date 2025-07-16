import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Using a hardcoded secret for demo purposes (no environment variables needed)
const JWT_SECRET = 'everyone_votes_demo_secret_key_2024_careeco_assignment';

export interface TokenPayload {
  userId: string;
  mobile: string;
  isVotingOfficer?: boolean;
  employeeId?: string;
  role?: string;
  officerId?: string;
}

// Generate JWT token
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

// Verify JWT token
export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Compare password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate OTP
export function generateOTP(): string {
  const otpLength = 6; // Fixed length for demo
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < otpLength; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  
  return otp;
}

// Calculate OTP expiry time
export function getOTPExpiry(): Date {
  const expiryTime = 300000; // 5 minutes (300000ms)
  return new Date(Date.now() + expiryTime);
}

// Validate Aadhar number
export function validateAadhar(aadhar: string): boolean {
  return /^\d{12}$/.test(aadhar);
}

// Validate Voter ID
export function validateVoterID(voterID: string): boolean {
  return /^[A-Z]{3}[0-9]{7}$/.test(voterID);
}

// Validate Mobile number
export function validateMobile(mobile: string): boolean {
  return /^[6-9]\d{9}$/.test(mobile);
}

// Mock function to simulate OTP sending
export function sendOTP(mobile: string, otp: string): Promise<boolean> {
  return new Promise((resolve) => {
    console.log(`Mock OTP sent to ${mobile}: ${otp}`);
    // In real implementation, integrate with SMS service provider
    setTimeout(() => resolve(true), 100);
  });
}
