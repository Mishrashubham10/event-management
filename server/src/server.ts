import http from 'http';
import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';
import { seedAdmin } from './scripts/seedAdmin';

const startServer = async () => {
  await connectDB();

  await seedAdmin();

  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    console.log(`Server running on ${env.PORT}`);
  });
};

startServer();