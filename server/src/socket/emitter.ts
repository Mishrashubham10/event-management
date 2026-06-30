import { getIO } from './index';

export const emitSocketEvent = (event: string, payload?: unknown) => {
  const io = getIO();

  if (payload === undefined) {
    io.emit(event);
    return;
  }

  io.emit(event, payload);
};