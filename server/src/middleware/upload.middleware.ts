import { uploadEventImages } from '../config/multer';

export const uploadEventPhotos = uploadEventImages.array('photos', 5);