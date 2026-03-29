# Install Cloudinary - Critical Step

## You Need to Run This Command

Open a **NEW terminal** (don't close your running servers) and run:

```bash
cd backend
npm install cloudinary multer-storage-cloudinary
```

This will install the required packages for Cloudinary image uploads.

## After Installation

The server will automatically restart (nodemon) and Cloudinary will be enabled.

## Your Cloudinary Credentials (Already in .env)

Make sure these are filled in your `backend/.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

Get these from: https://console.cloudinary.com/console (Dashboard section)

## How It Works After Installation

All image uploads will:
1. Upload to Cloudinary cloud storage
2. Cloudinary returns a URL like: `https://res.cloudinary.com/your-cloud/image/upload/v123/gaglawyers/image.jpg`
3. This URL is stored in your MongoDB database
4. Images are optimized automatically
5. Served via Cloudinary's global CDN

## Verification

After installing, check terminal #3 for:
```
Server running in development mode on port 5000
MongoDB Connected
```

If you see errors, it means Cloudinary credentials in `.env` are incorrect.
