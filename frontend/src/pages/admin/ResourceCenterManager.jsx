import React, { useState } from 'react';
import { BookOpen, Mail } from 'lucide-react';
import BlogManager from './BlogManager';

const ResourceCenterManager = () => {
  const [activeTab, setActiveTab] = useState('articles');

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-navy mb-2">Blog</h1>
        <p className="font-sans text-gray-600">Manage Blog and Newsletter from one place.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('articles')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-sm font-medium transition-colors ${
            activeTab === 'articles'
              ? 'bg-navy text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <BookOpen size={16} />
          Blog
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('newsletter')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-sm font-medium transition-colors ${
            activeTab === 'newsletter'
              ? 'bg-navy text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Mail size={16} />
          Newsletter
        </button>
      </div>

      {activeTab === 'articles' ? (
        <BlogManager
          key="articles"
          contentType="article"
          managerTitle="Blog Manager"
          managerSubtitle="Create and manage blog posts"
          createLabel="New Blog Post"
        />
      ) : (
        <BlogManager
          key="newsletter"
          contentType="newsletter"
          managerTitle="Newsletter Manager"
          managerSubtitle="Create and manage newsletter entries"
          createLabel="New Newsletter"
        />
      )}
    </div>
  );
};

export default ResourceCenterManager;
