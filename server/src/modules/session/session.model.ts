import { Document, Model, Schema, Types, model, HydratedDocument } from 'mongoose';
import { schemaOptions } from '../../config/schema-options';

export interface ISession extends Document {
  user: Types.ObjectId;
  socketId?: string;
  browser?: string;
  ip?: string;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    socketId: {
      type: String,
      default: null,
    },

    browser: {
      type: String,
      default: '',
    },

    ip: {
      type: String,
      default: '',
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  schemaOptions,
);

export type SessionDocument = HydratedDocument<ISession>;

export const Session = model<ISession>('Session', sessionSchema);