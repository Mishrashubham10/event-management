'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { socket } from '@/lib/socket';
import { SOCKET_EVENTS } from '@/lib/socket-events';
import { apiSlice } from '@/redux/api/apiSlice';

export const useEventSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('📡 Registering socket listeners');

    const invalidateEvents = () => {
      dispatch(apiSlice.util.invalidateTags(['Event', 'Participant']));
    };

    const handleEventCreated = (payload?: unknown) => {
      console.log('🎉 Event Created', payload);
      invalidateEvents();
    };

    const handleEventUpdated = (payload?: unknown) => {
      console.log('✏️ Event Updated', payload);
      invalidateEvents();
    };

    const handleEventDeleted = (payload?: unknown) => {
      console.log('🗑️ Event Deleted', payload);
      invalidateEvents();
    };

    const handleEventJoined = (payload?: unknown) => {
      console.log('🙋 Event Joined', payload);
      invalidateEvents();
    };

    const handleEventLeft = (payload?: unknown) => {
      console.log('👋 Event Left', payload);
      invalidateEvents();
    };

    // Register listeners
    socket.on(SOCKET_EVENTS.EVENT_CREATED, handleEventCreated);
    socket.on(SOCKET_EVENTS.EVENT_UPDATED, handleEventUpdated);
    socket.on(SOCKET_EVENTS.EVENT_DELETED, handleEventDeleted);
    socket.on(SOCKET_EVENTS.EVENT_JOINED, handleEventJoined);
    socket.on(SOCKET_EVENTS.EVENT_LEFT, handleEventLeft);

    // Debug: log every socket event
    socket.onAny((event, payload) => {
      console.log('📡 Received:', event, payload);
    });

    return () => {
      socket.off(SOCKET_EVENTS.EVENT_CREATED, handleEventCreated);
      socket.off(SOCKET_EVENTS.EVENT_UPDATED, handleEventUpdated);
      socket.off(SOCKET_EVENTS.EVENT_DELETED, handleEventDeleted);
      socket.off(SOCKET_EVENTS.EVENT_JOINED, handleEventJoined);
      socket.off(SOCKET_EVENTS.EVENT_LEFT, handleEventLeft);

      socket.offAny();
    };
  }, [dispatch]);
};
