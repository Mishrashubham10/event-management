import { User, UserRole } from '../modules/user/user.model';
import { logger } from '../utils/logger';
import { hashPwd } from '../utils/password';

export const seedAdmin = async () => {
  const existingAdmin = await User.findOne({
    username: 'dev',
  });

  if (existingAdmin) {
    return;
  }

  const password = await hashPwd('Dev@123');

  await User.create({
    username: 'dev',
    password,
    role: UserRole.ADMIN,
  });

  logger.info("✅ Default admin created.");
};