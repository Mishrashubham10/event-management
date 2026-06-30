'use client';

import { CalendarDays, FolderTree, Clock3, CheckCircle2 } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { useGetAdminEventsQuery } from '@/redux/api/eventApi';
import { useGetCategoryTreeQuery } from '@/redux/api/categoryApi';

export function AdminStats() {
  const { data: events } = useGetAdminEventsQuery();

  const { data: categories } = useGetCategoryTreeQuery();

  const allEvents = events?.data ?? [];

  const published = allEvents.filter(
    (event) => event.status === 'published',
  ).length;

  const waiting = allEvents.filter(
    (event) => event.status === 'waiting',
  ).length;

  const stats = [
    {
      title: 'Events',
      value: allEvents.length,
      icon: CalendarDays,
    },
    {
      title: 'Categories',
      value: categories?.data.length ?? 0,
      icon: FolderTree,
    },
    {
      title: 'Published',
      value: published,
      icon: CheckCircle2,
    },
    {
      title: 'Waiting',
      value: waiting,
      icon: Clock3,
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>

              <h2 className="mt-1 text-3xl font-bold">{stat.value}</h2>
            </div>

            <stat.icon className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}