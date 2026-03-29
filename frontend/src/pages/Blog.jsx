import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../config/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog?published=true`);
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockPosts = [
    {
      _id: '1',
      title: 'Understanding Corporate Governance in Modern India',
      slug: 'corporate-governance-modern-india',
      excerpt: 'An in-depth look at the evolving landscape of corporate governance and compliance requirements for Indian businesses.',
      featuredImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
      author: { name: 'Advocate Rajesh Grover' },
      publishedAt: '2026-03-15',
      category: 'Corporate Law',
    },
    {
      _id: '2',
      title: 'Real Estate Law: Key Changes in 2026',
      slug: 'real-estate-law-changes-2026',
      excerpt: 'Important updates and amendments affecting property transactions and real estate development in India.',
      featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
      author: { name: 'Advocate Meera Grover' },
      publishedAt: '2026-03-10',
      category: 'Real Estate',
    },
    {
      _id: '3',
      title: 'Family Law: Protecting Your Rights',
      slug: 'family-law-protecting-rights',
      excerpt: 'A comprehensive guide to understanding your rights and options in family law matters.',
      featuredImage: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=800&h=400&fit=crop',
      author: { name: 'Advocate Neha Kapoor' },
      publishedAt: '2026-03-05',
      category: 'Family Law',
    },
  ];

  const displayPosts = posts.length > 0 ? posts : mockPosts;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      <section className="bg-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Legal Insights & News
          </h1>
          <p className="font-sans text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Stay informed with expert analysis and updates on Indian law
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="font-sans text-gray-600">Loading articles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {displayPosts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                >
                  <div className="aspect-video overflow-hidden bg-grey-light">
                    {post.featuredImage && (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    )}
                  </div>
                  
                  <div className="p-6 lg:p-8 space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span className="font-sans">
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                      </div>
                      {post.author && (
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span className="font-sans">{post.author.name}</span>
                        </div>
                      )}
                    </div>

                    {post.category && (
                      <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-sans font-medium rounded-full">
                        {post.category}
                      </span>
                    )}
                    
                    <h2 className="font-serif text-2xl font-bold text-navy group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="font-sans text-gray-600 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center space-x-2 font-sans text-navy font-medium hover:text-gold transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
