import { Router } from 'express';
import { login } from './auth.controller';
import { authMiddleware } from './middlewares/auth.middleware';

const router = Router();

router.post('/login', login);
router.get('/me', authMiddleware, (req, res) => {
  res.json(req.user);
});

export default router;