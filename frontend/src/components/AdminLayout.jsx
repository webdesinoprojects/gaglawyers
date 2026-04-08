import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Award,
  Image,
  BookOpen,
  Star,
  Settings,
  MapPin,
  LogOut,
  Menu,
  X,
  Briefcase,
  MessageSquare,
  ChevronRight,
  Search,
  User,
  Loader2,
} from 'lucide-react';
import API_BASE_URL from '../config/api';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (!token) {
      navigate('/admin/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const debounceTimer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const performSearch = async (query) => {
    setIsSearching(true);
    const token = localStorage.getItem('adminToken');
    const results = [];

    try {
      const [servicesRes, teamRes, blogRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/services`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/api/team`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/api/blog`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const servicesData = await servicesRes.json();
      const teamData = await teamRes.json();
      const blogData = await blogRes.json();

      const lowerQuery = query.toLowerCase();

      if (servicesData.success && servicesData.data) {
        servicesData.data
          .filter(item => 
            item.name?.toLowerCase().includes(lowerQuery) ||
            item.title?.toLowerCase().includes(lowerQuery) ||
            item.shortDescription?.toLowerCase().includes(lowerQuery)
          )
          .slice(0, 5)
          .forEach(item => {
            results.push({
              type: 'Service',
              icon: Briefcase,
              title: item.name || item.title,
              subtitle: item.category,
              path: '/admin/services',
            });
          });
      }

      if (teamData.success && teamData.data) {
        teamData.data
          .filter(item => 
            item.name?.toLowerCase().includes(lowerQuery) ||
            item.position?.toLowerCase().includes(lowerQuery)
          )
          .slice(0, 5)
          .forEach(item => {
            results.push({
              type: 'Team Member',
              icon: Users,
              title: item.name,
              subtitle: item.position,
              path: '/admin/team',
            });
          });
      }

      if (blogData.success && blogData.data) {
        blogData.data
          .filter(item => 
            item.title?.toLowerCase().includes(lowerQuery) ||
            item.excerpt?.toLowerCase().includes(lowerQuery)
          )
          .slice(0, 5)
          .forEach(item => {
            results.push({
              type: 'Blog Post',
              icon: BookOpen,
              title: item.title,
              subtitle: item.author,
              path: '/admin/blog',
            });
          });
      }

      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const menuSections = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'Content Management',
      items: [
        { name: 'Blog Posts', path: '/admin/blog', icon: BookOpen },
        { name: 'Team Members', path: '/admin/team', icon: Users },
        { name: 'Services', path: '/admin/services', icon: Briefcase },
        { name: 'Gallery', path: '/admin/gallery', icon: Image },
        { name: 'Awards', path: '/admin/awards', icon: Award },
        { name: 'Reviews', path: '/admin/reviews', icon: Star },
      ],
    },
    {
      title: 'Pages & SEO',
      items: [
        { name: 'Page Content', path: '/admin/pages', icon: FileText },
        { name: 'Location Pages', path: '/admin/locations', icon: MapPin },
        { name: 'SEO Manager', path: '/admin/seo', icon: Search },
      ],
    },
    {
      title: 'Communication',
      items: [
        { name: 'Contact Forms', path: '/admin/contacts', icon: MessageSquare },
      ],
    },
    {
      title: 'Configuration',
      items: [
        { name: 'Site Settings', path: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
          isSidebarOpen ? 'w-72' : 'w-20'
        }`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          {isSidebarOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-navy to-gold rounded-lg flex items-center justify-center">
                <span className="font-serif text-white font-bold text-sm">G</span>
              </div>
              <div>
                <h1 className="font-serif text-lg font-bold text-navy">GAG Lawyers</h1>
                <p className="font-sans text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X size={20} className="text-gray-600" /> : <Menu size={20} className="text-gray-600" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="py-6 px-3 overflow-y-auto h-[calc(100vh-8rem)]">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {isSidebarOpen && (
                <h3 className="px-3 mb-2 font-sans text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all group ${
                        isActive
                          ? 'bg-navy text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      title={item.name}
                    >
                      <Icon size={20} className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-navy'} />
                      {isSidebarOpen && (
                        <>
                          <span className="font-sans text-sm font-medium flex-1">{item.name}</span>
                          {isActive && <ChevronRight size={16} />}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
          {user && (
            <div className="p-4">
              {isSidebarOpen ? (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy to-gold flex items-center justify-center">
                    <span className="font-sans text-white font-semibold text-sm">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium text-navy truncate">{user.name}</p>
                    <p className="font-sans text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} className="text-gray-500" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} className="text-gray-500 mx-auto" />
                </button>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-72' : 'ml-20'
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl" ref={searchInputRef}>
              <div className="relative">
                {isSearching ? (
                  <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy animate-spin" size={20} />
                ) : (
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                )}
                <input
                  type="text"
                  placeholder="Search services, team, blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                />
                
                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                    <div className="p-3 border-b border-gray-100">
                      <p className="font-sans text-xs font-semibold text-gray-500 uppercase">
                        Search Results ({searchResults.length})
                      </p>
                    </div>
                    {searchResults.map((result, index) => {
                      const Icon = result.icon;
                      return (
                        <button
                          key={result.path}
                          onClick={() => handleSearchResultClick(result.path)}
                          className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 text-left"
                        >
                          <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon size={20} className="text-navy" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-sm font-medium text-navy truncate">
                              {result.title}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-sans font-medium">
                                {result.type}
                              </span>
                              {result.subtitle && (
                                <span className="font-sans text-xs text-gray-500 truncate">
                                  {result.subtitle}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* No Results */}
                {showSearchResults && searchQuery.trim().length >= 2 && searchResults.length === 0 && !isSearching && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-8 text-center z-50">
                    <Search size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="font-sans text-sm text-gray-600 mb-1">No results found</p>
                    <p className="font-sans text-xs text-gray-400">Try searching with different keywords</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* User Menu */}
              {user && (
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                  <div className="text-right">
                    <p className="font-sans text-sm font-medium text-navy">{user.name}</p>
                    <p className="font-sans text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy to-gold flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
