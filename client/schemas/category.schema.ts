import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Category name must be at least 2 characters.'),

  parent: z.string().nullable(),
});

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;