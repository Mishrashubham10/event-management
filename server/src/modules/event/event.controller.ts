import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import {
  adminEventQuerySchema,
  createEventSchema,
  deleteEventParamsSchema,
  deleteEventQuerySchema,
  eventParamsSchema,
  updateEventSchema,
} from './event.validator';
import { mapUploadedFiles } from '../../utils/upload';
import { HTTP_STATUS } from '../../constrants/http-status';
import { ApiResponse } from '../../utils/ApiResponse';
import {
  createEventService,
  deleteEventService,
  getAdminEventsService,
  getEventByIdService,
  getPublishedEventsService,
  updateEventService,
} from './event.service';

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);
  const dto = createEventSchema.parse(req.body);

  const photos = mapUploadedFiles(req.files as Express.Multer.File[]);

  const result = await createEventService(dto, photos, req.user!.id);

  res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        result,
        'Event created successfully.',
      ),
    );
});

// PUBLISHED EVENTS CONTROLLER
export const getPublishedEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getPublishedEventsService();

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, result, 'Events fetched successfully.'),
      );
  },
);

// GET ADMIN EVENTS
export const getAdminEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const query = adminEventQuerySchema.parse(req.query);

    const events = await getAdminEventsService(query.status);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          events,
          'Admin events fetched successfully.',
        ),
      );
  },
);

// DELETE EVENT CONTROLLER
export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = deleteEventParamsSchema.parse(req.params);
  const { permanent } = deleteEventQuerySchema.parse(req.query);

  await deleteEventService(id, permanent);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        null,
        permanent
          ? 'Event permanently deleted.'
          : 'Event deleted successfully.',
      ),
    );
});

// GET EVENT BY ID
export const getEventById = asyncHandler(
  async (req: Request, res: Response) => {
    const event = await getEventByIdService(req.params.id as string);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, event, 'Event fetched successfully.'),
      );
  },
);

// UPDATE EVENT
export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = eventParamsSchema.parse(req.params);

  const body = updateEventSchema.parse(req.body);

  const files = req.files as Express.Multer.File[] | undefined;

  const photos =
    files?.map((file) => ({
      url: `/uploads/events/${file.filename}`,
      filename: file.filename,
    })) ?? [];

  const event = await updateEventService(id, body, photos);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, event, 'Event updated successfully.'),
    );
});