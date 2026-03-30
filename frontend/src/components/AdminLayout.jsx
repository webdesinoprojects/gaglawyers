import React, { useState, useEffect } from 'react';
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
  Bell,
  Search,
  User,
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (!token) {
      navigate('/admin/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
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
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

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
