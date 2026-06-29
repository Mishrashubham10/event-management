import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorMiddleware, notFoundMiddleware } from './middleware/error.middleware';
import routes from './routes/index';

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api", routes);

// NOT FOUND
app.use(notFoundMiddleware);

// GLOBAL ERROR HANDLER
app.use(errorMiddleware);

export default app;