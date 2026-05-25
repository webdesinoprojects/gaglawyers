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

const waitForConnection = () =>
  new Promise((resolve, reject) => {
    const onConnected = () => {
      mongoose.connection.removeListener('error', onError);
      resolve();
    };
    const onError = (err) => {
      mongoose.connection.removeListener('connected', onConnected);
      reject(err);
    };
    mongoose.connection.once('connected', onConnected);
    mongoose.connection.once('error', onError);
  });

const connectDB = async () => {
  const readyState = mongoose.connection.readyState;

  if (isConnected || readyState === 1) {
    isConnected = true;
    return;
  }

  if (readyState === 2) {
    // Mongoose is connecting — either via our connectPromise or via internal auto-reconnect.
    // In both cases just wait for the 'connected' event rather than calling mongoose.connect() again.
    if (connectPromise) {
      await connectPromise;
    } else {
      await waitForConnection();
    }
    isConnected = true;
    return;
  }

  if (!process.env.MONGO_URI) {
    console.error('[db] ❌ MONGO_URI not found!');
    console.error('[db] cwd:', process.cwd());
    console.error('[db] __dirname:', __dirname);
    console.error('[db] process.pid:', process.pid);
    console.error('[db] Available env keys:', Object.keys(process.env).filter(k => k.includes('MONGO') || k.includes('DB')));
    throw new Error('MONGO_URI environment variable is not set. Check your .env file on the server.');
  }

  try {
    mongoose.set('strictQuery', false);
    mongoose.set('bufferCommands', true);
    // Always 30 s — NODE_ENV may be undefined on VPS and 10 s is too short for reconnects.
    mongoose.set('bufferTimeoutMS', 30000);
    bindConnectionListeners();

    connectPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
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
