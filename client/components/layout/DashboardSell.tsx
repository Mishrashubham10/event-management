'use client';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardSell({ children }: DashboardLayoutProps) {
  const router = useRouter();

  const { isAuthenticated, isInitialized } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <AppHeader />

        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}