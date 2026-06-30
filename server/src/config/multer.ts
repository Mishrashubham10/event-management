import multer from 'multer';
import { ensureUploadDirectory } from '../utils/upload';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { ApiError } from '../utils/ApiError';
import { HTTP_STATUS } from '../constrants/http-status';

const eventsUploadPath = ensureUploadDirectory('events');

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, eventsUploadPath);
  },

  filename: (_, file, cb) => {
    const extension = path.extname(file.originalname);

    cb(null, `${randomUUID()}${extension}`);
  },
});

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        'Only JPG, PNG and WEBP images are allowed.',
      ),
    );
  }

  cb(null, true);
};

export const uploadEventImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,

    files: 5,
  },
});