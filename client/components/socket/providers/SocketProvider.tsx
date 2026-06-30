'use client';

import { useEffect } from 'react';
import { socket } from '@/lib/socket';
import { useEventSocket } from '@/hooks/socket/useEventSocket';

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEventSocket();

  useEffect(() => {
    console.log('SocketProvider Mounted');
    socket.connect();

    const handleConnect = () => {
      console.log('Connected:', socket.id);
    };

    const handleDisconnect = () => {
      console.log('Disconnected');
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);

      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
}