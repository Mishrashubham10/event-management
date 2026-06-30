import { HTTP_STATUS } from '../../constrants/http-status';
import { ApiError } from '../../utils/ApiError';
import { Category } from '../cetegory/category.model';
import { Event, EventDocument, IEvent } from './event.model';
import {
  CreateEventDto,
  EventPhotoDto,
  EventResponseDto,
  UpdateEventDto,
} from './event.types';

import { emitSocketEvent } from '../../socket/emitter';
import { SOCKET_EVENTS } from '../../socket/events';

// FIND CATEGORY HELPER
export const findCategory = async (categoryId: string) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Category not found.');
  }

  return category;
};

// MAP EVENT HELPER
const mapEvent = (event: EventDocument): EventResponseDto => ({
  id: event._id.toString(),
  title: event.title,
  description: event.description,
  category: event.category.toString(),
  publishAt: event.publishAt,
  photos: event.photos,
  createdBy: event.createdBy.toString(),
});

// CREATE EVENT SERVICE
export const createEventService = async (
  dto: CreateEventDto,
  photos: EventPhotoDto[],
  userId: string,
): Promise<EventResponseDto> => {
  await findCategory(dto.category);

  const event = await Event.create({
    title: dto.title,
    description: dto.description,
    category: dto.category,
    publishAt: dto.publishAt,
    photos,
    createdBy: userId,
  });

  emitSocketEvent(SOCKET_EVENTS.EVENT_CREATED);

  return mapEvent(event);
};

// GET PUBLISHED EVENTS SERVICE
export const getPublishedEventsService = async () => {
  const events = await Event.find({
    publishAt: { $lte: new Date() },
    isDeleted: false,
  })
    .populate('category', 'name')
    .sort({ publishedAt: -1 })
    .lean();

  return events;
};

// ADMIN EVENTS SERVICE
export const getAdminEventsService = async (
  status?: 'published' | 'waiting',
) => {
  const now = new Date();

  const query: {
    isDeleted: boolean;
    publishAt?: {
      $lte?: Date;
      $gt?: Date;
    };
  } = {
    isDeleted: false,
  };

  if (status === 'published') {
    query.publishAt = {
      $lte: now,
    };
  }

  if (status === 'waiting') {
    query.publishAt = {
      $gt: now,
    };
  }

  const events = await Event.find(query)
    .populate('category', 'name')
    .populate('createdBy', 'username')
    .sort({
      publishAt: -1,
    })
    .lean();

  return events.map((event) => ({
    ...event,
    status: event.publishAt <= now ? 'published' : 'waiting',
  }));
};

// GET EVENTS BY ID
export const getEventByIdService = async (id: string) => {
  const event = await Event.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate('category', 'name')
    .populate('createdBy', 'username');

  if (!event) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Event not found.');
  }

  return event;
};

// UPDATE EVENT SERVICE
export const updateEventService = async (
  id: string,
  dto: UpdateEventDto,
  photos: EventPhotoDto[],
): Promise<EventResponseDto> => {
  const event = await Event.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!event) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Event not found.');
  }

  // VALIDATE CAT ONLY IF ITS CHANGING
  if (dto.category) {
    await findCategory(dto.category);
  }

  const updateData: Partial<UpdateEventDto> & {
    photos?: EventPhotoDto[];
  } = {
    ...dto,
  };

  // REPLACE PHOTOS ONLY IF NEW ONES WERE UPLOAD
  if (photos.length > 0) {
    updateData.photos = photos;
  }

  const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedEvent) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Event not found.');
  }

  emitSocketEvent(SOCKET_EVENTS.EVENT_UPDATED);

  return mapEvent(updatedEvent);
};

// DELETE EVENT SERVICE
export const deleteEventService = async (
  eventId: string,
  permanent = false,
) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Event not found.');
  }

  if (permanent) {
    await event.deleteOne();
    return;
  }

  event.isDeleted = true;
  event.deletedAt = new Date();

  emitSocketEvent(SOCKET_EVENTS.EVENT_DELETED);

  await event.save();
};