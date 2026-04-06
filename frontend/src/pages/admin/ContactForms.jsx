import React, { useEffect, useState, useMemo } from 'react';
import { Mail, Phone, Calendar, Trash2, MessageSquare, AlertCircle, CheckCircle2, Clock, ChevronDown, Loader2, ArrowUpDown, Filter, Eye, X, User } from 'lucide-react';
import API_BASE_URL from '../../config/api';

const ContactForms = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [notification, setNotification] = useState(null);
  const [sortBy, setSortBy] = useState('date-desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchSubmissions = async () => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      console.error('❌ No token found in localStorage');
      showNotification('Please login to view submissions', 'error');
      setLoading(false);
      // Redirect to login
      window.location.href = '/admin/login';
      return;
    }
    
    console.log('🔑 Using token for auth');
    
    try {
      console.log('📡 Fetching from:', `${API_BASE_URL}/api/contact`);
      
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      
      console.log('📊 Response status:', response.status);
      
      if (response.status === 401) {
        // Token is invalid or expired
        console.error('❌ Unauthorized - Token invalid or expired');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        showNotification('Session expired. Please login again.', 'error');
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
        return;
      }
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('❌ API Error Response:', errorData);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ API Response:', data);
      
      if (data.success && data.data) {
        setSubmissions(Array.isArray(data.data) ? data.data : []);
        console.log('✅ Loaded submissions:', data.data.length);
      } else {
        console.warn('⚠️ API response unsuccessful:', data);
        setSubmissions([]);
        if (data.message) {
          showNotification(`API Error: ${data.message}`, 'error');
        }
      }
    } catch (error) {
      console.error('❌ Error fetching submissions:', error);
      setSubmissions([]);
      showNotification(`Failed to load submissions: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('adminToken');
    setUpdatingStatus(id);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchSubmissions();
        // Update selected inquiry if modal is open
        if (selectedInquiry && selectedInquiry._id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
        showNotification('Status updated successfully', 'success');
      } else {
        showNotification('Failed to update status', 'error');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showNotification('An error occurred', 'error');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const openDetailModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setTimeout(() => setSelectedInquiry(null), 300);
  };

  const deleteInquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) return;

    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        await fetchSubmissions();
        showNotification('Inquiry deleted successfully', 'success');
      } else {
        showNotification('Failed to delete inquiry', 'error');
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      showNotification('An error occurred', 'error');
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

  const getStatusConfig = (status) => {
    const configs = {
      'new': {
        label: 'New',
        icon: AlertCircle,
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-300',
      },
      'in-progress': {
        label: 'In Progress',
        icon: Clock,
        bgColor: 'bg-amber-100',
        textColor: 'text-amber-700',
        borderColor: 'border-amber-300',
      },
      'resolved': {
        label: 'Resolved',
        icon: CheckCircle2,
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        borderColor: 'border-green-300',
      },
    };
    return configs[status] || configs['new'];
  };

  const filteredAndSortedSubmissions = useMemo(() => {
    let filtered = [...submissions];

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(s => s.status === filterStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'date-asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'status':
          const statusOrder = { 'new': 1, 'in-progress': 2, 'resolved': 3 };
          return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [submissions, sortBy, filterStatus]);

  return (
    <div className="min-h-screen bg-gray-50 -m-8 p-8">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            {notification.type === 'success' ? (
              <CheckCircle2 size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className="font-sans font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Detail View Modal */}
      {isDetailModalOpen && selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 animate-slide-in">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-navy to-navy/90 text-white px-8 py-6 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold">Inquiry Details</h2>
                  <p className="font-sans text-sm opacity-90">Complete information</p>
                </div>
              </div>
              <button 
                onClick={closeDetailModal}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="font-sans text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Personal Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User size={20} className="text-navy" />
                    </div>
                    <div className="flex-1">
                      <p className="font-sans text-xs text-gray-500 mb-1">Full Name</p>
                      <p className="font-sans text-lg font-bold text-navy">{selectedInquiry.name}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-xs text-gray-500 mb-1">Email Address</p>
                        <a href={`mailto:${selectedInquiry.email}`} className="font-sans text-sm font-medium text-blue-600 hover:text-blue-800 break-all">
                          {selectedInquiry.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone size={20} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-sans text-xs text-gray-500 mb-1">Phone Number</p>
                        <a href={`tel:${selectedInquiry.phone}`} className="font-sans text-sm font-medium text-green-600 hover:text-green-800">
                          {selectedInquiry.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-2 border-t border-gray-200">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare size={20} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-sans text-xs text-gray-500 mb-1">Service of Interest</p>
                      <span className="inline-block px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-sans font-semibold">
                        {selectedInquiry.serviceOfInterest}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-2 border-t border-gray-200">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar size={20} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-sans text-xs text-gray-500 mb-1">Submitted On</p>
                      <p className="font-sans text-sm font-medium text-gray-700">
                        {formatDate(selectedInquiry.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="font-sans text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Message
                </h3>
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <p className="font-sans text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </p>
                </div>
              </div>

              {/* Status Management */}
              <div>
                <h3 className="font-sans text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Update Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => updateStatus(selectedInquiry._id, 'new')}
                    disabled={updatingStatus === selectedInquiry._id || selectedInquiry.status === 'new'}
                    className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 transition-all font-sans font-bold ${
                      selectedInquiry.status === 'new'
                        ? 'bg-blue-100 border-blue-300 text-blue-700 ring-4 ring-blue-100'
                        : 'bg-white border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {updatingStatus === selectedInquiry._id ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>New</span>
                  </button>

                  <button
                    onClick={() => updateStatus(selectedInquiry._id, 'in-progress')}
                    disabled={updatingStatus === selectedInquiry._id || selectedInquiry.status === 'in-progress'}
                    className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 transition-all font-sans font-bold ${
                      selectedInquiry.status === 'in-progress'
                        ? 'bg-amber-100 border-amber-300 text-amber-700 ring-4 ring-amber-100'
                        : 'bg-white border-amber-200 text-amber-600 hover:bg-amber-50 hover:border-amber-300'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {updatingStatus === selectedInquiry._id ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Clock size={20} />
                    )}
                    <span>In Progress</span>
                  </button>

                  <button
                    onClick={() => updateStatus(selectedInquiry._id, 'resolved')}
                    disabled={updatingStatus === selectedInquiry._id || selectedInquiry.status === 'resolved'}
                    className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 transition-all font-sans font-bold ${
                      selectedInquiry.status === 'resolved'
                        ? 'bg-green-100 border-green-300 text-green-700 ring-4 ring-green-100'
                        : 'bg-white border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {updatingStatus === selectedInquiry._id ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <CheckCircle2 size={20} />
                    )}
                    <span>Resolved</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-8 py-6 rounded-b-2xl border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={closeDetailModal}
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-sans font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this inquiry?')) {
                    deleteInquiry(selectedInquiry._id);
                    closeDetailModal();
                  }
                }}
                className="px-6 py-3 bg-red-500 text-white font-sans font-semibold rounded-lg hover:bg-red-600 transition-all"
              >
                Delete Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-4xl font-bold text-navy mb-2">Contact Form Submissions</h1>
          <p className="font-sans text-gray-600">View and manage client inquiries</p>
        </div>
        
        {/* Sorting and Filtering Controls */}
        {!loading && submissions.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {/* Filter by Status */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none pl-10 pr-10 py-2.5 border-2 border-gray-300 rounded-lg font-sans text-sm font-medium focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all bg-white cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>

            {/* Sort By */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-10 pr-10 py-2.5 border-2 border-gray-300 rounded-lg font-sans text-sm font-medium focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all bg-white cursor-pointer"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="status">By Status</option>
              </select>
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
          </div>
        )}
      </div>

      {/* Stats Card */}
      {!loading && submissions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-navy to-navy/80 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="font-sans text-sm opacity-90 mb-1">Total</p>
                <p className="font-serif text-3xl font-bold">
                  {submissions.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-blue-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setFilterStatus('new')}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertCircle size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="font-sans text-sm text-gray-600 mb-1">New Inquiries</p>
                <p className="font-serif text-2xl font-bold text-navy">
                  {submissions.filter(s => s.status === 'new').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-amber-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setFilterStatus('in-progress')}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock size={24} className="text-amber-600" />
              </div>
              <div>
                <p className="font-sans text-sm text-gray-600 mb-1">In Progress</p>
                <p className="font-serif text-2xl font-bold text-navy">
                  {submissions.filter(s => s.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-green-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setFilterStatus('resolved')}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 size={24} className="text-green-600" />
              </div>
              <div>
                <p className="font-sans text-sm text-gray-600 mb-1">Resolved</p>
                <p className="font-serif text-2xl font-bold text-navy">
                  {submissions.filter(s => s.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-navy" size={48} />
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare size={40} className="text-gray-400" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-navy mb-3">No Submissions Yet</h3>
          <p className="font-sans text-gray-600 max-w-md mx-auto">
            When clients submit the contact form, their inquiries will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Results Count */}
          {filteredAndSortedSubmissions.length !== submissions.length && (
            <div className="mb-4 flex items-center justify-between">
              <p className="font-sans text-sm text-gray-600">
                Showing <span className="font-bold text-navy">{filteredAndSortedSubmissions.length}</span> of <span className="font-bold text-navy">{submissions.length}</span> inquiries
              </p>
              <button
                onClick={() => {
                  setFilterStatus('all');
                  setSortBy('date-desc');
                }}
                className="font-sans text-sm text-blue-600 hover:text-blue-800 font-medium underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {filteredAndSortedSubmissions.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter size={40} className="text-gray-400" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-navy mb-3">No Results Found</h3>
              <p className="font-sans text-gray-600 max-w-md mx-auto mb-6">
                No inquiries match your current filter criteria.
              </p>
              <button
                onClick={() => {
                  setFilterStatus('all');
                  setSortBy('date-desc');
                }}
                className="inline-flex items-center px-6 py-3 bg-navy text-white font-sans font-semibold rounded-lg hover:bg-navy/90 transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: 'calc(100vh - 480px)', minHeight: '400px' }}>
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">Message</th>
                      <th className="px-6 py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-right font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAndSortedSubmissions.map((submission) => {
                  const statusConfig = getStatusConfig(submission.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <tr key={submission._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-sans text-sm font-semibold text-navy">{submission.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail size={14} />
                            <a href={`mailto:${submission.email}`} className="font-sans hover:text-navy">
                              {submission.email}
                            </a>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone size={14} />
                            <a href={`tel:${submission.phone}`} className="font-sans hover:text-navy">
                              {submission.phone}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-sans font-medium">
                          {submission.serviceOfInterest}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-sans text-sm text-gray-700 line-clamp-2 max-w-xs">
                          {submission.message}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${statusConfig.borderColor} ${statusConfig.bgColor} ${statusConfig.textColor} font-sans text-xs font-bold`}>
                          <StatusIcon size={14} />
                          <span>{statusConfig.label}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar size={14} />
                          <span className="font-sans">{formatDate(submission.createdAt)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openDetailModal(submission)}
                            className="inline-flex items-center px-3 py-2 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-all shadow-sm hover:shadow-md"
                            title="View details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => deleteInquiry(submission._id)}
                            className="inline-flex items-center px-3 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-100 transition-all"
                            title="Delete inquiry"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContactForms;
