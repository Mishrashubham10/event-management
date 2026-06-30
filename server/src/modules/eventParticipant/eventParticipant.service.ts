import { HTTP_STATUS } from '../../constrants/http-status';
import { ApiError } from '../../utils/ApiError';

import { Event } from '../event/event.model';
import { EventParticipant } from './eventParticipant.model';

import { emitSocketEvent } from '../../socket/emitter';
import { SOCKET_EVENTS } from '../../socket/events';

// JOIN EVENT
export const joinEventService = async (eventId: string, userId: string) => {
  const event = await Event.findById(eventId);

  if (!event || event.isDeleted) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Event not found.');
  }

  const alreadyJoined = await EventParticipant.exists({
    event: eventId,
    user: userId,
  });

  if (alreadyJoined) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      'You have already joined this event.',
    );
  }

  const participant = await EventParticipant.create({
    event: eventId,
    user: userId,
  });

  emitSocketEvent(SOCKET_EVENTS.EVENT_JOINED, {
    eventId,
    userId,
  });

  return participant;
};

// LEAVE EVENT
export const leaveEventService = async (eventId: string, userId: string) => {
  const participant = await EventParticipant.findOne({
    event: eventId,
    user: userId,
  });

  if (!participant) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      'You have not joined this event.',
    );
  }

  await participant.deleteOne();

  emitSocketEvent(SOCKET_EVENTS.EVENT_LEFT, {
    eventId,
    userId,
  });
};

// GET PARTICIPANTS
export const getParticipantsService = async (eventId: string) => {
  return await EventParticipant.find({
    event: eventId,
  })
    .populate('user', 'username')
    .sort({
      joinedAt: -1,
    })
    .lean();
};

// GET PARTICIPANT COUNT
export const getParticipantCountService = async (eventId: string) => {
  return await EventParticipant.countDocuments({
    event: eventId,
  });
};

// GET JOIN STATUS
export const getJoinStatusService = async (eventId: string, userId: string) => {
  const joined = await EventParticipant.exists({
    event: eventId,
    user: userId,
  });

  return Boolean(joined);
};