import { Router } from 'express';
import { authMiddleware } from '../auth/middlewares/auth.middleware';
import {
  getJoinStatus,
  getParticipantCount,
  getParticipants,
  joinEvent,
  leaveEvent,
} from './eventParcipant.controller';

const router = Router();

router.post('/:id/join', authMiddleware, joinEvent);
router.delete('/:id/leave', authMiddleware, leaveEvent);
router.get('/:id/participants', getParticipants);
router.get('/:id/participants/count', getParticipantCount);
router.get('/:id/join-status', authMiddleware, getJoinStatus);

export default router;