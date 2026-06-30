'use client';

import { Event } from '@/redux/api/eventApi';
import { EventCard } from './EventCard';

interface EventGridProps {
  events: Event[];
}

export function EventGrid({ events }: EventGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}