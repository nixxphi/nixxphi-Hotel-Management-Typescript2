import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

async function connectToDatabase() {
  // Check if MONGODB_URI is set
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not set');
    return; // Prevents unnecessary connection attempt
  }

  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'Redcluster' });
    console.log('Connected to MongoDB');
    logger.info('Database connected successfully...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    logger.error('Error connecting to the database:', error);
    connectToDatabase();
  }
}

connectToDatabase();
