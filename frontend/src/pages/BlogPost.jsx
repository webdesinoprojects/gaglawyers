import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Eye, Clock, Share2, Mail } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/${slug}`);
      const data = await response.json();
      if (data.success) {
        setPost(data.data);
        // Fetch related posts from same category
        if (data.data.category) {
          fetchRelatedPosts(data.data.category, data.data._id);
        }
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (category, currentPostId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog?category=${category}&limit=3`);
      const data = await response.json();
      if (data.success) {
        // Filter out current post
        const filtered = data.data.filter(p => p._id !== currentPostId);
        setRelatedPosts(filtered.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-grey-light">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-navy border-t-gold rounded-full mx-auto mb-4"></div>
          <p className="font-sans text-gray-600 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-grey-light">
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold text-navy mb-4">Article Not Found</h2>
          <p className="font-sans text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-sans font-semibold rounded-md hover:bg-navy/90 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-grey-light">
      <SEOHead 
        title={`${post.title} | GAG Lawyers Blog`}
        description={post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, '')}
        keywords={post.tags?.join(', ') || 'legal blog, law articles'}
      />

      {/* Hero Section with Featured Image */}
      <section className="relative bg-navy text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Breadcrumb */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-sans text-sm text-gray-300 hover:text-gold transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </Link>
          
          <div className="max-w-4xl">
            {/* Category Badge */}
            {post.category && (
              <span className="inline-block px-4 py-1.5 bg-gold text-navy text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-6">
                {post.category}
              </span>
            )}
            
            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Excerpt */}
            {post.excerpt && (
              <p className="font-sans text-lg lg:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
                {post.excerpt}
              </p>
            )}
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 pb-8">
              {post.author && (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <User size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-white">{post.author.name}</p>
                    <p className="font-sans text-xs text-gray-400">Author</p>
                  </div>
                </div>
              )}
              
              <div className="h-8 w-px bg-white/20"></div>
              
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gold" />
                <span className="font-sans">{formatDate(post.publishedAt || post.createdAt)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gold" />
                <span className="font-sans">{calculateReadTime(post.content)} min read</span>
              </div>
              
              {post.views > 0 && (
                <div className="flex items-center gap-2">
                  <Eye size={18} className="text-gold" />
                  <span className="font-sans">{post.views} views</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative -mt-16 mb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <article className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar - Social Share (Sticky) */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <div className="flex flex-col gap-4">
                  <p className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Share</p>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-[#1877f2] text-gray-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    aria-label="Share on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-[#1da1f2] text-gray-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    aria-label="Share on Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-[#0077b5] text-gray-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href={`mailto:?subject=${post.title}&body=Check out this article: ${shareUrl}`}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gold text-gray-600 hover:text-navy transition-all duration-300 shadow-md hover:shadow-lg"
                    aria-label="Share via Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </aside>

            {/* Article Content */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:font-serif prose-headings:font-bold prose-headings:text-navy
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:font-sans prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-gold prose-a:no-underline hover:prose-a:text-navy prose-a:font-semibold prose-a:transition-colors
                    prose-strong:text-navy prose-strong:font-bold
                    prose-ul:my-6 prose-ul:space-y-2
                    prose-ol:my-6 prose-ol:space-y-2
                    prose-li:font-sans prose-li:text-gray-700
                    prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-gold/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-gray-700
                    prose-code:text-navy prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
                    prose-pre:bg-navy prose-pre:text-white prose-pre:rounded-lg prose-pre:p-6
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="font-serif text-xl font-semibold text-navy mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-gold rounded-full"></span>
                      Related Topics
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-grey-light hover:bg-gold/10 text-gray-700 hover:text-navy text-sm font-sans font-medium rounded-full transition-colors cursor-pointer border border-gray-200 hover:border-gold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile Share Buttons */}
                <div className="lg:hidden mt-12 pt-8 border-t border-gray-200">
                  <h3 className="font-serif text-xl font-semibold text-navy mb-4">Share this article</h3>
                  <div className="flex gap-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1877f2] text-white font-sans font-medium rounded-lg hover:brightness-110 transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1da1f2] text-white font-sans font-medium rounded-lg hover:brightness-110 transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0077b5] text-white font-sans font-medium rounded-lg hover:brightness-110 transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Author & Related Posts */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24 space-y-8">
                {/* Author Card */}
                {post.author && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-navy flex items-center justify-center">
                        <User size={28} className="text-white" />
                      </div>
                      <div>
                        <p className="font-serif text-lg font-bold text-navy">{post.author.name}</p>
                        <p className="font-sans text-sm text-gray-500">Author</p>
                      </div>
                    </div>
                    {post.author.bio && (
                      <p className="font-sans text-sm text-gray-600 leading-relaxed">
                        {post.author.bio}
                      </p>
                    )}
                  </div>
                )}

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-serif text-xl font-bold text-navy mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 bg-gold rounded-full"></span>
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost._id}
                          to={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-3">
                            {relatedPost.featuredImage && (
                              <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                <img
                                  src={relatedPost.featuredImage}
                                  alt={relatedPost.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-sans text-sm font-semibold text-navy group-hover:text-gold transition-colors line-clamp-2 mb-1">
                                {relatedPost.title}
                              </h4>
                              <p className="font-sans text-xs text-gray-500">
                                {formatDate(relatedPost.publishedAt || relatedPost.createdAt)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl shadow-lg p-6 text-white">
                  <h3 className="font-serif text-xl font-bold mb-3">Need Legal Advice?</h3>
                  <p className="font-sans text-sm text-gray-300 mb-4 leading-relaxed">
                    Our experienced legal team is here to help you with your legal matters.
                  </p>
                  <Link
                    to="/contact"
                    className="block w-full px-4 py-3 bg-gold text-navy font-sans font-bold text-center rounded-lg hover:brightness-110 transition-all"
                  >
                    Schedule Consultation
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Back to Blog CTA */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white font-sans font-semibold rounded-lg hover:bg-navy/90 transition-all hover:scale-105"
          >
            <ArrowLeft size={20} />
            Explore More Articles
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
