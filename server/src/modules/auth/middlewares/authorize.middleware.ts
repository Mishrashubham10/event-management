import { Response, Request, NextFunction } from 'express';
import { UserRole } from '../../user/user.model';
import { ApiError } from '../../../utils/ApiError';
import { HTTP_STATUS } from '../../../constrants/http-status';

export const authorize =
  (...roles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required.'),
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          HTTP_STATUS.FORBIDDEN,
          'You do not have permission to perform this action.',
        ),
      );
    }

    next();
  };