import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceSidebar from '../../components/admin/ServiceSidebar';
import ServiceEditor from '../../components/admin/ServiceEditor';
import API_BASE_URL from '../../config/api';

/**
 * Service Manager - Main Admin Page
 * Manages all 56 services with section-based content
 */
const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingService, setLoadingService] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingService, setDeletingService] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    alert('Your admin session expired. Please login again.');
    navigate('/admin/login', { replace: true });
  };

  // Fetch all services on mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/services?includeInactive=true`);
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load service details when selected
  const handleServiceSelect = async (slug) => {
    console.log('handleServiceSelect called with slug:', slug);
    
    if (hasUnsavedChanges) {
      const confirm = window.confirm('You have unsaved changes. Do you want to discard them?');
      if (!confirm) return;
    }

    // Set loading state FIRST, then clear serviceData to force loading state
    setLoadingService(true);
    setServiceData(null); // Clear previous data to show loading state
    setSelectedServiceSlug(slug);
    setHasUnsavedChanges(false);

    try {
      console.log('Fetching service data for:', slug);
      const response = await fetch(`${API_BASE_URL}/api/services/${slug}?includeInactive=true`);
      const data = await response.json();
      console.log('Service data received:', data);

      if (data.success) {
        setServiceData(data.data);
        console.log('Service data set successfully');
      } else {
        console.error('API returned success: false');
      }
    } catch (error) {
      console.error('Error loading service:', error);
      setServiceData(null);
    } finally {
      setLoadingService(false);
    }
  };

  // Update service data (triggers unsaved changes)
  const handleServiceUpdate = (updatedData) => {
    setServiceData(updatedData);
    setHasUnsavedChanges(true);
  };

  // Save service changes
  const handleSave = async () => {
    if (!serviceData || !selectedServiceSlug) return;

    try {
      setSaving(true);
      const token = localStorage.getItem('adminToken'); // Fixed: was 'token', should be 'adminToken'

      if (!token) {
        console.error('No authentication token found');
        showToast('Authentication required. Please log in again.', 'error');
        setSaving(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/services/${selectedServiceSlug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: serviceData.name,
          isActive: Boolean(serviceData.isActive),
          shortDescription: serviceData.shortDescription || '',
          cardImageUrl: serviceData.cardImageUrl || '',
          cardImageAlt: serviceData.cardImageAlt || '',
          seo: serviceData.seo,
          globalSettings: serviceData.globalSettings,
          servicesPageSettings: serviceData.servicesPageSettings,
          sections: serviceData.sections,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (data.success) {
        setServiceData(data.data);
        setHasUnsavedChanges(false);
        showToast('Changes saved successfully!', 'success');
      } else {
        showToast(data.message || 'Failed to save changes', 'error');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      showToast('Error saving changes', 'error');
    } finally {
      setSaving(false);
    }
  };

  const toSlug = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');

  const handleCreateService = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      showToast('Authentication required. Please log in again.', 'error');
      return;
    }

    const nameInput = window.prompt('Enter new service name:');
    if (!nameInput) return;

    const name = nameInput.trim();
    if (!name) return;

    const defaultSlug = toSlug(name);
    const slugInput = window.prompt('Enter slug (optional):', defaultSlug);
    if (slugInput === null) return;

    const slug = toSlug(slugInput || defaultSlug);

    try {
      const response = await fetch(`${API_BASE_URL}/api/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, slug }),
      });

      const data = await response.json();
      if (!data.success) {
        showToast(data.message || 'Failed to create service', 'error');
        return;
      }

      await fetchServices();
      if (data.data?.slug) {
        await handleServiceSelect(data.data.slug);
      }
      showToast('Service created successfully!', 'success');
    } catch (error) {
      console.error('Error creating service:', error);
      showToast('Error creating service', 'error');
    }
  };

  const handleDeleteService = async () => {
    if (!selectedServiceSlug || !serviceData) return;

    if (hasUnsavedChanges) {
      const discard = window.confirm(
        'You have unsaved changes. Deleting now will discard them. Continue?'
      );
      if (!discard) return;
    }

    const confirmed = window.confirm(
      `Delete "${serviceData.name}" permanently?\n\nThis will remove the service and all its sections.`
    );
    if (!confirmed) return;

    const token = localStorage.getItem('adminToken');
    if (!token) {
      showToast('Authentication required. Please log in again.', 'error');
      return;
    }

    try {
      setDeletingService(true);
      const response = await fetch(`${API_BASE_URL}/api/services/${selectedServiceSlug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!data.success) {
        showToast(data.message || 'Failed to delete service', 'error');
        return;
      }

      setSelectedServiceSlug(null);
      setServiceData(null);
      setHasUnsavedChanges(false);
      await fetchServices();
      showToast('Service deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting service:', error);
      showToast('Error deleting service', 'error');
    } finally {
      setDeletingService(false);
    }
  };

  const handleToggleServiceActive = async (service, nextActive) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      showToast('Authentication required. Please log in again.', 'error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${service.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: nextActive }),
      });
      const data = await response.json();
      if (!data.success) {
        showToast(data.message || 'Failed to update service status', 'error');
        return;
      }
      setServices((prev) =>
        prev.map((row) =>
          row.slug === service.slug ? { ...row, isActive: nextActive } : row
        )
      );
      if (serviceData?.slug === service.slug) {
        setServiceData((prev) => (prev ? { ...prev, isActive: nextActive } : prev));
      }
    } catch (error) {
      console.error('Error toggling service status:', error);
      showToast('Error updating service status', 'error');
    }
  };

  const handleToggleServiceFeatured = async (service, nextFeatured) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      showToast('Authentication required. Please log in again.', 'error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${service.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          servicesPageSettings: {
            ...(service.servicesPageSettings || {}),
            isFeatured: nextFeatured,
          },
        }),
      });
      const data = await response.json();
      if (!data.success) {
        showToast(data.message || 'Failed to update featured status', 'error');
        return;
      }

      setServices((prev) =>
        prev.map((row) =>
          row.slug === service.slug
            ? {
                ...row,
                servicesPageSettings: {
                  ...(row.servicesPageSettings || {}),
                  isFeatured: nextFeatured,
                },
              }
            : row
        )
      );

      if (serviceData?.slug === service.slug) {
        setServiceData((prev) =>
          prev
            ? {
                ...prev,
                servicesPageSettings: {
                  ...(prev.servicesPageSettings || {}),
                  isFeatured: nextFeatured,
                },
              }
            : prev
        );
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
      showToast('Error updating featured status', 'error');
    }
  };

  // Simple toast notification
  const showToast = (message, type) => {
    // You can replace this with a proper toast library
    alert(message);
  };

  // Filter services by search query
  const filteredServices = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase();
    const matches = services.filter((service) =>
      service.name.toLowerCase().includes(normalizedQuery) ||
      service.slug.toLowerCase().includes(normalizedQuery)
    );

    return [...matches].sort((left, right) => {
      const leftOrder = Number(left?.servicesPageSettings?.displayOrder);
      const rightOrder = Number(right?.servicesPageSettings?.displayOrder);

      const leftHasOrder = Number.isFinite(leftOrder);
      const rightHasOrder = Number.isFinite(rightOrder);

      if (leftHasOrder && rightHasOrder && leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }
      if (leftHasOrder !== rightHasOrder) {
        return leftHasOrder ? -1 : 1;
      }

      return String(left?.name || '').localeCompare(String(right?.name || ''));
    });
  }, [services, searchQuery]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <ServiceSidebar
        services={filteredServices}
        selectedSlug={selectedServiceSlug}
        onServiceSelect={handleServiceSelect}
        loading={loading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={services.length}
        selectedServiceName={serviceData?.name || ''}
        onCreateService={handleCreateService}
        onDeleteService={handleDeleteService}
        canDeleteService={Boolean(selectedServiceSlug)}
        deletingService={deletingService}
        onToggleServiceActive={handleToggleServiceActive}
        onToggleServiceFeatured={handleToggleServiceFeatured}
      />

      {/* Right Panel - Editor */}
      <ServiceEditor
        serviceData={serviceData}
        loading={loadingService}
        saving={saving}
        hasUnsavedChanges={hasUnsavedChanges}
        onUpdate={handleServiceUpdate}
        onSave={handleSave}
      />
    </div>
  );
};

export default ServiceManager;
