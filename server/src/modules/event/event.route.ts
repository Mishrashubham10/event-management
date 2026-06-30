import { Router } from 'express';
import { uploadEventPhotos } from '../../middleware/upload.middleware';

const router = Router();

router.post('/test-upload', uploadEventPhotos, (req, res) => {
  res.json({
    success: true,
    files: req.files,
  });
});

export default router;