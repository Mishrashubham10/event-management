'use client';

import { ReactNode, useEffect } from 'react';

import { useLazyMeQuery } from '@/redux/api/authApi';
import { clearUser, setUser } from '@/redux/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';

interface Props {
  children: ReactNode;
}

export default function AuthInitializer({ children }: Props) {
  const dispatch = useAppDispatch();

  const [getCurrentUser] = useLazyMeQuery();

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await getCurrentUser().unwrap();

        dispatch(setUser(response.data));
      } catch {
        dispatch(clearUser());
      }
    };

    initialize();
  }, [dispatch, getCurrentUser]);

  return <>{children}</>;
}