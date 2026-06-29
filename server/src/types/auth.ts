import { UserRole } from '../modules/user/user.model';

export type AuthenticatedUser = {
  id: string;
  username: string;
  role: UserRole;
  sessionId: string;
};