import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import SectionCard from './SectionCard';

const SECTION_TYPES = [
  { value: 'hero', label: 'Hero', color: 'bg-blue-100 text-blue-800' },
  { value: 'overview', label: 'Overview', color: 'bg-purple-100 text-purple-800' },
  { value: 'benefits', label: 'Benefits', color: 'bg-green-100 text-green-800' },
  { value: 'process', label: 'Process', color: 'bg-orange-100 text-orange-800' },
  { value: 'audience', label: 'Audience', color: 'bg-pink-100 text-pink-800' },
  { value: 'pricing', label: 'Pricing', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'faq', label: 'FAQ', color: 'bg-amber-100 text-amber-800' },
  { value: 'testimonials', label: 'Testimonials', color: 'bg-teal-100 text-teal-800' },
  { value: 'footer_note', label: 'Footer Note', color: 'bg-gray-100 text-gray-800' },
];

const IMAGE_ENABLED_SECTION_TYPES = ['hero', 'overview', 'benefits', 'process', 'faq', 'testimonials'];

/**
 * Sections Tab - Manage service sections
 */
const SectionsTab = ({ serviceData, onUpdate }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const sections = serviceData.sections || [];
  const imageEnabledLabels = SECTION_TYPES
    .filter((type) => IMAGE_ENABLED_SECTION_TYPES.includes(type.value))
    .map((type) => type.label)
    .join(', ');

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order values
    const updatedSections = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    onUpdate({ ...serviceData, sections: updatedSections });
  };

  const handleAddSection = (type) => {
    const newSection = {
      _id: `temp-${Date.now()}`,
      type,
      heading: 'New Section',
      visible: true,
      order: sections.length,
      background: 'light',
      content: getDefaultContent(type),
    };

    onUpdate({
      ...serviceData,
      sections: [...sections, newSection],
    });

    setShowAddModal(false);
  };

  const handleUpdateSection = (index, updatedSection) => {
    const updatedSections = [...sections];
    updatedSections[index] = updatedSection;
    onUpdate({ ...serviceData, sections: updatedSections });
  };

  const handleDeleteSection = (index) => {
    if (confirm('Are you sure you want to delete this section?')) {
      const updatedSections = sections.filter((_, i) => i !== index);
      onUpdate({ ...serviceData, sections: updatedSections });
    }
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'hero':
        return {
          subheading: '',
          description: '',
          ctaText: '',
          ctaLink: '',
          backgroundImageUrl: '',
        };
      case 'overview':
        return { body: '', imageUrl: '', imageAlt: '', imagePosition: 'top' };
      case 'benefits':
        return { imageUrl: '', imageAlt: '', imagePosition: 'top', items: [] };
      case 'process':
        return { imageUrl: '', imageAlt: '', imagePosition: 'top', steps: [] };
      case 'audience':
        return { body: '', tags: [] };
      case 'pricing':
        return { tiers: [] };
      case 'faq':
        return { imageUrl: '', imageAlt: '', imagePosition: 'top', items: [] };
      case 'testimonials':
        return { items: [] };
      case 'footer_note':
        return { text: '' };
      default:
        return {};
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Content Sections</h2>
            <p className="text-sm text-gray-500 mt-1">
              Drag to reorder, click to edit content
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Section
          </button>
        </div>

        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-900">Image Support (Admin Controlled)</p>
          <p className="mt-1 text-sm text-blue-800">
            You can add images in: {imageEnabledLabels}.
          </p>
          <p className="mt-1 text-xs text-blue-700">
            For Overview, Benefits, Process, and FAQ, admin can choose image position (top, left, right, bottom).
            Hero uses background image, and Testimonials support per-testimonial photos.
          </p>
        </div>

        {/* Sections List */}
        {sections.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-full w-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">No sections yet</h3>
            <p className="text-sm text-gray-500 mb-4">
              Get started by adding your first section
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Section
            </button>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-3"
                >
                  {sections.map((section, index) => (
                    <Draggable
                      key={section._id}
                      draggableId={section._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <SectionCard
                            section={section}
                            index={index}
                            dragHandleProps={provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                            onUpdate={(updated) => handleUpdateSection(index, updated)}
                            onDelete={() => handleDeleteSection(index)}
                            sectionTypes={SECTION_TYPES}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}

        {/* Add Section Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Add New Section
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {SECTION_TYPES.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handleAddSection(type.value)}
                      className="text-left p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${type.color}`}
                      >
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="mt-4 w-full py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionsTab;
