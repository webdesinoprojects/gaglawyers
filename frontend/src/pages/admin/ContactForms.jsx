import React, { useEffect, useState } from 'react';
import { Mail, Phone, Calendar, Trash2 } from 'lucide-react';
import API_BASE_URL from '../../config/api';

const ContactForms = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setSubmissions(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Contact Form Submissions</h1>
          <p className="font-sans text-gray-600">View and manage client inquiries</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="font-sans text-gray-600">Loading submissions...</p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-white rounded-sm shadow-sm p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="font-sans text-gray-600">No submissions yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-sm shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-grey-light border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-sans text-sm font-semibold text-navy">Name</th>
                  <th className="px-6 py-4 text-left font-sans text-sm font-semibold text-navy">Contact</th>
                  <th className="px-6 py-4 text-left font-sans text-sm font-semibold text-navy">Service</th>
                  <th className="px-6 py-4 text-left font-sans text-sm font-semibold text-navy">Message</th>
                  <th className="px-6 py-4 text-left font-sans text-sm font-semibold text-navy">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-grey-light/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-sans text-sm font-medium text-navy">{submission.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail size={14} />
                          <span className="font-sans">{submission.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone size={14} />
                          <span className="font-sans">{submission.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-sans text-sm text-gray-700">{submission.serviceOfInterest}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-sans text-sm text-gray-700 line-clamp-2">{submission.message}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar size={14} />
                        <span className="font-sans">{formatDate(submission.createdAt)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForms;
