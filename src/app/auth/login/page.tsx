'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const router = useRouter();

  const sendOTP = async () => {
    if (!mobile || mobile.length !== 10 || !mobile.match(/^[6-9]\d{9}$/)) {
      setError('Please enter a valid 10-digit mobile number starting with 6-9');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep('otp');
        // In development, show the OTP
        if (data.otp) {
          setGeneratedOTP(data.otp);
        }
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.isNewUser) {
          // Redirect to registration
          router.push(`/auth/register?mobile=${mobile}`);
        } else {
          // Store token and redirect to voting dashboard
          localStorage.setItem('token', data.token);
          router.push('/vote');
        }
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Breadcrumbs */}
      <nav className="mb-8 pt-4 container mx-auto">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li>
            <span className="text-gray-900 font-medium">Voter Login</span>
          </li>
        </ol>
      </nav>
      
      <div className="flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🗳️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Voter Login</h1>
          <p className="text-gray-600">
            Enter your mobile number to access the voting portal
          </p>
        </div>

        {/* Mobile Number Step */}
        {step === 'mobile' && (
          <div className="space-y-6">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter 10-digit mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                maxLength={10}
              />
              <p className="text-xs text-gray-500 mt-1">
                We&apos;ll send an OTP to verify your identity
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={sendOTP}
              disabled={loading || mobile.length !== 10}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>
        )}

        {/* OTP Step */}
        {step === 'otp' && (
          <div className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest text-black"
                maxLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">
                OTP sent to {mobile}
              </p>
              {generatedOTP && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-800 text-xs">
                    <strong>Development Mode:</strong> Your OTP is: {generatedOTP}
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={verifyOTP}
              disabled={loading || otp.length !== 6}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              onClick={() => {
                setStep('mobile');
                setOtp('');
                setError('');
                setGeneratedOTP('');
              }}
              className="w-full text-blue-600 hover:text-blue-700 font-medium py-2"
            >
              Change Mobile Number
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm">
              ← Back to Home
            </Link>
          </div>
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Are you a voting officer?{' '}
              <Link href="/admin/login" className="text-blue-600 hover:text-blue-700">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
