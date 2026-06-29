import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPwd = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePwd = (password: string, hashedPwd: string) => {
  return bcrypt.compare(password, hashedPwd);
};