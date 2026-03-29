import React, { useEffect, useState } from 'react';
import { Users, Briefcase, MessageSquare, BookOpen, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    team: 0,
    services: 0,
    contacts: 0,
    blog: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const [teamRes, servicesRes, blogRes] = await Promise.all([
        fetch('http://localhost:5000/api/team', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('http://localhost:5000/api/services', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('http://localhost:5000/api/blog', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const teamData = await teamRes.json();
      const servicesData = await servicesRes.json();
      const blogData = await blogRes.json();

      setStats({
        team: teamData.count || 0,
        services: servicesData.count || 0,
        contacts: 0,
        blog: blogData.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    { title: 'Team Members', value: stats.team, icon: Users, color: 'bg-blue-500' },
    { title: 'Services', value: stats.services, icon: Briefcase, color: 'bg-green-500' },
    { title: 'Contact Forms', value: stats.contacts, icon: MessageSquare, color: 'bg-purple-500' },
    { title: 'Blog Posts', value: stats.blog, icon: BookOpen, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-navy mb-2">Dashboard</h1>
        <p className="font-sans text-gray-600">Welcome to your content management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-sm shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-sans text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="font-serif text-3xl font-bold text-navy">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-bold text-navy mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a
              href="/admin/blog"
              className="block p-4 bg-grey-light hover:bg-navy/5 rounded-sm transition-colors"
            >
              <p className="font-sans font-medium text-navy">Create New Blog Post</p>
            </a>
            <a
              href="/admin/team"
              className="block p-4 bg-grey-light hover:bg-navy/5 rounded-sm transition-colors"
            >
              <p className="font-sans font-medium text-navy">Add Team Member</p>
            </a>
            <a
              href="/admin/settings"
              className="block p-4 bg-grey-light hover:bg-navy/5 rounded-sm transition-colors"
            >
              <p className="font-sans font-medium text-navy">Update Site Settings</p>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6">
          <h3 className="font-serif text-xl font-bold text-navy mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 text-sm">
              <TrendingUp className="text-gold mt-1 flex-shrink-0" size={18} />
              <div>
                <p className="font-sans text-gray-700">Website analytics and activity will appear here</p>
                <p className="font-sans text-gray-500 text-xs mt-1">System ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
