import { Document, Model, Schema, Types, model } from 'mongoose';
import { schemaOptions } from '../../config/schema-options';

export interface ICategory extends Document {
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

export const Category = model<ICategory>('Category', categorySchema);