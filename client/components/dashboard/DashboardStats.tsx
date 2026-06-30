'use client';

import { CalendarDays, CheckCircle2, Clock3, FolderTree } from 'lucide-react';

import { useGetAdminEventsQuery } from '@/redux/api/eventApi';
import { useGetCategoryTreeQuery } from '@/redux/api/categoryApi';

import StatCard from './StatCard';

export default function DashboardStats() {
  const { data: eventsResponse, isLoading: eventsLoading } =
    useGetAdminEventsQuery();

  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useGetCategoryTreeQuery();

  const events = eventsResponse?.data ?? [];
  const categories = categoriesResponse?.data ?? [];

  const totalEvents = events.length;

  const publishedEvents = events.filter(
    (event) => event.status === 'published',
  ).length;

  const waitingEvents = events.filter(
    (event) => event.status === 'waiting',
  ).length;

  const totalCategories = categories.length;

  if (eventsLoading || categoriesLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-lg border bg-muted"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Events"
        value={totalEvents}
        icon={CalendarDays}
        description="All created events"
      />

      <StatCard
        title="Published"
        value={publishedEvents}
        icon={CheckCircle2}
        description="Visible to users"
      />

      <StatCard
        title="Waiting"
        value={waitingEvents}
        icon={Clock3}
        description="Scheduled events"
      />

      <StatCard
        title="Categories"
        value={totalCategories}
        icon={FolderTree}
        description="Available categories"
      />
    </div>
  );
}