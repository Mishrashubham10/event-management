import { z } from 'zod';

import { createEventSchema, updateEventSchema } from './event.validator';

export type CreateEventDto = z.infer<typeof createEventSchema>;

export type UpdateEventDto = z.infer<typeof updateEventSchema>;

export type EventPhotoDto = {
  url: string;
  filename: string;
};

export type EventResponseDto = {
  id: string;
  title: string;
  description: string;
  category: string;
  publishAt: Date;
  photos: EventPhotoDto[];
  createdBy: string;
};

export type GetEventsDto = {
  page?: number;
  limit?: number;
};