# Getting Started with GAG Lawyers Application

This guide will help you set up and run the complete GAG Lawyers full-stack application.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

## Step-by-Step Setup

### 1. Start MongoDB

First, ensure MongoDB is running on your system:

**Windows:**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
mongod
```

Or use MongoDB Atlas (cloud) and update the `MONGO_URI` in the `.env` file accordingly.

### 2. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

The dependencies are already installed. If you need to reinstall:

```bash
npm install
```

Verify the `.env` file exists with the following content:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gaglawyers
NODE_ENV=development
```

Seed the database with initial data:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

The API is now running at `http://localhost:5000`

### 3. Frontend Setup

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
```

The dependencies are already installed. If you need to reinstall:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

You should see:
```
VITE ready in XXX ms

➜  Local:   http://localhost:5173/
```

Open your browser and navigate to `http://localhost:5173`

## Application Features

### Pages Available

1. **Home** (`/`) - Landing page with hero, stats, practice areas, and testimonials
2. **About** (`/about`) - Firm history, founder's message, and team profiles
3. **Services** (`/services`) - Detailed practice areas with sticky navigation
4. **Contact** (`/contact`) - Contact form with backend integration

### Testing the Contact Form

1. Navigate to the Contact page
2. Fill in all required fields
3. Click "Submit Inquiry"
4. You should see a success message if the backend is running

The inquiry will be saved to MongoDB and can be retrieved via the API at `http://localhost:5000/api/contact`

## API Endpoints

Test the API endpoints directly:

```bash
# Get all team members
curl http://localhost:5000/api/team

# Get all services
curl http://localhost:5000/api/services

# Submit a contact inquiry
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 98765 43210",
    "serviceOfInterest": "Corporate Law",
    "message": "Test inquiry"
  }'
```

## Design System

The application follows a premium, modern editorial design:

- **Primary Color:** Navy Blue (#0B1F3A)
- **Accent Color:** Brushed Gold (#C9A86A)
- **Typography:** Playfair Display (headings) + Inter (body)
- **Style:** Minimalist, high-end corporate advisory aesthetic

## Troubleshooting

### MongoDB Connection Issues

If you see "MongoDB connection error":
- Ensure MongoDB is running
- Verify the `MONGO_URI` in `.env` is correct
- Check if MongoDB is listening on port 27017

### Port Already in Use

If port 5000 or 5173 is already in use:
- Change the `PORT` in backend `.env` file
- Vite will automatically use the next available port

### CORS Issues

If the frontend can't connect to the backend:
- Ensure both servers are running
- Check that CORS is enabled in `server.js`
- Verify the API URL in the Contact form matches your backend URL

## Next Steps

1. Customize the content in each page
2. Add real team member photos
3. Connect to a production MongoDB instance
4. Deploy the application
5. Add authentication for admin panel (future enhancement)

## Production Build

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

The production build will be in the `frontend/dist` directory.

## Support

For issues or questions: contact@gaglawyers.com

---

© 2026 GAG Lawyers. All Rights Reserved.
