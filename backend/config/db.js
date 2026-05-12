const mongoose = require('mongoose');

let isConnected = false;
let connectPromise = null;
let listenersBound = false;

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
    // Enable buffer commands in production to handle serverless cold starts
    if (process.env.NODE_ENV === 'production') {
      mongoose.set('bufferCommands', true);
      mongoose.set('bufferTimeoutMS', 30000); // 30 second timeout
    } else {
      mongoose.set('bufferCommands', false);
      mongoose.set('bufferTimeoutMS', 0);
    }
    bindConnectionListeners();

    connectPromise = mongoose.connect(process.env.MONGO_URI, {
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
