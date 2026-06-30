import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { loginSchema } from './auth.validation';
import { getCurrentUserService, loginService, logoutService } from './auth.service';
import { HTTP_STATUS } from '../../constrants/http-status';
import { ApiResponse } from '../../utils/ApiResponse';
import { accessTokenCookieOptions } from '../../config/cookie';
import { COOKIE_NAMES } from '../../constrants/cookie';
import { ApiError } from '../../utils/ApiError';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = loginSchema.parse(req.body);

  const { token, user } = await loginService(body, {
    browser: req.get('user-agent'),
    ip: req.ip,
  });

  res.cookie(COOKIE_NAMES.ACCESS_TOKEN, token, accessTokenCookieOptions);

  res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      {
        user,
      },
      'Login successful.',
    ),
  );
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required.');
  }

  const user = await getCurrentUserService(req.user.id);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        user,
        'Current user fetched successfully.',
      ),
    );
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required.');
  }

  await logoutService(req.user.id, req.user.sessionId);

  res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN, accessTokenCookieOptions);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, null, 'Logout successful.'));
});