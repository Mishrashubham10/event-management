import { HydratedDocument, Model, Schema, Types, model } from 'mongoose';

import { schemaOptions } from '../../config/schema-options';

export interface IEventParticipant {
  event: Types.ObjectId;
  user: Types.ObjectId;

  joinedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

const eventParticipantSchema = new Schema<IEventParticipant>(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  schemaOptions,
);

eventParticipantSchema.index(
  {
    event: 1,
    user: 1,
  },
  {
    unique: true,
  },
);

eventParticipantSchema.index({
  event: 1,
});

eventParticipantSchema.index({
  user: 1,
});

export type EventParticipantDocument = HydratedDocument<IEventParticipant>;

export const EventParticipant: Model<IEventParticipant> =
  model<IEventParticipant>('EventParticipant', eventParticipantSchema);