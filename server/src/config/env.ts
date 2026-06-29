import dotenv from 'dotenv';

dotenv.config({ debug: true });

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  NODE_ENV: process.env.NODE_ENV,
};