'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
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
              <span className="text-gray-900 font-medium">About</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Everyone Votes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            India's first comprehensive online voting platform designed to make democracy accessible to every citizen, regardless of their location.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Mission */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              With rapid urbanization and migration, millions of eligible voters in India are unable to participate in elections due to being away from their registered constituencies. Everyone Votes bridges this gap by providing a secure, accessible, and transparent online voting platform.
            </p>
            <p className="text-gray-700">
              We believe that every citizen deserves the right to vote, regardless of their physical location, and technology should serve to strengthen democracy, not complicate it.
            </p>
          </div>

          {/* Key Features */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Multi-Factor Authentication</h3>
                  <p className="text-gray-600 text-sm">Secure login with OTP, Aadhar, and Voter ID verification</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">One Vote Per Person</h3>
                  <p className="text-gray-600 text-sm">Advanced algorithms ensure voting integrity and prevent duplicates</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Constituency-Based Voting</h3>
                  <p className="text-gray-600 text-sm">Vote only in your registered constituency with proper validation</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">NOTA Support</h3>
                  <p className="text-gray-600 text-sm">Express your dissent with the "None of the Above" option</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Real-Time Monitoring</h3>
                  <p className="text-gray-600 text-sm">Election officials can monitor voting progress in real-time</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Mobile-First Design</h3>
                  <p className="text-gray-600 text-sm">Optimized for smartphones and accessible on all devices</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Security & Privacy</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 text-xs">🔒</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">End-to-End Encryption</h3>
                  <p className="text-gray-600 text-sm">All data transmission is encrypted using industry-standard protocols</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 text-xs">🛡️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Anonymous Voting</h3>
                  <p className="text-gray-600 text-sm">Your vote is completely anonymous and cannot be traced back to you</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 text-xs">🔐</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Secure Authentication</h3>
                  <p className="text-gray-600 text-sm">Multiple layers of authentication ensure only eligible voters can participate</p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-indigo-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Mobile Verification</h3>
                  <p className="text-gray-600 text-sm">Enter your mobile number and verify with OTP</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-indigo-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Identity Verification</h3>
                  <p className="text-gray-600 text-sm">Provide your Aadhar number and Voter ID for authentication</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-indigo-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">View Candidates</h3>
                  <p className="text-gray-600 text-sm">Browse candidates in your constituency with their details</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-indigo-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Cast Your Vote</h3>
                  <p className="text-gray-600 text-sm">Select your preferred candidate or choose NOTA and submit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact & Support</h2>
            <p className="text-gray-700 mb-4">
              Have questions about the voting process or need technical support? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center text-gray-600">
                <span className="mr-2">📧</span>
                <span>support@everyonevotes.gov.in</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">📞</span>
                <span>1800-123-VOTE (8683)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="flex justify-center space-x-6">
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              Home
            </Link>
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700">
              Voter Login
            </Link>
            <Link href="/admin/login" className="text-blue-600 hover:text-blue-700">
              Admin Login
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            © 2024 Everyone Votes - Election Commission of India
          </p>
        </div>
      </div>
    </div>
  );
} 