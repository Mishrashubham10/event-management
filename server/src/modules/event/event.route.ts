import { Router } from 'express';
import { uploadEventPhotos } from '../../middleware/upload.middleware';
import { authMiddleware } from '../auth/middlewares/auth.middleware';
import { authorize } from '../auth/middlewares/authorize.middleware';
import { UserRole } from '../user/user.model';
import { createEvent, deleteEvent, getAdminEvents, getEventById, getPublishedEvents, updateEvent } from './event.controller';

const router = Router();

router.post(
  '/',
  authMiddleware,
  authorize(UserRole.ADMIN),
  uploadEventPhotos,
  createEvent,
);
router.get('/', getPublishedEvents);
router.get('/admin', authMiddleware, authorize(UserRole.ADMIN), getAdminEvents);
router.patch(
  '/:id',
  authMiddleware,
  uploadEventPhotos,
  updateEvent,
);

router.delete('/:id', authMiddleware, authorize(UserRole.ADMIN), deleteEvent);
router.get('/:id', getEventById);

export default router;