import { Types } from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser extends Document {
  username: string;
  password: string;
  role: UserRole;
  currentSession: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}