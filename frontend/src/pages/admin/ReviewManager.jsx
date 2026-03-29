import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';

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
    order: 0,
    isPublished: true,
    isFeatured: false,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const url = editingReview
        ? `http://localhost:5000/api/reviews/${editingReview._id}`
        : 'http://localhost:5000/api/reviews';
      
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
      imageUrl: review.imageUrl,
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
      await fetch(`http://localhost:5000/api/reviews/${id}`, {
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
      order: 0,
      isPublished: true,
      isFeatured: false,
    });
    setEditingReview(null);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Reviews Manager</h1>
          <p className="font-sans text-gray-600">Manage client testimonials</p>
        </div>
        <Button variant="primary" onClick={() => setIsEditing(true)}>
          <Plus className="inline mr-2" size={20} />
          Add Review
        </Button>
      </div>

      {isEditing && (
        <div className="bg-white rounded-sm shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-navy">
              {editingReview ? 'Edit Review' : 'Add New Review'}
            </h2>
            <button onClick={resetForm}>
              <X className="text-gray-500 hover:text-navy" size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Review Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>

            <ImageUploader
              label="Client Photo (Optional)"
              currentImage={formData.imageUrl}
              onImageUploaded={(url) => setFormData({ ...formData, imageUrl: url })}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>

              <div className="space-y-2 pt-6">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-5 h-5 text-navy focus:ring-navy/20 rounded"
                  />
                  <label htmlFor="isPublished" className="font-sans text-sm font-medium text-gray-700">
                    Published
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-5 h-5 text-navy focus:ring-navy/20 rounded"
                  />
                  <label htmlFor="isFeatured" className="font-sans text-sm font-medium text-gray-700">
                    Featured on Home
                  </label>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button type="submit" variant="primary">
                <Save className="inline mr-2" size={18} />
                {editingReview ? 'Update' : 'Create'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white rounded-sm shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-serif text-lg font-semibold text-navy">{review.clientName}</h3>
                {review.designation && (
                  <p className="font-sans text-sm text-gray-600">{review.designation}</p>
                )}
                <div className="flex items-center mt-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                {review.isFeatured && (
                  <span className="px-2 py-1 bg-gold/20 text-gold text-xs rounded-full text-center">
                    Featured
                  </span>
                )}
                {!review.isPublished && (
                  <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full text-center">
                    Draft
                  </span>
                )}
              </div>
            </div>

            <p className="font-sans text-gray-700 text-sm leading-relaxed mb-4">
              {review.content}
            </p>

            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(review)}
                className="flex-1 px-3 py-2 bg-navy text-white rounded-sm text-sm font-sans hover:bg-navy-dark transition-colors"
              >
                <Edit className="inline mr-1" size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(review._id)}
                className="px-3 py-2 bg-red-500 text-white rounded-sm text-sm font-sans hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewManager;
