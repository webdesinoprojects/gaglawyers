import React, { useEffect, useState } from 'react';
import { Upload, X, Loader } from 'lucide-react';
import API_BASE_URL from '../config/api';

const ImageUploader = ({
  onImageUploaded,
  currentImage = '',
  label = 'Upload Image',
  showOptionalLink = true,
  optionalLinkLabel = 'Optional image link',
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);
  const [linkValue, setLinkValue] = useState(currentImage);
  const [error, setError] = useState('');

  useEffect(() => {
    setPreview(currentImage || '');
    setLinkValue(currentImage || '');
  }, [currentImage]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('File must be an image');
      return;
    }

    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${API_BASE_URL}/api/cloudinary/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.status === 401) {
        setError('Session expired. Please logout and login again.');
        console.error('Auth error:', data);
        return;
      }

      if (data.success) {
        setPreview(data.data.url);
        onImageUploaded(data.data.url, data.data.publicId);
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (err) {
      setError('Network error. Make sure Cloudinary is configured.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    setLinkValue('');
    onImageUploaded('', '');
  };

  const handleOptionalLinkChange = (value) => {
    setLinkValue(value);
    setPreview(value);
    onImageUploaded(value, '');
  };

  return (
    <div>
      <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-sm">
          <p className="font-sans text-sm text-red-800">{error}</p>
        </div>
      )}

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-sm"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-sm cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center py-6">
            {uploading ? (
              <>
                <Loader className="w-12 h-12 text-navy animate-spin mb-3" />
                <p className="font-sans text-sm text-gray-600">Uploading to Cloudinary...</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mb-3" />
                <p className="font-sans text-sm text-gray-600 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="font-sans text-xs text-gray-500">
                  PNG, JPG, GIF or WebP (MAX. 5MB)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}

      {showOptionalLink && (
        <div className="mt-3">
          <label className="block font-sans text-xs font-medium text-gray-600 mb-1">
            {optionalLinkLabel}
          </label>
          <input
            type="text"
            value={linkValue}
            onChange={(e) => handleOptionalLinkChange(e.target.value)}
            placeholder="Paste image URL only if needed"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
