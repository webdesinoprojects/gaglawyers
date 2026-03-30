import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import API_BASE_URL from '../../config/api';

const ReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    designation: '',
    content: '',
    rating: 5,
    imageUrl: '',
    cloudinaryPublicId: '',
    order: 0,
    isPublished: true,
    isFeatured: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const token = localStorage.getItem('adminToken');
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews. Make sure the backend server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;
    
    if (type === 'checkbox') {
      processedValue = checked;
    } else if (type === 'number') {
      processedValue = value === '' ? 0 : parseInt(value, 10);
    }
    
    setFormData({
      ...formData,
      [name]: processedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const url = editingReview
        ? `${API_BASE_URL}/api/reviews/${editingReview._id}`
        : `${API_BASE_URL}/api/reviews`;
      
      const method = editingReview ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchReviews();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setFormData({
      clientName: review.clientName,
      designation: review.designation,
      content: review.content,
      rating: review.rating,
      imageUrl: review.imageUrl || '',
      cloudinaryPublicId: review.cloudinaryPublicId || '',
      order: review.order,
      isPublished: review.isPublished,
      isFeatured: review.isFeatured,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      clientName: '',
      designation: '',
      content: '',
      rating: 5,
      imageUrl: '',
      cloudinaryPublicId: '',
      order: 0,
      isPublished: true,
      isFeatured: false,
    });
    setEditingReview(null);
    setIsEditing(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-gold fill-gold' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-sans text-sm">
            ⚠️ {error}
          </p>
          <p className="text-red-600 font-sans text-xs mt-2">
            Run: <code className="bg-red-100 px-2 py-1 rounded">cd backend && npm run dev</code>
          </p>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Review Manager</h1>
          <p className="font-sans text-gray-600">Manage client testimonials and reviews</p>
        </div>
        <Button variant="primary" onClick={() => setIsEditing(true)}>
          <Plus className="inline mr-2" size={20} />
          Add Review
        </Button>
      </div>

      {isEditing && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-navy">
              {editingReview ? 'Edit Review' : 'Add New Review'}
            </h2>
            <button onClick={resetForm}>
              <X className="text-gray-500 hover:text-navy" size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="CEO, Company Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Review Content * <span className="text-gray-500">({formData.content.length}/500)</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                maxLength={500}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy/20 font-sans"
                placeholder="Write the client's testimonial here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy/20 font-sans"
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>
            </div>

            <div>
              <ImageUploader
                label="Client Photo (Optional)"
                currentImage={formData.imageUrl}
                onImageUploaded={(url, publicId) =>
                  setFormData({ ...formData, imageUrl: url, cloudinaryPublicId: publicId })
                }
              />
            </div>

            <div className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="w-5 h-5 text-navy focus:ring-navy/20 rounded"
                />
                <span className="font-sans text-sm font-medium text-navy">Published</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-5 h-5 text-gold focus:ring-gold/20 rounded"
                />
                <span className="font-sans text-sm font-medium text-navy">
                  Featured on Homepage
                </span>
              </label>
            </div>

            <div className="flex space-x-3">
              <Button type="submit" variant="primary">
                <Save className="inline mr-2" size={18} />
                {editingReview ? 'Update Review' : 'Create Review'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading && !error && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="font-sans text-gray-600">Loading reviews...</p>
        </div>
      )}

      {!loading && !error && reviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Card Header with Image */}
            <div className="p-6 flex items-start gap-4 border-b border-gray-100">
              {review.imageUrl ? (
                <div className="flex-shrink-0">
                  <img
                    src={review.imageUrl}
                    alt={review.clientName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gold/30"
                  />
                </div>
              ) : (
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-navy to-navy/80 flex items-center justify-center border-2 border-gold/30">
                  <span className="text-white font-serif text-xl font-bold">
                    {review.clientName.charAt(0)}
                  </span>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="font-sans text-base font-bold text-navy truncate">
                  {review.clientName}
                </p>
                {review.designation && (
                  <p className="font-sans text-sm text-gray-600 truncate">
                    {review.designation}
                  </p>
                )}
                <div className="flex items-center space-x-1 mt-2">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>

            {/* Card Body - Content */}
            <div className="p-6 flex-1">
              <p className="font-sans text-sm text-gray-700 line-clamp-4 leading-relaxed">
                "{review.content}"
              </p>
            </div>

            {/* Card Footer - Status & Actions */}
            <div className="p-6 pt-0 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                {review.isPublished ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Published
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    Draft
                  </span>
                )}
                {review.isFeatured && (
                  <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(review)}
                  className="flex-1 px-4 py-2.5 bg-navy text-white rounded-lg text-sm font-sans font-medium hover:bg-navy/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="px-4 py-2.5 bg-red-500 text-white rounded-lg text-sm font-sans font-medium hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}

      {!loading && !error && reviews.length === 0 && !isEditing && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="font-sans text-gray-600 mb-4">No reviews yet</p>
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            <Plus className="inline mr-2" size={20} />
            Add First Review
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewManager;
