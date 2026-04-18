import React, { useState } from 'react';
import { GripVertical, Eye, EyeOff, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import SectionContentFields from './SectionContentFields';

/**
 * Section Card - Individual draggable section
 */
const SectionCard = ({
  section,
  index,
  dragHandleProps,
  isDragging,
  onUpdate,
  onDelete,
  sectionTypes,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sectionType = sectionTypes.find((t) => t.value === section.type);
  const colorClass = sectionType?.color || 'bg-gray-100 text-gray-800';

  const handleHeadingChange = (e) => {
    onUpdate({ ...section, heading: e.target.value });
  };

  const handleTypeChange = (e) => {
    onUpdate({ ...section, type: e.target.value });
  };

  const handleVisibilityToggle = () => {
    onUpdate({ ...section, visible: !section.visible });
  };

  const handleBackgroundChange = (e) => {
    onUpdate({ ...section, background: e.target.value });
  };

  const handleContentChange = (newContent) => {
    onUpdate({ ...section, content: newContent });
  };

  return (
    <div
      className={`bg-white border-2 rounded-lg transition-all ${
        isDragging
          ? 'border-blue-500 shadow-lg'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Section Header */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          {/* Drag Handle */}
          <div
            {...dragHandleProps}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
          >
            <GripVertical className="h-5 w-5" />
          </div>

          {/* Visibility Toggle */}
          <button
            onClick={handleVisibilityToggle}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title={section.visible ? 'Hide section' : 'Show section'}
          >
            {section.visible ? (
              <Eye className="h-5 w-5 text-green-600" />
            ) : (
              <EyeOff className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {/* Section Type Badge */}
          <span className={`px-2 py-1 rounded text-xs font-medium ${colorClass}`}>
            {sectionType?.label || section.type}
          </span>

          {/* Heading Input */}
          <input
            type="text"
            value={section.heading}
            onChange={handleHeadingChange}
            placeholder="Section heading..."
            className="flex-1 text-sm font-medium text-gray-900 border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-2 py-1 transition-colors"
          />

          {/* Type Selector */}
          <select
            value={section.type}
            onChange={handleTypeChange}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 focus:outline-none"
          >
            {sectionTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {/* Expand/Collapse */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          {/* Delete */}
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-600 transition-colors"
            title="Delete section"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {/* Background Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background
            </label>
            <select
              value={section.background}
              onChange={handleBackgroundChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="accent">Accent</option>
            </select>
          </div>

          {/* Content Fields */}
          <SectionContentFields
            type={section.type}
            content={section.content}
            onChange={handleContentChange}
          />
        </div>
      )}
    </div>
  );
};

export default SectionCard;
