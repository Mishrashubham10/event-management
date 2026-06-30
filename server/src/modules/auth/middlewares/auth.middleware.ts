import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../../utils/ApiError';
import { HTTP_STATUS } from '../../../constrants/http-status';
import { verifyToken } from '../../../utils/jwt';
import { User } from '../../user/user.model';
import { asyncHandler } from '../../../utils/asyncHandler';
import { Session } from '../../session/session.model';

export const authMiddleware = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required.');
    }

    const payload = verifyToken(token);

    const user = await User.findById(payload.userId).select(
      '_id username role currentSession',
    );

    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized.');
    }

    const session = await Session.findById(payload.sessionId);

    if (!session?.isActive) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Session expired.');
    }

    if (session.user.toString() !== user._id.toString()) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid session.');
    }

    const isSessionValid =
      user.currentSession?.toString() === payload.sessionId;

    if (!isSessionValid) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Session expired.');
    }

    req.user = {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
      sessionId: payload.sessionId,
    };

    next();
  },
);