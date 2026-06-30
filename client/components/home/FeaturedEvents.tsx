'use client';

import Link from 'next/link';

import { useGetPublicEventsQuery } from '@/redux/api/eventApi';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EventCard } from '../events/public/EventCard';

export function FeaturedEvents() {
  const { data, isLoading, isError } = useGetPublicEventsQuery();

  const events = (data?.data ?? []).slice(0, 3);

  return (
    <section className="py-20">
      <div className="container mx-auto space-y-10 px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Events</h2>

            <p className="mt-2 text-muted-foreground">
              Discover some of our latest published events.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>

        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="h-96 animate-pulse">
                <CardContent />
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <Card>
            <CardContent className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">
                Failed to load featured events.
              </p>
            </CardContent>
          </Card>
        )}

        {!isLoading && !isError && events.length === 0 && (
          <Card>
            <CardContent className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">
                No featured events available.
              </p>
            </CardContent>
          </Card>
        )}

        {!isLoading && !isError && events.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}