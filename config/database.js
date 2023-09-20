import mongoose from 'mongoose';
import {config} from 'dotenv';

config();

export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit the application if the connection fails
    }
};

export const db = mongoose.connection;



