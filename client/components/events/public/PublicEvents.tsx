'use client';

import { useGetPublicEventsQuery } from '@/redux/api/eventApi';

import { Card, CardContent } from '@/components/ui/card';
import { EventGrid } from './EventGrid';

export function PublicEvents() {
  const { data, isLoading, isError } = useGetPublicEventsQuery();

  const events = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="h-96 animate-pulse">
            <CardContent />
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return <Card className="p-10 text-center">Failed to load events.</Card>;
  }

  if (!events.length) {
    return <Card className="p-10 text-center">No events available.</Card>;
  }

  return <EventGrid events={events} />;
}