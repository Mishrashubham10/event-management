import { CalendarDays, FolderTree, House, Shield } from 'lucide-react';

import { ROUTES } from './route';

export const navigation = [
  {
    title: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: House,
  },
  {
    title: 'Categories',
    href: ROUTES.CATEGORIES,
    icon: FolderTree,
  },
  {
    title: 'Events',
    href: ROUTES.EVENTS,
    icon: CalendarDays,
  },
  {
    title: 'Admin Events',
    href: ROUTES.ADMIN_EVENTS,
    icon: Shield,
  },
] as const;