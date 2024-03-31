import mongoose from 'mongoose';
import { logger } from '../utils/logger';

const startdb = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'TheDevs'
        });
        logger.info('Database connected successfully...');

    } catch (err) {
        logger.error('Error connecting to the database:', err);
        logger.info('Reconnecting to database...');
        
        await startdb();
    }
};

startdb();
