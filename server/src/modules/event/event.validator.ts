import { z } from 'zod';
import { Types } from 'mongoose';

export const createEventSchema = z.object({
  title: z.string().trim().min(3).max(100),

  description: z.string().trim().min(10).max(1000),

  category: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid category id.',
  }),

  publishAt: z.coerce.date(),
});

export const adminEventQuerySchema = z.object({
  status: z.enum(['published', 'waiting']).optional(),
});

const deleteEventSchema = z.object({
  permanent: z.coerce.boolean().optional(),
});

export const deleteEventParamsSchema = z.object({
  id: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid event id.',
  }),
});

export const deleteEventQuerySchema = z.object({
  permanent: z.coerce.boolean().optional(),
});