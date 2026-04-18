import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ImageUploader from '../ImageUploader';

/**
 * Section Content Fields - Dynamic fields based on section type
 */
const SectionContentFields = ({ type, content, onChange }) => {
  const updateField = (field, value) => {
    onChange({ ...content, [field]: value });
  };

  const updateArrayItem = (field, index, value) => {
    const array = content[field] || [];
    const updated = [...array];
    updated[index] = value;
    onChange({ ...content, [field]: updated });
  };

  const addArrayItem = (field, defaultValue) => {
    const array = content[field] || [];
    onChange({ ...content, [field]: [...array, defaultValue] });
  };

  const removeArrayItem = (field, index) => {
    const array = content[field] || [];
    onChange({ ...content, [field]: array.filter((_, i) => i !== index) });
  };

  const renderSectionImageFields = (title = 'Section Image') => (
    <div className="space-y-2">
      <ImageUploader
        label={title}
        currentImage={content.imageUrl || ''}
        onImageUploaded={(url, publicId) =>
          onChange({
            ...content,
            imageUrl: url,
            imagePublicId: publicId || '',
          })
        }
        optionalLinkLabel="Optional image link"
      />
      <input
        type="text"
        value={content.imageAlt || ''}
        onChange={(e) => updateField('imageAlt', e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        placeholder="Image alt text (optional)"
      />
      <select
        value={content.imagePosition || 'top'}
        onChange={(e) => updateField('imagePosition', e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
      >
        <option value="top">Image Position: Top</option>
        <option value="left">Image Position: Left</option>
        <option value="right">Image Position: Right</option>
        <option value="bottom">Image Position: Bottom</option>
      </select>
    </div>
  );

  switch (type) {
    case 'hero':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subheading
            </label>
            <input
              type="text"
              value={content.subheading || ''}
              onChange={(e) => updateField('subheading', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Professional Legal Assistance"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Text
            </label>
            <input
              type="text"
              value={content.ctaText || ''}
              onChange={(e) => updateField('ctaText', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Get Free Consultation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hero Description
            </label>
            <textarea
              value={content.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Short paragraph shown below heading"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Link
            </label>
            <input
              type="text"
              value={content.ctaLink || ''}
              onChange={(e) => updateField('ctaLink', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="/contact"
            />
          </div>
          <div>
            <ImageUploader
              label="Background Image"
              currentImage={content.backgroundImageUrl || ''}
              onImageUploaded={(url, publicId) =>
                onChange({
                  ...content,
                  backgroundImageUrl: url,
                  backgroundImagePublicId: publicId || '',
                })
              }
            />
          </div>
        </div>
      );

    case 'overview':
      return (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body Text
          </label>
          <textarea
            value={content.body || ''}
            onChange={(e) => updateField('body', e.target.value)}
            rows={6}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            placeholder="Enter the overview content..."
          />
          {renderSectionImageFields('Overview Image')}
        </div>
      );

    case 'benefits':
      return (
        <div className="space-y-4">
          {renderSectionImageFields('Benefits Section Image')}
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Benefit Items
            </label>
            <button
              onClick={() =>
                addArrayItem('items', { icon: '', title: '', description: '' })
              }
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </button>
          </div>
          {(content.items || []).map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">
                  Item {index + 1}
                </span>
                <button
                  onClick={() => removeArrayItem('items', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <input
                type="text"
                value={item.icon || ''}
                onChange={(e) =>
                  updateArrayItem('items', index, { ...item, icon: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Icon name (e.g., Shield)"
              />
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) =>
                  updateArrayItem('items', index, { ...item, title: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Title"
              />
              <textarea
                value={item.description || ''}
                onChange={(e) =>
                  updateArrayItem('items', index, {
                    ...item,
                    description: e.target.value,
                  })
                }
                rows={2}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Description"
              />
            </div>
          ))}
        </div>
      );

    case 'process':
      return (
        <div className="space-y-4">
          {renderSectionImageFields('Process Section Image')}
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Process Steps
            </label>
            <button
              onClick={() =>
                addArrayItem('steps', {
                  stepNumber: (content.steps || []).length + 1,
                  title: '',
                  description: '',
                })
              }
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Step
            </button>
          </div>
          {(content.steps || []).map((step, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">
                  Step {step.stepNumber || index + 1}
                </span>
                <button
                  onClick={() => removeArrayItem('steps', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <input
                type="text"
                value={step.title || ''}
                onChange={(e) =>
                  updateArrayItem('steps', index, { ...step, title: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Step title"
              />
              <textarea
                value={step.description || ''}
                onChange={(e) =>
                  updateArrayItem('steps', index, {
                    ...step,
                    description: e.target.value,
                  })
                }
                rows={2}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Step description"
              />
            </div>
          ))}
        </div>
      );

    case 'faq':
      return (
        <div className="space-y-4">
          {renderSectionImageFields('FAQ Section Image')}
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              FAQ Items
            </label>
            <button
              onClick={() => addArrayItem('items', { question: '', answer: '' })}
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add FAQ
            </button>
          </div>
          {(content.items || []).map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">
                  FAQ {index + 1}
                </span>
                <button
                  onClick={() => removeArrayItem('items', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <input
                type="text"
                value={item.question || ''}
                onChange={(e) =>
                  updateArrayItem('items', index, { ...item, question: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Question"
              />
              <textarea
                value={item.answer || ''}
                onChange={(e) =>
                  updateArrayItem('items', index, { ...item, answer: e.target.value })
                }
                rows={3}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Answer"
              />
            </div>
          ))}
        </div>
      );

    case 'audience':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body Text
            </label>
            <textarea
              value={content.body || ''}
              onChange={(e) => updateField('body', e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Target audience description..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={(content.tags || []).join(', ')}
              onChange={(e) =>
                updateField(
                  'tags',
                  e.target.value.split(',').map((t) => t.trim())
                )
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Business Owners, Startups, Corporations"
            />
          </div>
        </div>
      );

    case 'pricing':
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Pricing Tiers
            </label>
            <button
              onClick={() =>
                addArrayItem('tiers', {
                  name: '',
                  price: '',
                  features: [],
                  highlighted: false,
                })
              }
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Tier
            </button>
          </div>
          {(content.tiers || []).map((tier, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">
                  Tier {index + 1}
                </span>
                <button
                  onClick={() => removeArrayItem('tiers', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <input
                type="text"
                value={tier.name || ''}
                onChange={(e) =>
                  updateArrayItem('tiers', index, { ...tier, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Tier name"
              />
              <input
                type="text"
                value={tier.price || ''}
                onChange={(e) =>
                  updateArrayItem('tiers', index, { ...tier, price: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Price (e.g., $99/month)"
              />
              <textarea
                value={(tier.features || []).join('\n')}
                onChange={(e) =>
                  updateArrayItem('tiers', index, {
                    ...tier,
                    features: e.target.value.split('\n').filter((f) => f.trim()),
                  })
                }
                rows={3}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Features (one per line)"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={tier.highlighted || false}
                  onChange={(e) =>
                    updateArrayItem('tiers', index, {
                      ...tier,
                      highlighted: e.target.checked,
                    })
                  }
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Highlight this tier</span>
              </label>
            </div>
          ))}
        </div>
      );

    case 'testimonials':
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Testimonials
            </label>
            <button
              onClick={() =>
                addArrayItem('items', { name: '', role: '', quote: '', photoUrl: '' })
              }
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Testimonial
            </button>
          </div>
          {(content.items || []).map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">
                  Testimonial {index + 1}
                </span>
                <button
                  onClick={() => removeArrayItem('items', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <input
                type="text"
                value={item.name || ''}
                onChange={(e) =>
                  updateArrayItem('items', index, { ...item, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Name"
              />
              <input
                type="text"
                value={item.role || ''}
                onChange={(e) =>
                  updateArrayItem('items', index, { ...item, role: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Role/Title"
              />
              <textarea
                value={item.quote || ''}
                onChange={(e) =>
                  updateArrayItem('items', index, { ...item, quote: e.target.value })
                }
                rows={3}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Quote"
              />
              <ImageUploader
                label="Photo"
                currentImage={item.photoUrl || ''}
                onImageUploaded={(url, publicId) =>
                  updateArrayItem('items', index, {
                    ...item,
                    photoUrl: url,
                    photoPublicId: publicId || '',
                  })
                }
                optionalLinkLabel="Optional photo link"
              />
            </div>
          ))}
        </div>
      );

    case 'footer_note':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note Text
          </label>
          <textarea
            value={content.text || ''}
            onChange={(e) => updateField('text', e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            placeholder="Footer note or disclaimer..."
          />
        </div>
      );

    default:
      return (
        <div className="text-sm text-gray-500">
          No content fields defined for this section type.
        </div>
      );
  }
};

export default SectionContentFields;
