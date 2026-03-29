# GAG Lawyers - Backend API

Backend API for GAG Lawyers (Grover & Grover Advocates) built with Node.js, Express, and MongoDB.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gaglawyers
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

# Cloudinary Configuration (required for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=contact@gaglawyers.com
```

**Important:** All images are uploaded to Cloudinary. Make sure to configure your Cloudinary credentials before using image upload features.

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS/Linux
mongod

# Windows
net start MongoDB
```

### 4. Run the Server

Development mode with auto-restart:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin (first user)

### Team Members
- `GET /api/team` - Get all team members
- `POST /api/team` - Create team member (admin only)
- `PUT /api/team/:id` - Update team member (admin only)
- `DELETE /api/team/:id` - Delete team member (admin only)

### Services
- `GET /api/services` - Get all practice areas/services
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Contact Inquiries
- `POST /api/contact` - Submit a new contact inquiry

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "serviceOfInterest": "Corporate Law",
  "message": "I need consultation regarding..."
}
```

### Image Uploads (Cloudinary)
- `POST /api/cloudinary/upload` - Upload image to Cloudinary (admin only)
  - Accepts multipart/form-data with field name: `image`
  - Returns: `{ url, publicId, width, height, format, size }`
  - Max file size: 5MB
  - Allowed formats: jpg, jpeg, png, gif, webp
  - Images are automatically optimized and stored in the `gaglawyers` folder
- `DELETE /api/cloudinary/delete` - Delete image from Cloudinary (admin only)
  - Request body: `{ publicId: "gaglawyers/xxxx" }`

### Gallery
- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery` - Create gallery image (admin only)
- `PUT /api/gallery/:id` - Update gallery image (admin only)
- `DELETE /api/gallery/:id` - Delete gallery image (admin only)

### Blog Posts
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get single blog post by slug
- `POST /api/blog` - Create blog post (admin only)
- `PUT /api/blog/:id` - Update blog post (admin only)
- `DELETE /api/blog/:id` - Delete blog post (admin only)

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review (admin only)
- `PUT /api/reviews/:id` - Update review (admin only)
- `DELETE /api/reviews/:id` - Delete review (admin only)

### Awards
- `GET /api/awards` - Get all awards
- `POST /api/awards` - Create award (admin only)
- `PUT /api/awards/:id` - Update award (admin only)
- `DELETE /api/awards/:id` - Delete award (admin only)

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── contactController.js
│   ├── serviceController.js
│   └── teamController.js
├── models/
│   ├── ContactInquiry.js
│   ├── Service.js
│   └── TeamMember.js
├── routes/
│   ├── contactRoutes.js
│   ├── serviceRoutes.js
│   └── teamRoutes.js
├── .env.example
├── package.json
└── server.js
```

## Models

### TeamMember
- name (String, required)
- designation (String, required)
- bio (String, required)
- imageUrl (String, required) - Cloudinary URL
- cloudinaryPublicId (String) - For image deletion
- order (Number, default: 0)

### Service
- title (String, required)
- description (String, required)
- iconName (String, required)
- order (Number, default: 0)

### ContactInquiry
- name (String, required)
- email (String, required)
- phone (String, required)
- serviceOfInterest (String, required)
- message (String, required)
- status (String, enum: ['new', 'in-progress', 'resolved'])

### GalleryImage
- title (String, required)
- imageUrl (String, required) - Cloudinary URL
- cloudinaryPublicId (String) - For image deletion
- category (String, default: 'general')
- description (String)
- order (Number, default: 0)
- isPublished (Boolean, default: true)

### BlogPost
- title (String, required)
- slug (String, required, unique)
- excerpt (String, required)
- content (String, required)
- featuredImage (String) - Cloudinary URL
- featuredImagePublicId (String) - For image deletion
- author (ObjectId, ref: 'User')
- category (String, default: 'legal-news')
- tags (Array of Strings)
- isPublished (Boolean, default: false)
- publishedAt (Date)
- views (Number, default: 0)

### Review
- clientName (String, required)
- designation (String)
- content (String, required)
- rating (Number, 1-5, default: 5)
- imageUrl (String) - Cloudinary URL
- cloudinaryPublicId (String) - For image deletion
- order (Number, default: 0)
- isPublished (Boolean, default: true)
- isFeatured (Boolean, default: false)

### Award
- title (String, required)
- description (String)
- year (Number, required)
- issuingBody (String, required)
- imageUrl (String) - Cloudinary URL
- cloudinaryPublicId (String) - For image deletion
- order (Number, default: 0)
- isPublished (Boolean, default: true)

## Image Upload System

All images in the application are stored on Cloudinary for optimal performance and scalability.

### How It Works

1. **Upload Process:**
   - Images are uploaded via the `/api/cloudinary/upload` endpoint
   - Multer processes the multipart form data
   - Images are automatically uploaded to Cloudinary in the `gaglawyers` folder
   - Images are automatically optimized (quality: auto:good, max size: 1200x1200)
   - The endpoint returns both the URL and publicId

2. **Storage:**
   - Only the Cloudinary URL and publicId are stored in the database
   - No images are stored on the server or in MongoDB
   - This reduces database size and improves performance

3. **Deletion:**
   - When an entity with an image is deleted, the image is automatically removed from Cloudinary
   - When an entity's image is updated, the old image is automatically removed from Cloudinary
   - This prevents orphaned images and saves storage costs

4. **Frontend Integration:**
   - Use the `ImageUploader` component in the frontend
   - It automatically handles upload, preview, and passes both URL and publicId to parent components

### Configuration

Ensure these environment variables are set:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## License

ISC
