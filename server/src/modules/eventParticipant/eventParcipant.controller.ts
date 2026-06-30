import { Request, Response } from 'express';

import { HTTP_STATUS } from '../../constrants/http-status';
import { ApiResponse } from '../../utils/ApiResponse';

import {
  joinEventService,
  leaveEventService,
  getParticipantsService,
  getParticipantCountService,
  getJoinStatusService,
} from './eventParticipant.service';

import { eventParticipantParamsSchema } from './eventParticipant.validation';
import { asyncHandler } from '../../utils/asyncHandler';

// JOIN EVENT
export const joinEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = eventParticipantParamsSchema.parse(req.params);

  const participant = await joinEventService(id, req.user!.id);

  res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        participant,
        'Joined event successfully.',
      ),
    );
});

// LEAVE EVENT
export const leaveEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = eventParticipantParamsSchema.parse(req.params);

  await leaveEventService(id, req.user!.id);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, null, 'Left event successfully.'));
});

// GET PARTICIPANTS
export const getParticipants = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = eventParticipantParamsSchema.parse(req.params);

    const participants = await getParticipantsService(id);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          participants,
          'Participants fetched successfully.',
        ),
      );
  },
);

// GET PARTICIPANT COUNT
export const getParticipantCount = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = eventParticipantParamsSchema.parse(req.params);

    const count = await getParticipantCountService(id);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        {
          count,
        },
        'Participant count fetched successfully.',
      ),
    );
  },
);

// GET JOIN STATUS
export const getJoinStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = eventParticipantParamsSchema.parse(req.params);

    const joined = await getJoinStatusService(id, req.user!.id);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        {
          joined,
        },
        'Join status fetched successfully.',
      ),
    );
  },
);