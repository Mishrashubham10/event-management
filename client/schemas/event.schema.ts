import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().trim().min(3, 'Title is required.'),
  description: z.string().trim().min(10, 'Description is too short.'),
  category: z.string().min(1, 'Select a category.'),
  publishAt: z.date({
    message: 'Select publish date.',
  }),

  photos: z.array(z.instanceof(File)).optional(),
});

export type CreateEventFormValues = z.infer<typeof createEventSchema>;