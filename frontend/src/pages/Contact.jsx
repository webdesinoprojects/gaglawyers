import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import Button from '../components/Button';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceOfInterest: '',
    message: '',
  });
  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services`);
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you! We will contact you shortly.' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceOfInterest: '',
          message: '',
        });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Unable to submit. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <SEOHead 
        title="Contact Us - GAG Lawyers | Legal Consultation"
        description="Get in touch with our legal experts. Schedule a consultation for corporate law, litigation, real estate, and family law matters."
        keywords="contact lawyers, legal consultation, lawyers in delhi, law firm contact"
      />
      <section className="bg-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Get In Touch
          </h1>
          <p className="font-sans text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Let's discuss how we can help you with your legal needs
          </p>
        </div>
      </section>

      <section className="bg-grey-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-navy mb-6">
                  Contact Information
                </h2>
                <p className="font-sans text-gray-600 leading-relaxed mb-8">
                  Reach out to us through any of the following channels. Our team is ready to assist you with your legal matters.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-navy/5 flex-shrink-0">
                    <Mail className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-navy mb-1">Email</h3>
                    <a
                      href="mailto:contact@gaglawyers.com"
                      className="font-sans text-gray-600 hover:text-gold transition-colors"
                    >
                      contact@gaglawyers.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-navy/5 flex-shrink-0">
                    <Phone className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-navy mb-1">Phone</h3>
                    <p className="font-sans text-gray-600">+91 98765 43210</p>
                    <p className="font-sans text-sm text-gray-500">WhatsApp Available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-navy/5 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-navy mb-1">Office Address</h3>
                    <p className="font-sans text-gray-600">
                      123 Lawyers Colony<br />
                      Connaught Place<br />
                      New Delhi - 110001
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-sm overflow-hidden shadow-md h-64 bg-navy/90 flex items-center justify-center">
                <p className="font-sans text-white text-sm">Google Map Embed Placeholder</p>
              </div>
            </div>

            <div className="bg-white rounded-sm shadow-md p-8 lg:p-10">
              <div className="mb-6">
                <h2 className="font-serif text-3xl font-bold text-navy mb-2">
                  Send Us a Message
                </h2>
                <p className="font-sans text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {submitStatus && (
                <div
                  className={`mb-6 p-4 rounded-sm ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  <p className="font-sans text-sm">{submitStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-sans text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors font-sans"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-sans text-sm font-medium text-gray-700 mb-2"
                    >
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
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block font-sans text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors font-sans"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="serviceOfInterest"
                    className="block font-sans text-sm font-medium text-gray-700 mb-2"
                  >
                    Practice Area of Interest
                  </label>
                  <select
                    id="serviceOfInterest"
                    name="serviceOfInterest"
                    value={formData.serviceOfInterest}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors font-sans bg-white"
                  >
                    <option value="">Select a practice area</option>
                    {services.map(service => (
                      <option key={service._id} value={service.name || service.title}>
                        {service.name || service.title}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-sans text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors font-sans resize-none"
                    placeholder="Tell us about your legal matter..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
