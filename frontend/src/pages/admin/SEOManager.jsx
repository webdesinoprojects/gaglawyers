import React, { useState, useEffect, useMemo } from 'react';
import { Search, Globe, FileText, MapPin, ExternalLink, RefreshCw, CheckCircle, AlertCircle, Save, X as XIcon, Wand2, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../../components/Button';
import API_BASE_URL from '../../config/api';

const SEOManager = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [seoData, setSeoData] = useState({
    pages: [],
    locations: [],
    blogs: []
  });
  const [stats, setStats] = useState({
    totalPages: 0,
    pagesWithSEO: 0,
    missingMeta: 0,
    sitemapStatus: 'active'
  });
  const [tabCounts, setTabCounts] = useState({
    pages: 0,
    locations: 0,
    blogs: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bulkFixing, setBulkFixing] = useState(false);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterMissing, setFilterMissing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(t);
  }, [searchQuery]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 20;
  
  const [editData, setEditData] = useState({
    title: '',
    metaDescription: '',
    metaKeywords: '',
    robotsTag: 'index,follow'
  });

  useEffect(() => {
    fetchSEOData();
  }, [activeTab, currentPage, debouncedSearch, filterMissing]);

  const fetchSEOData = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');

    try {
      if (activeTab === 'overview') {
        // Fetch comprehensive stats from dedicated endpoint
        const [statsRes, pagesRes, blogsRes, locationsStatsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/seo/stats`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${API_BASE_URL}/api/pages`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${API_BASE_URL}/api/blog`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${API_BASE_URL}/api/locations/stats/summary`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const statsData = await statsRes.json();
        const pagesData = await pagesRes.json();
        const blogsData = await blogsRes.json();
        const locationsStats = await locationsStatsRes.json();

        console.log('SEO Stats Response:', statsData);
        console.log('Locations Stats Response:', locationsStats);

        const pages = pagesData.success ? pagesData.data : [];
        const blogs = blogsData.success ? blogsData.data : [];
        const totalLocations = locationsStats.success ? locationsStats.data.total : 0;

        if (statsData.success) {
          console.log('Setting stats:', {
            totalPages: statsData.data.total,
            pagesWithSEO: statsData.data.withSEO,
            missingMeta: statsData.data.missingSEO
          });
          setStats({
            totalPages: statsData.data.total,
            pagesWithSEO: statsData.data.withSEO,
            missingMeta: statsData.data.missingSEO,
            sitemapStatus: 'active'
          });
        }
        
        console.log('Setting tab counts:', {
          pages: pages.length,
          locations: totalLocations,
          blogs: blogs.length
        });
        setTabCounts({
          pages: pages.length,
          locations: totalLocations,
          blogs: blogs.length
        });
        
        setSeoData({ pages, locations: [], blogs });
      } else {
        // Fetch paginated data for specific tab
        let endpoint = '';
        let dataKey = '';
        
        if (activeTab === 'pages') {
          const response = await fetch(`${API_BASE_URL}/api/pages`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          let pages = data.success ? data.data : [];
          
          // Client-side filtering for pages
          if (debouncedSearch) {
            const searchLower = debouncedSearch.toLowerCase();
            pages = pages.filter(page => 
              page.pageName.toLowerCase().includes(searchLower) ||
              (page.seo?.title && page.seo.title.toLowerCase().includes(searchLower)) ||
              (page.seo?.description && page.seo.description.toLowerCase().includes(searchLower))
            );
          }
          
          if (filterMissing) {
            pages = pages.filter(page => !page.seo?.description);
          }
          
          setSeoData(prev => ({ ...prev, pages }));
          setTotalCount(pages.length);
        } else if (activeTab === 'locations') {
          const skip = (currentPage - 1) * itemsPerPage;
          let url = `${API_BASE_URL}/api/locations?limit=${itemsPerPage}&skip=${skip}`;
          
          if (debouncedSearch) {
            url += `&search=${encodeURIComponent(debouncedSearch)}`;
          }
          if (filterMissing) {
            url += `&missingMeta=true`;
          }
          
          const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          setSeoData(prev => ({ ...prev, locations: data.success ? data.data : [] }));
          setTotalCount(data.success ? data.pagination?.total || data.data.length : 0);
        } else if (activeTab === 'blogs') {
          const response = await fetch(`${API_BASE_URL}/api/blog`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          let blogs = data.success ? data.data : [];
          
          // Client-side filtering for blogs
          if (debouncedSearch) {
            const searchLower = debouncedSearch.toLowerCase();
            blogs = blogs.filter(blog => 
              blog.title.toLowerCase().includes(searchLower) ||
              blog.slug.toLowerCase().includes(searchLower) ||
              (blog.seo?.description && blog.seo.description.toLowerCase().includes(searchLower))
            );
          }
          
          if (filterMissing) {
            blogs = blogs.filter(blog => !blog.seo?.description);
          }
          
          setSeoData(prev => ({ ...prev, blogs }));
          setTotalCount(blogs.length);
        }
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      setMessage('✗ Error loading data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkFix = async () => {
    const itemCount = activeTab === 'locations' 
      ? seoData.locations.filter(loc => !loc.seo?.description).length
      : activeTab === 'blogs'
      ? seoData.blogs.filter(blog => !blog.seo?.description).length
      : seoData.pages.filter(page => !page.seo?.description).length;

    if (itemCount === 0) {
      setMessage('✓ All items on this page already have SEO data!');
      return;
    }

    if (!window.confirm(`This will auto-generate SEO data for ${itemCount} items on this page. Continue?`)) {
      return;
    }

    setBulkFixing(true);
    setMessage('🔄 Starting bulk fix...');
    const token = localStorage.getItem('adminToken');

    try {
      let endpoint = '';
      
      if (activeTab === 'locations') {
        endpoint = `${API_BASE_URL}/api/seo/bulk-fix/locations`;
      } else if (activeTab === 'blogs') {
        endpoint = `${API_BASE_URL}/api/seo/bulk-fix/blogs`;
      } else if (activeTab === 'pages') {
        endpoint = `${API_BASE_URL}/api/seo/bulk-fix/pages`;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ limit: 100 })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(`✓ Bulk fix complete! Fixed: ${data.data.fixed}, Failed: ${data.data.failed}`);
        // Refresh data after a short delay
        setTimeout(() => {
          fetchSEOData();
        }, 1000);
      } else {
        setMessage(`✗ Bulk fix failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage('✗ Bulk fix error: ' + error.message);
      console.error('Bulk fix error:', error);
    } finally {
      setBulkFixing(false);
    }
  };

  const handleEdit = (item, type) => {
    setSelectedItem({ ...item, type });
    
    let title = '';
    let metaDescription = '';
    let metaKeywords = '';
    
    if (type === 'page') {
      title = item.seo?.title || item.pageName || '';
      metaDescription = item.seo?.description || '';
      metaKeywords = item.seo?.keywords || '';
    } else if (type === 'location') {
      title = item.seo?.title || item.seo?.h1 || '';
      metaDescription = item.seo?.description || '';
      metaKeywords = item.seo?.keywords || '';
    } else if (type === 'blog') {
      title = item.seo?.title || item.title || '';
      metaDescription = item.seo?.description || '';
      metaKeywords = item.seo?.keywords || (item.tags ? item.tags.join(', ') : '');
    }
    
    setEditData({
      title,
      metaDescription,
      metaKeywords,
      robotsTag: item.robotsTag || 'index,follow'
    });
    setEditMode(true);
    setMessage('');
  };

  const handleSave = async () => {
    if (!selectedItem) return;

    setSaving(true);
    setMessage('');
    const token = localStorage.getItem('adminToken');

    try {
      let endpoint = '';
      let body = {};
      let method = 'PUT';

      if (selectedItem.type === 'page') {
        endpoint = `${API_BASE_URL}/api/pages/${selectedItem.pageName}`;
        body = {
          seo: {
            title: editData.title,
            description: editData.metaDescription,
            keywords: editData.metaKeywords,
            ogImage: selectedItem.seo?.ogImage || '',
            ogImagePublicId: selectedItem.seo?.ogImagePublicId || '',
            canonical: selectedItem.seo?.canonical || ''
          },
          sections: selectedItem.sections,
          isPublished: selectedItem.isPublished
        };
      } else if (selectedItem.type === 'location') {
        endpoint = `${API_BASE_URL}/api/locations/${selectedItem._id}`;
        body = {
          seo: {
            title: editData.title,
            description: editData.metaDescription,
            keywords: editData.metaKeywords,
            h1: selectedItem.seo?.h1 || editData.title
          }
        };
        method = 'PATCH';
      } else if (selectedItem.type === 'blog') {
        endpoint = `${API_BASE_URL}/api/blog/${selectedItem._id}`;
        body = {
          seo: {
            title: editData.title,
            description: editData.metaDescription,
            keywords: editData.metaKeywords
          },
          tags: editData.metaKeywords.split(',').map(k => k.trim()).filter(k => k)
        };
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('✓ SEO data updated successfully!');
        setEditMode(false);
        setSelectedItem(null);
        fetchSEOData();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('✗ Failed to update: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      setMessage('✗ Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const filteredPagesForTab = useMemo(() => {
    if (activeTab !== 'pages' || !debouncedSearch.trim()) return seoData.pages;
    const q = debouncedSearch.trim().toLowerCase();
    return seoData.pages.filter(
      (p) =>
        (p.pageName && p.pageName.toLowerCase().includes(q)) ||
        (p.seo?.title && p.seo.title.toLowerCase().includes(q)) ||
        (p.seo?.description && p.seo.description.toLowerCase().includes(q)) ||
        (p.seo?.keywords && String(p.seo.keywords).toLowerCase().includes(q))
    );
  }, [activeTab, seoData.pages, debouncedSearch]);

  const renderSEOItem = (item, type) => {
    let hasMetaDesc = false;
    let hasKeywords = false;
    let title = '';
    let url = '';
    
    if (type === 'page') {
      hasMetaDesc = !!(item.seo?.description);
      hasKeywords = !!(item.seo?.keywords);
      title = item.pageName.charAt(0).toUpperCase() + item.pageName.slice(1);
      url = `/${item.pageName === 'home' ? '' : item.pageName}`;
    } else if (type === 'location') {
      hasMetaDesc = !!(item.seo?.description);
      hasKeywords = !!(item.seo?.keywords);
      title = item.seo?.title || item.seo?.h1 || item.serviceName || 'Untitled';
      url = `/${item.slug}`;
    } else if (type === 'blog') {
      hasMetaDesc = !!(item.seo?.description);
      hasKeywords = !!(item.seo?.keywords || (item.tags && item.tags.length > 0));
      title = item.title || 'Untitled';
      url = `/blog/${item.slug}`;
    }

    return (
      <div key={item._id || item.pageName} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-sans font-semibold text-navy text-lg mb-2">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <ExternalLink size={14} />
              <span className="font-mono text-xs truncate">{url}</span>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleEdit(item, type)}
          >
            Edit SEO
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {hasMetaDesc ? (
              <CheckCircle size={16} className="text-green-600" />
            ) : (
              <AlertCircle size={16} className="text-red-600" />
            )}
            <span className="font-sans text-sm text-gray-700">
              Meta Description: {hasMetaDesc ? 'Set' : 'Missing'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {hasKeywords ? (
              <CheckCircle size={16} className="text-green-600" />
            ) : (
              <AlertCircle size={16} className="text-red-600" />
            )}
            <span className="font-sans text-sm text-gray-700">
              Keywords: {hasKeywords ? 'Set' : 'Missing'}
            </span>
          </div>
        </div>

        {((type === 'page' || type === 'location') ? item.seo?.description : (type === 'blog' ? item.seo?.description : item.metaDescription)) && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="font-sans text-sm text-gray-600 line-clamp-2">
              {(type === 'page' || type === 'location') ? item.seo?.description : (type === 'blog' ? item.seo?.description : item.metaDescription)}
            </p>
          </div>
        )}
      </div>
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'pages', label: 'Pages', icon: FileText, count: tabCounts.pages },
    { id: 'locations', label: 'Locations', icon: MapPin, count: tabCounts.locations },
    { id: 'blogs', label: 'Blogs', icon: FileText, count: tabCounts.blogs }
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">SEO Manager</h1>
          <p className="font-sans text-gray-600">Manage meta tags for {stats.totalPages.toLocaleString()} pages</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={fetchSEOData}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-navy border border-gray-300 rounded-lg font-sans text-sm font-medium hover:bg-gray-50 hover:border-navy/30 focus:outline-none focus:ring-2 focus:ring-navy/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => window.open(`${API_BASE_URL}/sitemap.xml`, '_blank')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-navy border border-gray-300 rounded-lg font-sans text-sm font-medium hover:bg-gray-50 hover:border-navy/30 focus:outline-none focus:ring-2 focus:ring-navy/20 transition-colors"
          >
            <ExternalLink size={16} />
            Sitemap
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          message.includes('✓') 
            ? 'bg-green-50 text-green-800 border-2 border-green-200' 
            : 'bg-red-50 text-red-800 border-2 border-red-200'
        }`}>
          <div className="flex-shrink-0">
            {message.includes('✓') ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-600" />
            )}
          </div>
          <p className="font-sans text-sm font-medium flex-1">{message}</p>
          <button onClick={() => setMessage('')} className="flex-shrink-0 text-gray-500 hover:text-gray-700">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans text-sm text-gray-600">Total Pages</span>
            <Globe className="text-navy" size={20} />
          </div>
          <div className="font-serif text-3xl font-bold text-navy">{stats.totalPages.toLocaleString()}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans text-sm text-gray-600">With SEO</span>
            <CheckCircle className="text-green-600" size={20} />
          </div>
          <div className="font-serif text-3xl font-bold text-green-600">{stats.pagesWithSEO.toLocaleString()}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans text-sm text-gray-600">Missing Meta</span>
            <AlertCircle className="text-red-600" size={20} />
          </div>
          <div className="font-serif text-3xl font-bold text-red-600">{stats.missingMeta.toLocaleString()}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans text-sm text-gray-600">Sitemap</span>
            <FileText className="text-gold" size={20} />
          </div>
          <div className="font-sans text-sm font-semibold text-gold uppercase">
            {stats.sitemapStatus}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                  setSearchQuery('');
                  setFilterMissing(false);
                }}
                className={`flex items-center gap-2 px-6 py-4 font-sans font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-navy border-b-2 border-navy'
                    : 'text-gray-600 hover:text-navy'
                }`}
              >
                <Icon size={18} />
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tab.count.toLocaleString()}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Filters and Actions */}
        {activeTab !== 'overview' && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-3 flex-1 w-full md:w-auto">
                {/* Search */}
                <div className="relative flex-1 md:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder={activeTab === 'locations' ? 'Search by title, slug, or city...' : 'Search by title or slug...'}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors"
                  />
                </div>

                {/* Filter Missing */}
                <button
                  onClick={() => {
                    setFilterMissing(!filterMissing);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-sm font-medium transition-colors ${
                    filterMissing
                      ? 'bg-red-100 text-red-700 border-2 border-red-300'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Filter size={16} />
                  Missing Only
                </button>
              </div>

              {/* Bulk Fix Button */}
              <Button
                onClick={handleBulkFix}
                disabled={bulkFixing || loading}
                className="whitespace-nowrap"
              >
                {bulkFixing ? (
                  <>
                    <RefreshCw size={16} className="animate-spin mr-2" />
                    Fixing...
                  </>
                ) : (
                  <>
                    <Wand2 size={16} className="mr-2" />
                    Auto-Fix Missing SEO
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="animate-spin mx-auto mb-4 text-navy" size={32} />
              <p className="font-sans text-gray-600">Loading SEO data...</p>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-navy to-navy/90 rounded-lg p-8 text-white">
                    <h2 className="font-serif text-2xl font-bold mb-4">SEO Health Overview</h2>
                    <p className="font-sans text-white/90 mb-6">
                      Managing {stats.totalPages.toLocaleString()} pages across your website. Use the tabs above to view and edit SEO data for each section.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="font-sans text-sm text-white/80 mb-1">Completion Rate</div>
                        <div className="font-serif text-3xl font-bold">
                          {stats.totalPages > 0 ? Math.round((stats.pagesWithSEO / stats.totalPages) * 100) : 0}%
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="font-sans text-sm text-white/80 mb-1">Static Pages</div>
                        <div className="font-serif text-3xl font-bold">{seoData.pages.length}</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="font-sans text-sm text-white/80 mb-1">Blog Posts</div>
                        <div className="font-serif text-3xl font-bold">{seoData.blogs.length}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-sans font-semibold text-navy mb-3 flex items-center gap-2">
                      <Wand2 size={20} />
                      Auto-Fix Feature
                    </h3>
                    <p className="font-sans text-sm text-gray-700 mb-4">
                      Use the "Auto-Fix Missing SEO" button on each tab to automatically generate meta descriptions and keywords for pages that are missing them. This feature:
                    </p>
                    <ul className="space-y-2 font-sans text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Generates SEO-optimized meta descriptions based on page content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Creates relevant keywords from city, service, and page data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Processes pages in batches for optimal performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Shows progress and completion status</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="font-sans font-semibold text-navy mb-3 flex items-center gap-2">
                      <Search size={20} />
                      SEO Best Practices
                    </h3>
                    <ul className="space-y-2 font-sans text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Meta descriptions should be 150-160 characters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Page titles should be 50-60 characters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Use location-specific keywords for better local SEO</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Include service names in meta descriptions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Sitemap.xml auto-updates when pages are published</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'pages' && (
                <div className="space-y-4">
                  {filteredPagesForTab.length === 0 ? (
                    <p className="text-center py-8 font-sans text-gray-600">
                      {debouncedSearch.trim() ? 'No pages match your search' : 'No pages found'}
                    </p>
                  ) : (
                    filteredPagesForTab.map((page) => renderSEOItem(page, 'page'))
                  )}
                </div>
              )}

              {activeTab === 'locations' && (
                <>
                  <div className="space-y-4">
                    {seoData.locations.length === 0 ? (
                      <p className="text-center py-8 font-sans text-gray-600">
                        {debouncedSearch || filterMissing ? 'No locations found matching your filters' : 'No location pages found'}
                      </p>
                    ) : (
                      seoData.locations.map(location => renderSEOItem(location, 'location'))
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
                      <div className="font-sans text-sm text-gray-600">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount.toLocaleString()} locations
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="inline-flex items-center gap-1"
                        >
                          <ChevronLeft size={16} />
                          Previous
                        </Button>
                        <div className="flex items-center gap-1">
                          {[...Array(Math.min(5, totalPages))].map((_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                              <button
                                key={i}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-3 py-1 rounded font-sans text-sm ${
                                  currentPage === pageNum
                                    ? 'bg-navy text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          {totalPages > 5 && currentPage < totalPages - 2 && (
                            <>
                              <span className="px-2 text-gray-500">...</span>
                              <button
                                onClick={() => setCurrentPage(totalPages)}
                                className="px-3 py-1 rounded font-sans text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                              >
                                {totalPages}
                              </button>
                            </>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="inline-flex items-center gap-1"
                        >
                          Next
                          <ChevronRight size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'blogs' && (
                <>
                  <div className="space-y-4">
                    {seoData.blogs.length === 0 ? (
                      <p className="text-center py-8 font-sans text-gray-600">
                        {debouncedSearch ? 'No blog posts match your search' : 'No blog posts found'}
                      </p>
                    ) : (
                      seoData.blogs.map(blog => renderSEOItem(blog, 'blog'))
                    )}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-200 pt-6">
                      <div className="font-sans text-sm text-gray-600">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount.toLocaleString()} posts
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="inline-flex items-center gap-1"
                        >
                          <ChevronLeft size={16} />
                          Previous
                        </Button>
                        <span className="font-sans text-sm text-gray-700 px-2">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="inline-flex items-center gap-1"
                        >
                          Next
                          <ChevronRight size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="font-serif text-2xl font-bold text-navy">Edit SEO Settings</h2>
              <p className="font-sans text-sm text-gray-600 mt-1">
                {selectedItem.type === 'page' 
                  ? selectedItem.pageName.charAt(0).toUpperCase() + selectedItem.pageName.slice(1)
                  : selectedItem.type === 'location'
                  ? (selectedItem.seo?.title || selectedItem.serviceName || 'Location Page')
                  : selectedItem.type === 'blog'
                  ? (selectedItem.title || 'Blog Post')
                  : 'Unknown'}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {(selectedItem.type === 'page' || selectedItem.type === 'location' || selectedItem.type === 'blog') && (
                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                    {selectedItem.type === 'page' ? 'Page Title' : selectedItem.type === 'location' ? 'SEO Title' : 'Blog Title'}
                  </label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    placeholder="Enter page title (50-60 characters recommended)"
                  />
                  <p className="font-sans text-xs text-gray-500 mt-1">
                    {editData.title.length} characters
                    {editData.title.length > 60 && (
                      <span className="text-red-600 ml-2">⚠ Too long (recommended: 50-60)</span>
                    )}
                  </p>
                </div>
              )}

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Meta Description *
                </label>
                <textarea
                  value={editData.metaDescription}
                  onChange={(e) => setEditData({ ...editData, metaDescription: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Enter meta description (150-160 characters recommended)"
                />
                <p className="font-sans text-xs text-gray-500 mt-1">
                  {editData.metaDescription.length} characters
                  {editData.metaDescription.length > 160 ? (
                    <span className="text-red-600 ml-2">⚠ Too long (recommended: 150-160)</span>
                  ) : editData.metaDescription.length < 120 ? (
                    <span className="text-yellow-600 ml-2">⚠ Too short (recommended: 150-160)</span>
                  ) : (
                    <span className="text-green-600 ml-2">✓ Good length</span>
                  )}
                </p>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={editData.metaKeywords}
                  onChange={(e) => setEditData({ ...editData, metaKeywords: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="font-sans text-xs text-gray-500 mt-1">
                  Separate keywords with commas. Include location and service names for better SEO.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setEditMode(false);
                  setSelectedItem(null);
                  setMessage('');
                }}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={saving || !editData.metaDescription}
              >
                {saving ? (
                  <>
                    <RefreshCw size={16} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOManager;
