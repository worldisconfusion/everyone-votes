'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    mobile: '',
    aadharNumber: '',
    voterIdNumber: '',
    fullName: '',
    dateOfBirth: '',
    constituency: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const mobile = searchParams.get('mobile');
    if (mobile) {
      setFormData(prev => ({ ...prev, mobile }));
    }
  }, [searchParams]);

  const constituencies = [
    'Mumbai North',
    'Mumbai South',
    'Delhi Central',
    'Delhi East',
    'Bangalore North',
    'Bangalore South',
    'Chennai Central',
    'Hyderabad',
    'Pune',
    'Kolkata North'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Format inputs
    let formattedValue = value;
    if (name === 'aadharNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 12);
    } else if (name === 'voterIdNumber') {
      formattedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    } else if (name === 'mobile') {
      formattedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const validateForm = () => {
    const { mobile, aadharNumber, voterIdNumber, fullName, dateOfBirth, constituency } = formData;

    if (!mobile.match(/^[6-9]\d{9}$/)) {
      setError('Invalid mobile number format');
      return false;
    }

    if (!aadharNumber.match(/^\d{12}$/)) {
      setError('Aadhar number must be 12 digits');
      return false;
    }

    if (!voterIdNumber.match(/^[A-Z]{3}[0-9]{7}$/)) {
      setError('Voter ID must be in format ABC1234567 (3 letters + 7 digits)');
      return false;
    }

    if (!fullName || fullName.trim().length < 2) {
      setError('Full name must be at least 2 characters');
      return false;
    }

    if (!dateOfBirth || new Date(dateOfBirth) >= new Date()) {
      setError('Please enter a valid date of birth');
      return false;
    }

    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    if (age < 18) {
      setError('You must be at least 18 years old to register');
      return false;
    }

    if (!constituency) {
      setError('Please select your constituency');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and redirect to voting dashboard
        localStorage.setItem('token', data.token);
        router.push('/vote');
      } else {
        setError(data.error || 'Registration failed');
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
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700">
              Login
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li>
            <span className="text-gray-900 font-medium">Register</span>
          </li>
        </ol>
      </nav>
      
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">📝</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Voter Registration</h1>
            <p className="text-gray-600">
              Complete your registration to access the voting portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mobile Number (readonly) */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>

            {/* Aadhar Number */}
            <div>
              <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Aadhar Number *
              </label>
              <input
                type="text"
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                placeholder="Enter 12-digit Aadhar number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                maxLength={12}
                required
              />
            </div>

            {/* Voter ID Number */}
            <div>
              <label htmlFor="voterIdNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Voter ID Number *
              </label>
              <input
                type="text"
                id="voterIdNumber"
                name="voterIdNumber"
                value={formData.voterIdNumber}
                onChange={handleChange}
                placeholder="Enter Voter ID (e.g., ABC1234567)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                maxLength={10}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: 3 letters followed by 7 digits
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name as per Aadhar"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                required
              />
            </div>

            {/* Constituency */}
            <div>
              <label htmlFor="constituency" className="block text-sm font-medium text-gray-700 mb-2">
                Constituency *
              </label>
              <select
                id="constituency"
                name="constituency"
                value={formData.constituency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                required
              >
                <option value="">Select your constituency</option>
                {constituencies.map(constituency => (
                  <option key={constituency} value={constituency}>{constituency}</option>
                ))}
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Registering...' : 'Complete Registration'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
