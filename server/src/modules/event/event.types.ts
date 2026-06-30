export type CreateEventDto = {
  title: string;
  description: string;
  category: string;
  publishAt: Date;
};

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