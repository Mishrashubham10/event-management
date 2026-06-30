import { HydratedDocument, Model, Schema, Types, model } from 'mongoose';
import { schemaOptions } from '../../config/schema-options';

interface IPhoto {
  url: string;
  filename: string;
}

export interface IEvent {
  title: string;
  description: string;

  category: Types.ObjectId;
  createdBy: Types.ObjectId;

  publishAt: Date;
  photos: IPhoto[];
  deletedAt: Date | null;
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const photoSchema = new Schema<IPhoto>(
  {
    url: {
      type: String,
      required: true,
    },

    filename: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    publishAt: {
      type: Date,
      required: true,
    },

    photos: {
      type: [photoSchema],
      default: [],
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  schemaOptions,
);

eventSchema.index({
  publishAt: 1,
});

eventSchema.index({
  isDeleted: 1,
  publishAt: 1,
});

export type EventDocument = HydratedDocument<IEvent>;

export const Event: Model<IEvent> = model<IEvent>('Event', eventSchema);