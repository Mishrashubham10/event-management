import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../utils/ApiError';
import { HTTP_STATUS } from '../../constrants/http-status';
import { verifyToken } from '../../utils/jwt';
import { User } from '../user/user.model';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization || req.cookies;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required.');
    }

    const token = authHeader.split(' ')[1];

    const payload = verifyToken(token);
    const user = await User.findById(payload.userId);

    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid token.');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication failed.'));
  }
};