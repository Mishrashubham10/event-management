import fs from 'fs';
import path from 'path';

export const ensureUploadDirectory = (folder: string) => {
  const uploadPath = path.join(process.cwd(), 'uploads', folder);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, {
      recursive: true,
    });
  }

  return uploadPath;
};

export const mapUploadedFiles = (files: Express.Multer.File[]) => {
  return files.map((file) => ({
    url: `/uploads/events/${file.filename}`,

    filename: file.filename,
  }));
};