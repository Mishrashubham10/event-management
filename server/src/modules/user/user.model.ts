import {
  Schema,
  model,
  HydratedDocument,
  Model,
  Types,
} from 'mongoose';
import { schemaOptions } from '../../config/schema-options';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type IUser = {
  username: string;
  password: string;
  role: UserRole;
  currentSession: Types.ObjectId | null;
};

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },

    currentSession: {
      type: Schema.Types.ObjectId,
      ref: 'Session',
      default: null,
    },
  },
  schemaOptions,
);

// export type IUser = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<IUser>;

export const User: Model<IUser> = model('User', userSchema);
