import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import API_BASE_URL from '../../config/api';

const ConsultationForm = ({ serviceName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          serviceOfInterest: serviceName,
          message: formData.message
        }),
      });

      if (response.ok) {
        setNotification({ type: 'success', message: 'Consultation request sent successfully!' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setNotification({ type: 'error', message: 'Failed to send request. Please try again.' });
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'An error occurred. Please try again.' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Consultation Form */}
      <div className="bg-gradient-to-br from-[#1a2744] to-[#1a2744]/90 rounded-xl p-6 sticky top-24">
        {notification && (
          <div className={`mb-4 p-4 rounded-lg ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white flex items-center gap-2`}>
            {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="font-sans text-sm">{notification.message}</span>
          </div>
        )}

        <h3 className="font-serif text-2xl font-bold text-white mb-2">
          Book a Consultation
        </h3>
        <p className="font-sans text-sm text-white/80 mb-6">
          Get expert legal advice. Fill out the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-sans text-sm font-medium text-white mb-2">
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/50 font-sans focus:outline-none focus:border-[#c9a84c] transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-sm font-medium text-white mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/50 font-sans focus:outline-none focus:border-[#c9a84c] transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-sm font-medium text-white mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/50 font-sans focus:outline-none focus:border-[#c9a84c] transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-sm font-medium text-white mb-2">
              Brief Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your case..."
              className="w-full px-4 py-3 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/50 font-sans resize-none focus:outline-none focus:border-[#c9a84c] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#c9a84c] text-[#1a2744] font-sans font-bold py-3 px-6 rounded-lg hover:bg-[#b89840] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              'Sending...'
            ) : (
              <>
                <Send size={20} />
                Request Consultation
              </>
            )}
          </button>
        </form>
      </div>

      {/* Office Details */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="font-serif text-xl font-bold text-[#1a2744] mb-4">
          Office Details
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-[#c9a84c] flex-shrink-0 mt-1" />
            <div>
              <p className="font-sans text-sm font-semibold text-gray-900 mb-1">Address</p>
              <p className="font-sans text-sm text-gray-600">
                Supreme Court of India, New Delhi
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone size={20} className="text-[#c9a84c] flex-shrink-0 mt-1" />
            <div>
              <p className="font-sans text-sm font-semibold text-gray-900 mb-1">Phone</p>
              <a href="tel:+919876543210" className="font-sans text-sm text-gray-600 hover:text-[#c9a84c]">
                +91 98765 43210
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail size={20} className="text-[#c9a84c] flex-shrink-0 mt-1" />
            <div>
              <p className="font-sans text-sm font-semibold text-gray-900 mb-1">Email</p>
              <a href="mailto:info@gaglawyers.com" className="font-sans text-sm text-gray-600 hover:text-[#c9a84c]">
                info@gaglawyers.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="font-serif text-xl font-bold text-[#1a2744] mb-4">
          Quick Links
        </h3>
        <div className="space-y-2">
          {['About Us', 'Our Team', 'All Services', 'Contact Us', 'FAQs'].map((link, index) => (
            <a
              key={index}
              href="#"
              className="block font-sans text-sm text-gray-600 hover:text-[#c9a84c] hover:pl-2 transition-all"
            >
              → {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;
