import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Eye } from 'lucide-react';
import API_BASE_URL from '../config/api';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/${slug}`);
      const data = await response.json();
      if (data.success) {
        setPost(data.data);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-sans text-gray-600">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-navy mb-4">Article Not Found</h2>
          <Link to="/blog" className="font-sans text-gold hover:text-navy transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-navy text-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 font-sans text-sm text-gray-300 hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            <span>Back to Blog</span>
          </Link>
          
          {post.category && (
            <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-sans font-medium rounded-full mb-4">
              {post.category}
            </span>
          )}
          
          <h1 className="font-serif text-3xl lg:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            {post.author && (
              <div className="flex items-center space-x-2">
                <User size={18} />
                <span className="font-sans">{post.author.name}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Calendar size={18} />
              <span className="font-sans">
                {formatDate(post.publishedAt || post.createdAt)}
              </span>
            </div>
            {post.views > 0 && (
              <div className="flex items-center space-x-2">
                <Eye size={18} />
                <span className="font-sans">{post.views} views</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {post.featuredImage && (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="aspect-video rounded-sm overflow-hidden shadow-xl">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <article className="bg-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none font-sans text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="font-serif text-xl font-semibold text-navy mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-grey-light text-gray-700 text-sm font-sans rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
