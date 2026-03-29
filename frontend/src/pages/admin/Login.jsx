import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Button from '../../components/Button';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.data));
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
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
            <h1 className="font-serif text-2xl font-bold text-navy mb-2">Admin Portal</h1>
            <p className="font-sans text-gray-600 text-sm">Sign in to manage your website</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm">
              <p className="font-sans text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors font-sans"
                placeholder="admin@gaglawyers.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors font-sans"
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              <LogIn className="inline mr-2" size={20} />
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        <p className="text-center font-sans text-sm text-gray-600 mt-6">
          © 2026 GAG Lawyers. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
