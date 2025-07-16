'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [userType, setUserType] = useState<'voter' | 'officer' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-indigo-600">Everyone Votes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            India&apos;s first secure online voting platform enabling citizens to vote from anywhere. 
            Powered by OTP verification, Aadhar authentication, and blockchain-grade security.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Secure & Encrypted
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Aadhar Verified
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              One Vote Per Person
            </div>
          </div>
        </div>

        {/* User Type Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            Choose Your Access Type
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Voter Portal */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                <div className="text-white text-center">
                  <div className="text-4xl mb-3">🗳️</div>
                  <h3 className="text-2xl font-bold mb-2">Voter Portal</h3>
                  <p className="text-blue-100">Cast your vote securely online</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <span className="text-green-500 mr-3">✓</span>
                    Mobile OTP Verification
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-green-500 mr-3">✓</span>
                    Aadhar & Voter ID Authentication
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-green-500 mr-3">✓</span>
                    View Candidates & Cast Vote
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-green-500 mr-3">✓</span>
                    NOTA Option Available
                  </div>
                </div>
                
                <Link 
                  href="/auth/login"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center block"
                >
                  Enter Voter Portal
                </Link>
              </div>
            </div>

            {/* Admin Portal */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
                <div className="text-white text-center">
                  <div className="text-4xl mb-3">👨‍💼</div>
                  <h3 className="text-2xl font-bold mb-2">Voting Officer Portal</h3>
                  <p className="text-purple-100">Monitor and manage elections</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <span className="text-green-500 mr-3">✓</span>
                    Real-time Voting Statistics
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-green-500 mr-3">✓</span>
                    Constituency-wise Reports
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-green-500 mr-3">✓</span>
                    Voter Turnout Analytics
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-green-500 mr-3">✓</span>
                    Security Monitoring
                  </div>
                </div>
                
                <Link 
                  href="/admin/login"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center block"
                >
                  Enter Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            Why Choose Everyone Votes?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Bank-Grade Security</h3>
              <p className="text-gray-600">
                Multi-layered authentication with OTP, Aadhar verification, and encrypted data transmission.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Mobile-First Design</h3>
              <p className="text-gray-600">
                Optimized for mobile devices, allowing you to vote securely from anywhere in India.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Government Approved</h3>
              <p className="text-gray-600">
                Developed in compliance with Election Commission of India guidelines and protocols.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Make Your Voice Heard?
            </h3>
            <p className="text-gray-600 mb-6">
              Join millions of Indians who have already embraced the future of voting. 
              Your vote matters, and now it&apos;s easier than ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Start Voting Now
              </Link>
              <Link 
                href="/about"
                className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
