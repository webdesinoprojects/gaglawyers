# Cloudinary Image Upload Integration Guide

## Overview

All images in the GAG Lawyers website are stored on Cloudinary instead of the local server or database. This provides:
- **Better Performance:** Images are served from Cloudinary's CDN
- **Automatic Optimization:** Images are compressed and converted to optimal formats
- **Scalability:** No server storage limitations
- **Cost Efficiency:** Only URLs are stored in the database, reducing database size

## Configuration

### 1. Environment Variables

Add these to your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Cloudinary Account Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the dashboard
3. Add them to your `.env` file

## How It Works

### Upload Flow

1. User selects an image in the frontend
2. Frontend sends image to `/api/cloudinary/upload` endpoint
3. Multer processes the multipart form data
4. Image is uploaded to Cloudinary (folder: `gaglawyers`)
5. Cloudinary returns the URL and publicId
6. Frontend receives both values
7. When creating/updating an entity, both `imageUrl` and `cloudinaryPublicId` are saved to database

### Automatic Image Optimization

Images are automatically optimized with:
- Max dimensions: 1200x1200 pixels (maintains aspect ratio)
- Quality: auto:good (Cloudinary's intelligent quality adjustment)
- Format: auto (serves WebP to supported browsers, falls back to original format)
- Max file size: 5MB

### Automatic Cleanup

Images are automatically deleted from Cloudinary when:
1. **Entity Deletion:** When a team member, gallery image, blog post, etc. is deleted
2. **Image Replacement:** When updating an entity with a new image

This prevents orphaned images and saves storage costs.

## Usage Examples

### Frontend - Using ImageUploader Component

```jsx
import ImageUploader from '../components/ImageUploader';

function CreateTeamMember() {
  const [imageUrl, setImageUrl] = useState('');
  const [publicId, setPublicId] = useState('');

  const handleImageUpload = (url, publicId) => {
    setImageUrl(url);
    setPublicId(publicId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      name: 'John Doe',
      designation: 'Partner',
      bio: 'Bio text...',
      imageUrl: imageUrl,
      cloudinaryPublicId: publicId,
    };

    // Send to API...
  };

  return (
    <form onSubmit={handleSubmit}>
      <ImageUploader 
        onImageUploaded={handleImageUpload}
        label="Upload Team Member Photo"
      />
      {/* Other form fields */}
    </form>
  );
}
```

### Backend - Direct Upload Endpoint

```javascript
// POST /api/cloudinary/upload
// Headers: Authorization: Bearer <token>
// Body: multipart/form-data with field 'image'

// Response:
{
  "success": true,
  "message": "Image uploaded successfully to Cloudinary",
  "data": {
    "url": "https://res.cloudinary.com/dmp2lsw2b/image/upload/v1234567890/gaglawyers/abc123.jpg",
    "publicId": "gaglawyers/abc123",
    "width": 1200,
    "height": 800,
    "format": "jpg",
    "size": 245678
  }
}
```

### Backend - Manual Upload (if needed)

```javascript
const cloudinary = require('./config/cloudinary');

async function uploadImage(filePath) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'gaglawyers',
    transformation: [
      { width: 1200, height: 1200, crop: 'limit' },
      { quality: 'auto:good' },
      { fetch_format: 'auto' }
    ]
  });

  return {
    url: result.secure_url,
    publicId: result.public_id
  };
}
```

## Models with Image Support

All models that support images now include:
- `imageUrl` (or `featuredImage` for BlogPost) - The Cloudinary URL
- `cloudinaryPublicId` (or `featuredImagePublicId` for BlogPost) - For deletion

Models:
1. **TeamMember** - `imageUrl`, `cloudinaryPublicId`
2. **GalleryImage** - `imageUrl`, `cloudinaryPublicId`
3. **BlogPost** - `featuredImage`, `featuredImagePublicId`
4. **Review** - `imageUrl`, `cloudinaryPublicId`
5. **Award** - `imageUrl`, `cloudinaryPublicId`

## API Reference

### Upload Image

```
POST /api/cloudinary/upload
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

Body:
- image: (file) The image file to upload

Response:
{
  "success": true,
  "message": "Image uploaded successfully to Cloudinary",
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "gaglawyers/...",
    "width": 1200,
    "height": 800,
    "format": "jpg",
    "size": 245678
  }
}
```

### Delete Image

```
DELETE /api/cloudinary/delete
Authorization: Bearer <admin_token>
Content-Type: application/json

Body:
{
  "publicId": "gaglawyers/abc123"
}

Response:
{
  "success": true,
  "message": "Image deleted successfully"
}
```

## File Structure

```
backend/
├── config/
│   └── cloudinary.js                      # Cloudinary configuration
├── utils/
│   └── cloudinaryUpload.js                # Multer + Cloudinary storage setup
├── controllers/
│   └── cloudinaryUploadController.js      # Upload/delete handlers
└── routes/
    └── cloudinaryRoutes.js                # Upload/delete routes
```

## Troubleshooting

### "No file uploaded" Error
- Ensure the form field name is `image`
- Check that Content-Type is `multipart/form-data`
- Verify file size is under 5MB

### "Cloudinary configuration error"
- Verify environment variables are set correctly
- Check that Cloudinary credentials are valid
- Ensure `.env` file is in the backend root directory

### Images not deleting from Cloudinary
- Verify `cloudinaryPublicId` is being saved to database
- Check server logs for deletion errors
- Ensure publicId format is correct (e.g., `gaglawyers/abc123`)

## Best Practices

1. **Always store both URL and publicId** when saving images to database
2. **Use the ImageUploader component** in frontend for consistent UX
3. **Delete old images** when replacing or removing entities
4. **Validate file types** before uploading (handled automatically)
5. **Handle upload errors gracefully** in the UI
6. **Use appropriate image sizes** - images are limited to 1200x1200 to save bandwidth

## Security

- Image uploads require admin authentication
- File type validation prevents non-image uploads
- File size limit prevents abuse (5MB max)
- Cloudinary credentials are stored securely in environment variables
- Public IDs are scoped to the `gaglawyers` folder

## Migration from Local Storage

If you have existing images stored locally:

1. Upload each image to Cloudinary using the upload endpoint
2. Update the database record with the new Cloudinary URL and publicId
3. Delete the old local file

```javascript
// Migration script example
const fs = require('fs');
const cloudinary = require('./config/cloudinary');

async function migrateImage(localPath, entityId, Model) {
  const result = await cloudinary.uploader.upload(localPath, {
    folder: 'gaglawyers'
  });

  await Model.findByIdAndUpdate(entityId, {
    imageUrl: result.secure_url,
    cloudinaryPublicId: result.public_id
  });

  fs.unlinkSync(localPath);
}
```
