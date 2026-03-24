import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDb() {
  if (!env.mongoUri) {
    throw new Error('MONGO_URI is required.');
  }

  await mongoose.connect(env.mongoUri, {
    autoIndex: true,
    maxPoolSize: 20
  });

  console.log('MongoDB connected');
}
