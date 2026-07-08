import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import Button from '../../components/Button';
import API_BASE_URL from '../../config/api';

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        setMessage(data.message || 'If an account with that email exists, a reset link has been sent.');
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-grey-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-sm shadow-xl p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="font-serif text-3xl font-bold text-navy">GAG</span>
              <span className="font-serif text-3xl font-light text-gold">Lawyers</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-navy mb-2">Forgot Password</h1>
            <p className="font-sans text-gray-600 text-sm">
              Enter your admin email and we'll send you a reset link.
            </p>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm">
              <p className="text-green-700 text-sm">{message}</p>
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-sans text-sm font-medium text-navy mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent font-sans"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/admin/login" className="inline-flex items-center text-sm text-navy hover:text-gold">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
