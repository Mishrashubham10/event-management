'use client';

import Link from 'next/link';
import { Plus, FolderTree, CalendarDays, LayoutDashboard } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

const actions = [
  {
    title: 'Create Event',
    description: 'Add a new event.',
    href: '/dashboard/events',
    icon: Plus,
  },
  {
    title: 'Manage Categories',
    description: 'Create and organize categories.',
    href: '/dashboard/categories',
    icon: FolderTree,
  },
  {
    title: 'View Events',
    description: 'Browse all events.',
    href: '/dashboard/admin/events',
    icon: CalendarDays,
  },
  {
    title: 'Dashboard',
    description: 'Refresh dashboard overview.',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>

        <CardDescription>Frequently used shortcuts.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Button
              key={action.title}
              asChild
              variant="outline"
              className="h-auto w-full justify-start p-4"
            >
              <Link href={action.href}>
                <Icon className="mr-3 h-5 w-5 shrink-0" />

                <div className="flex flex-col items-start">
                  <span className="font-medium">{action.title}</span>

                  <span className="text-xs text-muted-foreground">
                    {action.description}
                  </span>
                </div>
              </Link>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}