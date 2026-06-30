'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, FolderTree } from 'lucide-react';

import { useGetEventByIdQuery } from '@/redux/api/eventApi';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getImageUrl } from '@/utils/getImgUrl';

interface EventDetailsProps {
  eventId: string;
}

export function EventDetails({ eventId }: EventDetailsProps) {
  const { data, isLoading, isError } = useGetEventByIdQuery(eventId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-80 animate-pulse rounded-lg bg-muted" />

        <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />

        <div className="h-32 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <Card>
        <CardContent className="flex h-48 items-center justify-center">
          <p className="text-muted-foreground">Event not found.</p>
        </CardContent>
      </Card>
    );
  }

  const event = data.data;

  return (
    <div className="space-y-8">
      <Button variant="outline" asChild>
        <Link href="/events">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
      </Button>

      <div className="relative aspect-16/7 overflow-hidden rounded-xl">
        <Image
          src={getImageUrl(event.photos[0]?.url)}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{event.title}</h1>

        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="secondary">
            <FolderTree className="mr-2 h-3.5 w-3.5" />

            {typeof event.category === 'string'
              ? event.category
              : event.category?.name}
          </Badge>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />

            {new Date(event.publishAt).toLocaleDateString()}
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p>{event.description}</p>
        </div>
      </div>

      {event.photos.length > 1 && (
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Gallery</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {event.photos.slice(1).map((photo) => (
              <div
                key={photo.filename}
                className="relative aspect-video overflow-hidden rounded-lg"
              >
                <Image
                  src={getImageUrl(photo.url)}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}