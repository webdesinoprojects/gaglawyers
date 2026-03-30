import React, { useState } from 'react';
import { X } from 'lucide-react';

const TagInput = ({ tags = [], onChange, label = 'Tags', placeholder = 'Add tag and press Enter' }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="border border-gray-300 rounded-sm p-2 min-h-[42px] flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 bg-navy text-white text-sm rounded-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:text-gold transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] outline-none font-sans text-sm"
        />
      </div>
      <p className="font-sans text-xs text-gray-500 mt-1">
        Press Enter or comma to add tags
      </p>
    </div>
  );
};

export default TagInput;
