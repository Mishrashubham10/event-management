import { UserDocument } from "../user/user.model";
import { LoginResponseDto } from "./auth.types";

export const toLoginResponse = (
  user: UserDocument,
  token: string,
): LoginResponseDto => ({
  token,
  user: {
    id: user._id.toString(),
    username: user.username,
    role: user.role,
  },
});