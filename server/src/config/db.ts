import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB() {
  try {
    const con = await mongoose.connect(env.MONGO_URL);
    console.log(`MongoDB with host !! ${con.connection.host} connected!`);
  } catch (error) {
    console.error('MongoDB Connection Failed');
    console.error(error);
    process.exit(1);
  }
}