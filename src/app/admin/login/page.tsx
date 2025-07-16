'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    employeeId: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.employeeId || !formData.password) {
      setError('Please enter both Employee ID and password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and redirect to admin dashboard
        localStorage.setItem('adminToken', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      {/* Breadcrumbs */}
      <nav className="mb-8 pt-4 container mx-auto">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="text-purple-600 hover:text-purple-700">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li>
            <span className="text-gray-900 font-medium">Admin Login</span>
          </li>
        </ol>
      </nav>
      
      <div className="flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">👨‍💼</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Voting Officer Login</h1>
          <p className="text-gray-600">
            Access the admin portal to monitor elections
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employee ID */}
          <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-2">
              Employee ID
            </label>
                          <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="Enter your Employee ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                required
              />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
                          <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                required
              />
          </div>

          {/* Demo Credentials */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-yellow-800 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-yellow-700 space-y-1">
              <p><strong>Employee ID:</strong> VO001</p>
              <p><strong>Password:</strong> admin123</p>
              <p className="pt-1 text-yellow-600">
                (Try different Employee IDs: VO001, VO002, VO003, VO004, VO005)
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {loading ? 'Logging in...' : 'Login to Admin Portal'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <Link href="/" className="text-purple-600 hover:text-purple-700 text-sm">
              ← Back to Home
            </Link>
          </div>
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Are you a voter?{' '}
              <Link href="/auth/login" className="text-purple-600 hover:text-purple-700">
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
