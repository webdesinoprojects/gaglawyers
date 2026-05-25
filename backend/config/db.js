const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: '/var/www/gaglawyers/backend/.env' });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
require('dotenv').config();

let isConnected = false;
let connectPromise = null;
let listenersBound = false;

const getMongoUri = () => process.env.MONGO_URI;

const bindConnectionListeners = () => {
  if (listenersBound) return;

  mongoose.connection.on('connected', () => {
    isConnected = true;
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  });

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.error('MongoDB disconnected');
  });

  mongoose.connection.on('error', (error) => {
    isConnected = false;
    console.error(`MongoDB error: ${error.message}`);
  });

  listenersBound = true;
};

const connectDB = async () => {
  const mongoUri = getMongoUri();
  if (!mongoUri) {
    throw new Error('MONGO_URI is missing');
  }

  const readyState = mongoose.connection.readyState;

  if (isConnected || readyState === 1) {
    isConnected = true;
    console.log('Using existing MongoDB connection');
    return;
  }

  if (readyState === 2 && connectPromise) {
    await connectPromise;
    return;
  }

  try {
    mongoose.set('strictQuery', false);
    // Always enable bufferCommands to handle serverless cold starts and delayed connections
    // This allows Mongoose to queue commands while connecting instead of throwing errors
    const isServerless = process.env.VERCEL || process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME;
    mongoose.set('bufferCommands', true);
    // Production (especially VPS + remote Mongo) can exceed 10s on cold starts.
    // Keep this high so the first request doesn't fail while connecting.
    mongoose.set('bufferTimeoutMS', (process.env.NODE_ENV === 'production' || isServerless) ? 30000 : 10000);
    bindConnectionListeners();

    connectPromise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 20,
    });

    const conn = await connectPromise;
    isConnected = true;
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    isConnected = false;
    throw error;
  } finally {
    connectPromise = null;
  }
};

module.exports = connectDB;
