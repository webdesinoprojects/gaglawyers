import React, { useState } from 'react';
import { GripVertical, Eye, EyeOff, ChevronDown, ChevronUp, Trash2, MapPin } from 'lucide-react';
import SectionContentFields from './SectionContentFields';

const LOCATION_APPEND_DEFAULTS = ['hero', 'benefits', 'process'];

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

  const locationAppendDefault = LOCATION_APPEND_DEFAULTS.includes(section.type);
  const locationAppendEffective = section.appendLocationToHeading !== null && section.appendLocationToHeading !== undefined
    ? section.appendLocationToHeading
    : locationAppendDefault;

  const handleLocationAppendToggle = () => {
    onUpdate({ ...section, appendLocationToHeading: !locationAppendEffective });
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

          {/* Location Page Title Control */}
          <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">
                  Append &ldquo;in City&rdquo; to heading on location pages
                </span>
              </div>
              <button
                type="button"
                onClick={handleLocationAppendToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  locationAppendEffective ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    locationAppendEffective ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {locationAppendEffective
                ? `Location pages will show: "${section.heading} in Delhi"`
                : `Location pages will show: "${section.heading}" (no city appended)`}
              {section.appendLocationToHeading === null || section.appendLocationToHeading === undefined
                ? ' (using default for this section type)'
                : ' (custom override)'}
            </p>
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
