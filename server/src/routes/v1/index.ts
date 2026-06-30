import { Router } from 'express';

import authRoutes from '../../modules/auth/auth.routes';
import categoryRoutes from '../../modules/cetegory/category.route';
import eventRoutes from '../../modules/event/event.route';
// import adminRoutes from '../../modules/admin/admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/events', eventRoutes);
// router.use('/admin', adminRoutes);

export default router;