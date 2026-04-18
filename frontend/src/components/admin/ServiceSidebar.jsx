import React from 'react';
import { Search, Loader2, Plus, Trash2 } from 'lucide-react';

/**
 * Service Sidebar - Left panel with service list
 */
const ServiceSidebar = ({
  services,
  selectedSlug,
  onServiceSelect,
  loading,
  searchQuery,
  onSearchChange,
  totalCount,
  selectedServiceName,
  onCreateService,
  onDeleteService,
  canDeleteService,
  deletingService,
}) => {
  if (loading) {
    return (
      <div className="w-[280px] flex-shrink-0 border-r border-gray-200 bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-[280px] flex-shrink-0 border-r border-gray-200 bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Services</h2>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {totalCount}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={onCreateService}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
          <button
            onClick={onDeleteService}
            disabled={!canDeleteService || deletingService}
            title={selectedServiceName ? `Delete ${selectedServiceName}` : 'Select a service to delete'}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              canDeleteService && !deletingService
                ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
            }`}
          >
            <Trash2 className="h-4 w-4" />
            {deletingService ? 'Deleting...' : 'Delete'}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Service List */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {services.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            No services found
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {services.map((service) => {
              const isActive = service.slug === selectedSlug;
              const hasContent = service.sections && service.sections.length > 0;

              return (
                <button
                  key={service._id}
                  onClick={() => {
                    console.log('Service clicked:', service.slug);
                    onServiceSelect(service.slug);
                  }}
                  className={`w-full text-left rounded-lg p-3 transition-all ${
                    isActive
                      ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
                      : 'border-2 border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {/* Status Dot */}
                    <div className="mt-1.5">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          hasContent ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                    </div>

                    {/* Service Info */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium truncate ${
                          isActive ? 'text-blue-900' : 'text-gray-900'
                        }`}
                      >
                        {service.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate mt-0.5">
                        {service.slug}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSidebar;
