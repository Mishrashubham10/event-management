import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../../utils/ApiError';
import { HTTP_STATUS } from '../../../constrants/http-status';
import { verifyToken } from '../../../utils/jwt';
import { User } from '../../user/user.model';
import { asyncHandler } from '../../../utils/asyncHandler';

export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization || req.cookies;

      if (!authHeader?.startsWith('Bearer ')) {
        throw new ApiError(
          HTTP_STATUS.UNAUTHORIZED,
          'Authentication required.',
        );
      }

      const token = authHeader.split(' ')[1];

      const payload = verifyToken(token);
      const user = await User.findById(payload.userId).select(
        '_id username role currentSession',
      );

      if (!user) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized.');
      }

      // COMPARE SESSION
      if (
        !user.currentSession ||
        user.currentSession.toString() !== payload.sessionId
      ) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Session expired.');
      }

      req.user = {
        id: user._id.toString(),
        username: user.username,
        role: user.role,
        sessionId: payload.sessionId,
      };

      next();
    } catch (error) {
      next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication failed.'));
    }
  },
);