import { Types } from 'mongoose';
import { z } from 'zod';

export const eventParticipantParamsSchema = z.object({
  id: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid event id.',
  }),
});