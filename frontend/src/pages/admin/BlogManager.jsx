import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import TagInput from '../../components/TagInput';
import API_BASE_URL from '../../config/api';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [filter, setFilter] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    featuredImagePublicId: '',
    category: 'Legal News',
    tags: [],
    seo: {
      title: '',
      description: '',
      keywords: '',
    },
    isPublished: false,
  });

  useEffect(() => {
    fetchPosts();
  }, [filter, pagination.page]);

  const fetchPosts = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    
    try {
      const publishedParam = filter === 'all' ? '' : `&published=${filter === 'published'}`;
      const response = await fetch(
        `${API_BASE_URL}/api/blog?page=${pagination.page}&limit=10${publishedParam}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
        setPagination({
          page: data.page,
          pages: data.pages,
          total: data.total,
        });
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setFormData({
        ...formData,
        seo: { ...formData.seo, [seoField]: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const url = editingPost
        ? `${API_BASE_URL}/api/blog/${editingPost._id}`
        : `${API_BASE_URL}/api/blog`;
      
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchPosts();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      featuredImagePublicId: post.featuredImagePublicId || '',
      category: post.category,
      tags: post.tags || [],
      seo: post.seo || { title: '', description: '', keywords: '' },
      isPublished: post.isPublished,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`${API_BASE_URL}/api/blog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      featuredImagePublicId: '',
      category: 'Legal News',
      tags: [],
      seo: { title: '', description: '', keywords: '' },
      isPublished: false,
    });
    setEditingPost(null);
    setIsEditing(false);
  };

  const categories = [
    'Legal News',
    'Corporate Law',
    'Criminal Law',
    'Family Law',
    'Real Estate',
    'Intellectual Property',
    'Tax Law',
    'Employment Law',
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Blog Manager</h1>
          <p className="font-sans text-gray-600">Create and manage blog posts</p>
        </div>
        <Button variant="primary" onClick={() => setIsEditing(true)}>
          <Plus className="inline mr-2" size={20} />
          New Post
        </Button>
      </div>

      {isEditing && (
        <div className="bg-white rounded-sm shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-navy">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <button onClick={resetForm}>
              <X className="text-gray-500 hover:text-navy" size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Slug (auto-generated if empty)
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="auto-generated-from-title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Excerpt * <span className="text-gray-500">({formData.excerpt.length}/200)</span>
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                maxLength={200}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
              />
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="12"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans font-mono text-sm"
                placeholder="Write your blog content here. HTML is supported."
              />
            </div>

            {/* Featured Image & Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <ImageUploader
                  label="Featured Image"
                  currentImage={formData.featuredImage}
                  onImageUploaded={(url, publicId) =>
                    setFormData({ ...formData, featuredImage: url, featuredImagePublicId: publicId })
                  }
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags */}
            <TagInput
              tags={formData.tags}
              onChange={(newTags) => setFormData({ ...formData, tags: newTags })}
              label="Tags"
              placeholder="Add tags for better discoverability"
            />

            {/* SEO Section */}
            <details className="border border-gray-200 rounded-sm">
              <summary className="px-4 py-3 font-sans font-medium text-navy cursor-pointer hover:bg-grey-light">
                SEO Settings (Optional)
              </summary>
              <div className="p-4 space-y-4 bg-grey-light">
                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                    SEO Title <span className="text-gray-500">({formData.seo.title.length}/60)</span>
                  </label>
                  <input
                    type="text"
                    name="seo.title"
                    value={formData.seo.title}
                    onChange={handleChange}
                    maxLength={60}
                    placeholder="Leave empty to use post title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                  />
                </div>

                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                    SEO Description <span className="text-gray-500">({formData.seo.description.length}/160)</span>
                  </label>
                  <textarea
                    name="seo.description"
                    value={formData.seo.description}
                    onChange={handleChange}
                    maxLength={160}
                    rows="2"
                    placeholder="Leave empty to use excerpt"
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                  />
                </div>

                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                    SEO Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="seo.keywords"
                    value={formData.seo.keywords}
                    onChange={handleChange}
                    placeholder="legal advice, corporate law, litigation"
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-navy/20 font-sans"
                  />
                </div>
              </div>
            </details>

            {/* Publish Toggle */}
            <div className="flex items-center space-x-3 p-4 bg-grey-light rounded-sm">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="w-5 h-5 text-navy focus:ring-navy/20 rounded"
              />
              <label htmlFor="isPublished" className="font-sans font-medium text-navy cursor-pointer">
                Publish this post immediately
              </label>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button type="submit" variant="primary">
                <Save className="inline mr-2" size={18} />
                {editingPost ? 'Update Post' : 'Create Post'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        {['all', 'published', 'drafts'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setFilter(tab);
              setPagination({ ...pagination, page: 1 });
            }}
            className={`px-4 py-2 rounded-sm font-sans font-medium transition-colors ${
              filter === tab
                ? 'bg-navy text-white'
                : 'bg-white text-gray-700 hover:bg-grey-light'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="font-sans text-gray-500">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-sm">
          <p className="font-sans text-gray-500">No posts found. Create your first post!</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-sm shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-6">
                  {post.featuredImage && (
                    <div className="w-32 h-32 flex-shrink-0 bg-grey-light rounded-sm overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif text-xl font-semibold text-navy">
                            {post.title}
                          </h3>
                          {post.isPublished ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-sm">
                              <Eye size={12} />
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-sm">
                              <EyeOff size={12} />
                              Draft
                            </span>
                          )}
                        </div>
                        
                        <p className="font-sans text-sm text-gray-600 mb-2 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-sans">
                          <span className="px-2 py-1 bg-grey-light rounded-sm">{post.category}</span>
                          {post.tags && post.tags.length > 0 && (
                            <span>{post.tags.slice(0, 3).join(', ')}</span>
                          )}
                          <span>{post.views || 0} views</span>
                          {post.publishedAt && (
                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="px-3 py-2 bg-navy text-white rounded-sm text-sm font-sans hover:bg-navy-dark transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="px-3 py-2 bg-red-500 text-white rounded-sm text-sm font-sans hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between mt-8 px-4">
              <p className="font-sans text-sm text-gray-600">
                Showing {posts.length} of {pagination.total} posts
              </p>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-grey-light transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <span className="font-sans text-sm text-gray-700">
                  Page {pagination.page} of {pagination.pages}
                </span>
                
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.pages}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-grey-light transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogManager;
