import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import {
  errorMiddleware,
  notFoundMiddleware,
} from './middleware/error.middleware';
import routes from './routes/index';
import path from 'node:path';

const app = express();

// MIDDLEWARES
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use('/api', routes);

// FILE UPLOADS
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// NOT FOUND
app.use(notFoundMiddleware);

// GLOBAL ERROR HANDLER
app.use(errorMiddleware);

export default app;