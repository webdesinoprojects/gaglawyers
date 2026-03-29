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
```

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

### Team Members

- `GET /api/team` - Get all team members

### Services

- `GET /api/services` - Get all practice areas/services

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
- imageUrl (String, required)
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

## License

ISC
