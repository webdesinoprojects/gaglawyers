import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';
import API_BASE_URL from '../../config/api';

const PageBlockAssignmentManager = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [pageBlocks, setPageBlocks] = useState([]);
  const [availableBlocks, setAvailableBlocks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAvailableBlocks();
  }, []);

  useEffect(() => {
    if (selectedPage) {
      fetchPageBlocks();
    }
  }, [selectedPage]);

  const fetchAvailableBlocks = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/cms/reusable-blocks?isActive=true`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setAvailableBlocks(data.data);
      }
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }
  };

  const fetchPageBlocks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cms/page-blocks/${selectedPage}`);
      const data = await response.json();
      if (data.success) {
        setPageBlocks(data.data.blocks || []);
      }
    } catch (error) {
      console.error('Error fetching page blocks:', error);
    }
  };

  const handleAddBlock = async (blockId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/cms/page-blocks/${selectedPage}/blocks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          blockId,
          order: pageBlocks.length,
          isVisible: true,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Block added to page!');
        fetchPageBlocks();
      }
    } catch (error) {
      console.error('Error adding block:', error);
      alert('Error adding block');
    }
  };

  const handleRemoveBlock = async (blockId) => {
    if (!window.confirm('Remove this block from the page?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/cms/page-blocks/${selectedPage}/blocks/${blockId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        alert('Block removed from page!');
        fetchPageBlocks();
      }
    } catch (error) {
      console.error('Error removing block:', error);
      alert('Error removing block');
    }
  };

  const handleToggleVisibility = async (index) => {
    const updatedBlocks = [...pageBlocks];
    updatedBlocks[index].isVisible = !updatedBlocks[index].isVisible;
    await savePageBlocks(updatedBlocks);
  };

  const handleMoveBlock = async (index, direction) => {
    const updatedBlocks = [...pageBlocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= updatedBlocks.length) return;

    [updatedBlocks[index], updatedBlocks[targetIndex]] = [updatedBlocks[targetIndex], updatedBlocks[index]];
    
    updatedBlocks.forEach((block, i) => {
      block.order = i;
    });

    await savePageBlocks(updatedBlocks);
  };

  const savePageBlocks = async (blocks) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/cms/page-blocks/${selectedPage}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ blocks }),
      });

      const data = await response.json();
      if (data.success) {
        fetchPageBlocks();
      }
    } catch (error) {
      console.error('Error saving blocks:', error);
      alert('Error saving blocks');
    } finally {
      setLoading(false);
    }
  };

  const pages = [
    { value: 'home', label: 'Home Page' },
    { value: 'about', label: 'About Page' },
    { value: 'services', label: 'Services Page' },
    { value: 'contact', label: 'Contact Page' },
    { value: 'firm', label: 'Firm Page' },
    { value: 'team', label: 'Team Page' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">Page Block Assignment</h1>
        <p className="text-gray-600 mt-2">Assign and order blocks for each page</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Page
        </label>
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          {pages.map(page => (
            <option key={page.value} value={page.value}>{page.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Page Blocks */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-navy mb-4">Current Page Blocks</h2>
          
          {pageBlocks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No blocks assigned to this page</p>
          ) : (
            <div className="space-y-3">
              {pageBlocks.map((block, index) => (
                <div
                  key={block._id}
                  className="border border-gray-200 rounded-lg p-4 flex items-center gap-3"
                >
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleMoveBlock(index, 'up')}
                      disabled={index === 0}
                      className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      onClick={() => handleMoveBlock(index, 'down')}
                      disabled={index === pageBlocks.length - 1}
                      className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-navy">
                      {block.blockId?.blockName || 'Unknown Block'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {block.blockId?.blockType} • Order: {block.order}
                    </p>
                  </div>

                  <button
                    onClick={() => handleToggleVisibility(index)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    {block.isVisible ? (
                      <Eye size={18} className="text-green-600" />
                    ) : (
                      <EyeOff size={18} className="text-gray-400" />
                    )}
                  </button>

                  <button
                    onClick={() => handleRemoveBlock(block.blockId._id)}
                    className="p-2 hover:bg-red-50 rounded text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Blocks */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-navy mb-4">Available Blocks</h2>
          
          <div className="space-y-3">
            {availableBlocks.map((block) => {
              const isAssigned = pageBlocks.some(pb => pb.blockId?._id === block._id);
              
              return (
                <div
                  key={block._id}
                  className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-navy">{block.blockName}</h3>
                    <p className="text-sm text-gray-500">{block.blockType}</p>
                  </div>

                  <button
                    onClick={() => handleAddBlock(block._id)}
                    disabled={isAssigned}
                    className="px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Plus size={16} />
                    {isAssigned ? 'Added' : 'Add'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBlockAssignmentManager;
