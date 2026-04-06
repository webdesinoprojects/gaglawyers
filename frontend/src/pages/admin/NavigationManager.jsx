import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';
import API_BASE_URL from '../../config/api';

const NavigationManager = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('header');
  const [menuData, setMenuData] = useState({
    menuLocation: 'header',
    menuName: '',
    items: [],
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMenus();
  }, []);

  useEffect(() => {
    if (selectedMenu) {
      fetchMenuByLocation(selectedMenu);
    }
  }, [selectedMenu]);

  const fetchMenus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cms/navigation`);
      const data = await response.json();
      if (data.success) {
        setMenus(data.data);
      }
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  const fetchMenuByLocation = async (location) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cms/navigation/${location}`);
      const data = await response.json();
      if (data.success) {
        setMenuData(data.data);
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const handleAddItem = () => {
    setMenuData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          label: '',
          url: '',
          order: prev.items.length,
          isVisible: true,
          openInNewTab: false,
          children: [],
        },
      ],
    }));
  };

  const handleItemChange = (index, field, value) => {
    setMenuData(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleRemoveItem = (index) => {
    setMenuData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/cms/navigation/${menuData.menuLocation}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(menuData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Menu saved successfully!');
        fetchMenus();
      } else {
        alert(data.message || 'Error saving menu');
      }
    } catch (error) {
      console.error('Error saving menu:', error);
      alert('Error saving menu');
    } finally {
      setLoading(false);
    }
  };

  const menuLocations = [
    { value: 'header', label: 'Header Navigation' },
    { value: 'footer-primary', label: 'Footer - Primary' },
    { value: 'footer-secondary', label: 'Footer - Secondary' },
    { value: 'footer-legal', label: 'Footer - Legal' },
    { value: 'mobile', label: 'Mobile Menu' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">Navigation Manager</h1>
        <p className="text-gray-600 mt-2">Manage site navigation menus</p>
      </div>

      {/* Menu Location Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Menu Location
        </label>
        <select
          value={selectedMenu}
          onChange={(e) => setSelectedMenu(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          {menuLocations.map(loc => (
            <option key={loc.value} value={loc.value}>{loc.label}</option>
          ))}
        </select>
      </div>

      {/* Menu Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menu Name
            </label>
            <input
              type="text"
              value={menuData.menuName}
              onChange={(e) => setMenuData(prev => ({ ...prev, menuName: e.target.value }))}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy/20 focus:border-navy"
              placeholder="Main Navigation"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-navy">Menu Items</h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-all flex items-center gap-2"
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>

            <div className="space-y-4">
              {menuData.items && menuData.items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <GripVertical className="w-5 h-5 text-gray-400 mt-2 cursor-move" />
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Label
                        </label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => handleItemChange(index, 'label', e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Home"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          URL
                        </label>
                        <input
                          type="text"
                          value={item.url}
                          onChange={(e) => handleItemChange(index, 'url', e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="/"
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.isVisible}
                            onChange={(e) => handleItemChange(index, 'isVisible', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">Visible</span>
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.openInNewTab}
                            onChange={(e) => handleItemChange(index, 'openInNewTab', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">New Tab</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {(!menuData.items || menuData.items.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                No menu items. Click "Add Item" to create one.
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={menuData.isActive}
              onChange={(e) => setMenuData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium text-gray-700">
              Menu Active
            </label>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-navy text-white rounded-lg hover:bg-navy/90 transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NavigationManager;
