import React, { useEffect, useState } from 'react';
import { Users, Briefcase, MessageSquare, BookOpen, TrendingUp, Eye, Calendar, ArrowUpRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../config/api';

function formatRelativeTime(iso) {
  const d = new Date(iso);
  const sec = Math.round((Date.now() - d.getTime()) / 1000);
  if (sec < 45) return 'Just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} minute${min === 1 ? '' : 's'} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr === 1 ? '' : 's'} ago`;
  const day = Math.floor(hr / 24);
  if (day < 14) return `${day} day${day === 1 ? '' : 's'} ago`;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

const feedIconByType = {
  blog: BookOpen,
  team: Users,
  contact: MessageSquare,
  service: Briefcase,
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    team: 0,
    teamAddedThisMonth: 0,
    services: 0,
    contacts: 0,
    blog: 0,
  });
  const [feed, setFeed] = useState([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const [feedError, setFeedError] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchActivityFeed();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const [teamRes, servicesRes, contactsRes, blogRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/team`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/api/services`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/api/contact`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/api/blog`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const teamData = await teamRes.json();
      const servicesData = await servicesRes.json();
      const contactsData = await contactsRes.json();
      const blogData = await blogRes.json();

      setStats({
        team: teamData.count || 0,
        teamAddedThisMonth: teamData.addedThisMonth || 0,
        services: servicesData.count || 0,
        contacts: contactsData.count || 0,
        blog: blogData.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchActivityFeed = async () => {
    const token = localStorage.getItem('adminToken');
    setFeedLoading(true);
    setFeedError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/dashboard/feed`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to load activity');
      }
      setFeed(Array.isArray(json.data) ? json.data : []);
    } catch (err) {
      console.error('Error fetching dashboard feed:', err);
      setFeedError(err.message || 'Could not load recent activity');
      setFeed([]);
    } finally {
      setFeedLoading(false);
    }
  };

  const statCards = [
    { 
      title: 'Team Members', 
      value: stats.team, 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: stats.teamAddedThisMonth > 0 ? `+${stats.teamAddedThisMonth} this month` : 'No new members',
      link: '/admin/team'
    },
    { 
      title: 'Services', 
      value: stats.services, 
      icon: Briefcase, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: 'All active',
      link: '/admin/services'
    },
    { 
      title: 'Contact Forms', 
      value: stats.contacts, 
      icon: MessageSquare, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: stats.contacts > 0 ? `${stats.contacts} ${stats.contacts === 1 ? 'inquiry' : 'inquiries'}` : 'No new inquiries',
      link: '/admin/contacts'
    },
    { 
      title: 'Blog Posts', 
      value: stats.blog, 
      icon: BookOpen, 
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      change: `${stats.blog} published`,
      link: '/admin/blog'
    },
  ];

  const quickActions = [
    { title: 'Create Blog Post', description: 'Write and publish new content', link: '/admin/blog', icon: BookOpen, color: 'text-orange-600' },
    { title: 'Add Team Member', description: 'Add new lawyer to the team', link: '/admin/team', icon: Users, color: 'text-blue-600' },
    { title: 'Manage Gallery', description: 'Upload and organize images', link: '/admin/gallery', icon: Eye, color: 'text-purple-600' },
    { title: 'Site Settings', description: 'Configure website settings', link: '/admin/settings', icon: TrendingUp, color: 'text-green-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-navy mb-2">Welcome back!</h1>
        <p className="font-sans text-gray-600">Here's what's happening with your website today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={stat.textColor} size={24} />
                </div>
                <ArrowUpRight className="text-gray-400 group-hover:text-navy transition-colors" size={20} />
              </div>
              <div>
                <p className="font-sans text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="font-serif text-3xl font-bold text-navy mb-2">{stat.value}</p>
                <p className="font-sans text-xs text-gray-500">{stat.change}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-serif text-xl font-bold text-navy mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className="group p-4 border border-gray-200 rounded-lg hover:border-navy hover:shadow-sm transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Icon className={`${action.color} group-hover:scale-110 transition-transform`} size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans font-semibold text-navy mb-1 group-hover:text-gold transition-colors">
                        {action.title}
                      </p>
                      <p className="font-sans text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent activity — live from blog, team, contacts, services */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between gap-3 mb-6">
            <h3 className="font-serif text-xl font-bold text-navy">Recent Activity</h3>
            <button
              type="button"
              onClick={() => fetchActivityFeed()}
              className="font-sans text-xs font-medium text-navy/70 hover:text-navy underline-offset-2 hover:underline"
            >
              Refresh
            </button>
          </div>

          {feedLoading && (
            <div className="flex items-center justify-center py-12 text-gray-500 gap-2">
              <Loader2 className="animate-spin" size={20} />
              <span className="font-sans text-sm">Loading activity…</span>
            </div>
          )}

          {!feedLoading && feedError && (
            <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-800 font-sans">
              {feedError}
            </div>
          )}

          {!feedLoading && !feedError && feed.length === 0 && (
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
              No recent activity yet. Publish a blog post, add a team member, or receive a contact inquiry to see updates here.
            </p>
          )}

          {!feedLoading && !feedError && feed.length > 0 && (
            <div className="space-y-4">
              {feed.map((activity) => {
                const Icon = feedIconByType[activity.type] || BookOpen;
                return (
                  <Link
                    key={`${activity.type}-${activity.id}`}
                    to={activity.link || '/admin'}
                    className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0 group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-navy/10 transition-colors">
                      <Icon className="text-gray-600 group-hover:text-navy" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm text-gray-600">{activity.action}</p>
                      <p className="font-sans text-sm font-medium text-navy truncate group-hover:text-gold transition-colors">
                        {activity.item}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Calendar size={12} className="text-gray-400" />
                        <p className="font-sans text-xs text-gray-500">{formatRelativeTime(activity.at)}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gradient-to-br from-navy to-navy/90 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold mb-2">System Status</h3>
            <p className="font-sans text-sm text-white/80">All systems operational</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-sans text-sm">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
