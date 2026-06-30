import {
  HydratedDocument,
  Model,
  Schema,
  Types,
  model,
} from 'mongoose';
import { schemaOptions } from '../../config/schema-options';

export interface ICategory {
  name: string;
  parent: Types.ObjectId | null;

  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
  },
  schemaOptions,
);

/**
 * Prevent duplicate category names
 * under the same parent.
 */
categorySchema.index(
  {
    name: 1,
    parent: 1,
  },
  {
    unique: true,
  },
);

export type CategoryDocument = HydratedDocument<ICategory>;

export const Category: Model<ICategory> = model<ICategory>(
  'Category',
  categorySchema,
);