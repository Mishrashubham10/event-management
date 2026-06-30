'use client';

import { LogOut } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/auth/authSlice';

import { ROUTES } from '@/config/route';
import { clearAuth } from '@/lib/auth';
import { navigation } from '@/config/navigation';

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());

    clearAuth();

    router.replace(ROUTES.LOGIN);
  };

  const currentPage = navigation.find((item) => item.href === pathname)

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <Separator orientation="vertical" className="h-6" />

        <h1 className="text-lg font-semibold capitalize">
          {currentPage?.title ?? 'Dashboard'}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Welcome, Admin</span>

        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}