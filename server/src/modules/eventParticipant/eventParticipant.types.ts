export type JoinEventDto = {
  eventId: string;
  userId: string;
};

export type LeaveEventDto = {
  eventId: string;
  userId: string;
};

export type EventParticipantResponseDto = {
  eventId: string;
  userId: string;
  joinedAt: Date;
};