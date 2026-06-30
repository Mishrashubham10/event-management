'use client';

import Link from 'next/link';

import { CalendarPlus, CalendarRange, FolderTree } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

export function AdminQuickActions() {
  const actions = [
    {
      title: 'Create Event',
      description: 'Create and publish a new event.',
      href: '/dashboard/admin/events/create',
      icon: CalendarPlus,
    },
    {
      title: 'Manage Events',
      description: 'Edit, publish or delete events.',
      href: '/dashboard/admin/events',
      icon: CalendarRange,
    },
    {
      title: 'Manage Categories',
      description: 'Organize event categories.',
      href: '/dashboard/admin/categories',
      icon: FolderTree,
    },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Quick Actions</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Card className="transition-all hover:border-primary hover:shadow-lg">
              <CardContent className="flex items-center gap-4 p-6">
                <action.icon className="h-10 w-10 text-primary" />

                <div>
                  <h3 className="font-semibold">{action.title}</h3>

                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}