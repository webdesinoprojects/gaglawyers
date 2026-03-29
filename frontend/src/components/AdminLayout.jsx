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

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Page Content', path: '/admin/pages', icon: FileText },
    { name: 'Contact Forms', path: '/admin/contacts', icon: MessageSquare },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'Team Members', path: '/admin/team', icon: Users },
    { name: 'Awards', path: '/admin/awards', icon: Award },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Blog', path: '/admin/blog', icon: BookOpen },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
    { name: 'Location Pages', path: '/admin/locations', icon: MapPin },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-grey-light">
      <div className="flex">
        <aside
          className={`fixed top-0 left-0 h-full bg-navy text-white transition-all duration-300 z-40 ${
            isSidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          <div className="flex items-center justify-between h-20 px-4 border-b border-white/10">
            {isSidebarOpen && (
              <div className="flex items-center space-x-2">
                <span className="font-serif text-xl font-bold">GAG</span>
                <span className="font-serif text-xl font-light text-gold">Admin</span>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/10 rounded transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 transition-colors ${
                    isActive
                      ? 'bg-gold text-navy'
                      : 'text-white hover:bg-white/10'
                  }`}
                  title={item.name}
                >
                  <Icon size={20} />
                  {isSidebarOpen && (
                    <span className="font-sans text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-white hover:bg-white/10 rounded transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
              {isSidebarOpen && <span className="font-sans text-sm font-medium">Logout</span>}
            </button>
          </div>
        </aside>

        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-20'
          }`}
        >
          <header className="bg-white shadow-sm h-20 flex items-center px-6 sticky top-0 z-30">
            <div className="flex items-center justify-between w-full">
              <h2 className="font-serif text-2xl font-bold text-navy">
                Content Management
              </h2>
              {user && (
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-sans text-sm font-medium text-navy">{user.name}</p>
                    <p className="font-sans text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center">
                    <span className="font-sans text-white font-semibold">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </header>

          <main className="p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
