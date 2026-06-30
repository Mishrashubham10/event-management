import { Router } from 'express';
import { authMiddleware } from '../auth/middlewares/auth.middleware';
import { authorize } from '../auth/middlewares/authorize.middleware';
import { UserRole } from '../user/user.model';
import {
  createCategory,
  getCategories,
  getCategoryTree,
} from './category.controller';

const router = Router();

router.post('/', authMiddleware, authorize(UserRole.ADMIN), createCategory);
router.get('/', authMiddleware, authorize(UserRole.ADMIN), getCategories);
router.get('/tree', authMiddleware, authorize(UserRole.ADMIN), getCategoryTree);

export default router;