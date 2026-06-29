import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface JwtPayload {
  userId: string;
  sessionId: string;
}

export function generateToken(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '15d',
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}