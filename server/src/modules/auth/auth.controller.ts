import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { loginSchema } from './auth.validation';
import { loginService } from './auth.service';
import { HTTP_STATUS } from '../../constrants/http-status';
import { ApiResponse } from '../../utils/ApiResponse';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = loginSchema.parse(req.body);

  const result = await loginService(body, {
    browser: req.get('user-agent'),
    ip: req.ip,
  });

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, result, 'Login successful.'));
});