import { Router } from 'express';

import authRoutes from '../../modules/auth/auth.routes';
import categoryRoutes from '../../modules/cetegory/category.route';
import eventRoutes from '../../modules/event/event.route';
import eventParticipantRoutes from '../../modules/eventParticipant/eventParticipant.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/events', eventRoutes);
router.use('/events', eventParticipantRoutes);

export default router;