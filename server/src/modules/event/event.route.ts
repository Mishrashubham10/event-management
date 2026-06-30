import { Router } from 'express';
import { uploadEventPhotos } from '../../middleware/upload.middleware';
import { authMiddleware } from '../auth/middlewares/auth.middleware';
import { authorize } from '../auth/middlewares/authorize.middleware';
import { UserRole } from '../user/user.model';
import { createEvent, deleteEvent, getAdminEvents, getEventById, getPublishedEvents } from './event.controller';

const router = Router();

/**
 * Public Route
 */
router.get('/', getPublishedEvents);
/**
 * Admin Events
 */
router.get('/admin', authMiddleware, authorize(UserRole.ADMIN), getAdminEvents);
router.get('/:id', getEventById);

router.post(
  '/',
  authMiddleware,
  authorize(UserRole.ADMIN),
  uploadEventPhotos,
  createEvent,
);

router.delete('/:id', authMiddleware, authorize(UserRole.ADMIN), deleteEvent);

export default router;