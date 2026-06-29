import { Session, SessionDocument } from '../session/session.model';
import { User, UserDocument } from '../user/user.model';

import { LoginContext, LoginDto, LoginResponseDto } from './auth.types';

import { comparePwd } from '../../utils/password';
import { generateToken } from '../../utils/jwt';
import { ApiError } from '../../utils/ApiError';
import { HTTP_STATUS } from '../../constrants/http-status';
import { MESSAGES } from '../../constrants/message';

/**
 * =====================================================
 * Private Helpers
 * =====================================================
 */

const findUser = async (username: string): Promise<UserDocument> => {
  const user = await User.findOne({
    username: username.toLowerCase(),
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.INVALID_CREDENTIALS);
  }

  return user;
};

const isPasswordValid = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return comparePwd(plainPassword, hashedPassword);
};

const invalidatePreviousSession = async (user: UserDocument): Promise<void> => {
  if (!user.currentSession) {
    return;
  }

  const previousSession = await Session.findById(user.currentSession);

  if (!previousSession) {
    user.currentSession = null;
    await user.save();
    return;
  }

  previousSession.isActive = false;
  await previousSession.save();

  /**
   * Socket.IO
   *
   * Later:
   *
   * io.to(previousSession.socketId)
   *   .emit("force_logout");
   */

  user.currentSession = null;

  await user.save();
};

const createSession = async (
  user: UserDocument,
  context: LoginContext,
): Promise<SessionDocument> => {
  const session = await Session.create({
    user: user._id.toString(),
    browser: context.browser ?? '',
    ip: context.ip ?? '',
    socketId: context.socketId ?? '',
    isActive: true,
  });

  user.currentSession = session._id;

  await user.save();

  return session;
};

const issueToken = (user: UserDocument, session: SessionDocument): string => {
  return generateToken({
    userId: user._id.toString(),
    sessionId: session._id.toString(),
  });
};

/**
 * =====================================================
 * Public Service
 * =====================================================
 */

export const loginService = async (
  dto: LoginDto,
  context: LoginContext,
): Promise<LoginResponseDto> => {
  const user = await findUser(dto.username);

  const isMatched = await isPasswordValid(dto.password, user.password);

  if (!isMatched) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.INVALID_CREDENTIALS);
  }

  await invalidatePreviousSession(user);

  const session = await createSession(user, context);

  const token = issueToken(user, session);

  return {
    token,

    user: {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    },
  };
};