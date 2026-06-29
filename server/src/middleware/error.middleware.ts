import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { HTTP_STATUS } from '../constrants/http-status';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('🔥 ERROR:', err);

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(
    new ApiError(HTTP_STATUS.NOT_FOUND, `Route ${req.originalUrl} not found.`),
  );
};