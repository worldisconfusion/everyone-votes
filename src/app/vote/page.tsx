'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  mobile: string;
  fullName: string;
  constituency: string;
  isVerified: boolean;
  hasVoted: boolean;
}

interface Candidate {
  _id: string;
  name: string;
  party: string;
  symbol: string;
  description?: string;
}

export default function VotePage() {
  const [user, setUser] = useState<User | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isNOTA, setIsNOTA] = useState(false);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadUserAndCandidates();
  }, []);

  const loadUserAndCandidates = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      // Get user profile from API
      const userResponse = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!userResponse.ok) {
        router.push('/auth/login');
        return;
      }

      const userData = await userResponse.json();
      setUser(userData.user);

      // Fetch candidates for user's constituency
      const candidatesResponse = await fetch(`/api/candidates?constituency=${encodeURIComponent(userData.user.constituency)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (candidatesResponse.ok) {
        const candidatesData = await candidatesResponse.json();
        setCandidates(candidatesData.candidates);
      } else {
        setError('Failed to load candidates');
      }
    } catch (error) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate && !isNOTA) {
      setError('Please select a candidate or NOTA to proceed');
      return;
    }

    setVoting(true);
    setError('');

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          candidateId: isNOTA ? null : selectedCandidate,
          isNOTA
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Your vote has been recorded successfully!');
        if (user) {
          setUser({ ...user, hasVoted: true });
        }
      } else {
        setError(data.error || 'Failed to record vote');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setVoting(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Access denied. Please login again.</p>
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (user.hasVoted || success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vote Recorded!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for participating in the democratic process. Your vote has been securely recorded.
          </p>
          <div className="space-y-4">
            <button
              onClick={logout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
            <Link
              href="/"
              className="block w-full text-blue-600 hover:text-blue-700 font-medium py-2"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
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
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700">
                Login
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-medium">Vote</span>
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Voting Portal</h1>
              <p className="text-gray-600">Welcome, {user.fullName}</p>
              <p className="text-sm text-gray-500">Constituency: {user.constituency}</p>
            </div>
            <button
              onClick={logout}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Voting Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-3">Voting Instructions</h2>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• Select one candidate from the list below or choose NOTA</li>
            <li>• Review your selection carefully before confirming</li>
            <li>• You can vote only once - your choice cannot be changed</li>
            <li>• Your vote is completely anonymous and secure</li>
          </ul>
        </div>

        {/* Candidates List */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Select Your Candidate</h2>
          
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div
                key={candidate._id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedCandidate === candidate._id && !isNOTA
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  setSelectedCandidate(candidate._id);
                  setIsNOTA(false);
                  setError('');
                }}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-lg">{candidate.symbol}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                    <p className="text-gray-600">{candidate.party}</p>
                    {candidate.description && (
                      <p className="text-sm text-gray-500 mt-1">{candidate.description}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedCandidate === candidate._id && !isNOTA
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedCandidate === candidate._id && !isNOTA && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* NOTA Option */}
            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                isNOTA
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                setIsNOTA(true);
                setSelectedCandidate(null);
                setError('');
              }}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-red-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg">🚫</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">NOTA</h3>
                  <p className="text-gray-600">None of the Above</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Choose this option if you don&apos;t want to vote for any candidate
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    isNOTA
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300'
                  }`}>
                    {isNOTA && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Vote Button */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center">
            <button
              onClick={handleVote}
              disabled={voting || (!selectedCandidate && !isNOTA)}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              {voting ? 'Recording Vote...' : 'Cast Your Vote'}
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Once you click this button, your vote will be recorded and cannot be changed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
