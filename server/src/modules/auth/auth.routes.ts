import { Router } from 'express';
import { login } from './auth.controller';
import { authMiddleware } from './middlewares/auth.middleware';
import { loginLimiter } from '../../middleware/rateLimiter';

const router = Router();

router.post('/login', loginLimiter, login);
router.get('/me', authMiddleware, (req, res) => {
  res.json(req.user);
});

export default router;