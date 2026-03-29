# Cloudinary Image Storage Setup

## Why Cloudinary?

Your application stores image **URLs** in the database, not the actual image files. Images need to be hosted somewhere, and Cloudinary is the industry standard because:

✅ **Free tier** (25GB storage, 25GB bandwidth/month)  
✅ **Automatic optimization** (reduces image sizes)  
✅ **Global CDN** (fast loading worldwide)  
✅ **Image transformations** (resize, crop, format conversion)  
✅ **No server storage needed** (images persist across deployments)

## Current Implementation

The codebase supports **TWO upload methods**:

### 1. Local Storage (Development)
- Endpoint: `POST /api/upload`
- Files saved to: `backend/uploads/`
- Database stores: `/uploads/image-123.jpg`
- ⚠️ Not suitable for production

### 2. Cloudinary (Production)
- Endpoint: `POST /api/cloudinary/upload`
- Files saved to: Cloudinary cloud
- Database stores: `https://res.cloudinary.com/your-cloud/image/upload/v123/gaglawyers/image.jpg`
- ✅ Production-ready

## Setup Instructions

### Step 1: Create Cloudinary Account

1. Go to: https://cloudinary.com/users/register_free
2. Sign up (free tier is perfect)
3. Verify your email

### Step 2: Get Your Credentials

After logging in to Cloudinary Dashboard:

1. You'll see the **Dashboard** immediately
2. Look for the **"Product Environment Credentials"** section
3. You'll see three values:
   ```
   Cloud Name: dxxxxxxxx
   API Key: 123456789012345
   API Secret: xXxXxXxXxXxXxXxXxXxXx
   ```

### Step 3: Add Credentials to `.env`

Update your `backend/.env` file:

```env
CLOUDINARY_CLOUD_NAME=dxxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=xXxXxXxXxXxXxXxXxXxXx
```

### Step 4: Install Cloudinary Packages

Run in your backend folder:

```bash
cd backend
npm install cloudinary multer-storage-cloudinary
```

## How Images Are Stored

### In Database (MongoDB):
```javascript
{
  name: "Advocate Rajesh Grover",
  designation: "Senior Partner",
  imageUrl: "https://res.cloudinary.com/your-cloud/image/upload/v123/gaglawyers/member1.jpg"
}
```

Only the **URL** is stored, not the image file itself.

### In Cloudinary:
- Actual image files
- Organized in folders (e.g., `/gaglawyers/`)
- Automatically optimized
- Served via CDN

## API Usage

### Upload Image (Cloudinary)
```javascript
// Frontend
const formData = new FormData();
formData.append('image', file);

const response = await fetch('http://localhost:5000/api/cloudinary/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});

const data = await response.json();
// data.data.url = "https://res.cloudinary.com/..."
```

### Delete Image (Cloudinary)
```javascript
await fetch('http://localhost:5000/api/cloudinary/delete', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ publicId: 'gaglawyers/image-name' })
});
```

## Features Included

✅ **Auto-optimization**: Images compressed automatically  
✅ **Size limits**: Max 5MB per image  
✅ **Format validation**: Only jpg, png, gif, webp  
✅ **Transformation**: Auto-resize to max 1200x1200  
✅ **Folder organization**: All images in `/gaglawyers/` folder  
✅ **CDN delivery**: Fast loading globally  

## Sample Data

The seed script currently uses **external URLs** (Unsplash) for sample images, which is perfect because:
- No storage needed for development
- High-quality placeholder images
- Works immediately without setup

For production, you'll upload actual firm photos to Cloudinary.

## Migration Path

**Development**: Use external URLs (Unsplash) or local upload  
**Production**: Use Cloudinary for all new uploads

Both methods store URLs in the database, so switching is seamless!

## Cost

**Cloudinary Free Tier:**
- 25GB storage
- 25GB bandwidth/month
- 25,000 transformations/month

This is more than enough for a law firm website (typically 100-200 images).

## Next Steps

1. Create Cloudinary account
2. Copy the 3 credentials from dashboard
3. Add to `.env` file
4. Run `npm install cloudinary multer-storage-cloudinary` in backend
5. Start using `/api/cloudinary/upload` endpoint in admin panel

---

**Questions? The system is already built and ready - just add your Cloudinary credentials!**
