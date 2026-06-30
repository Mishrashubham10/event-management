'use client';

import { CalendarDays } from 'lucide-react';

import { NavMain } from '@/components/navigation/NavMain';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-2">
          <CalendarDays className="size-6 text-primary" />

          <div className="flex flex-col">
            <span className="font-semibold">Event Portal</span>

            <span className="text-xs text-muted-foreground">
              Admin Dashboard
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}