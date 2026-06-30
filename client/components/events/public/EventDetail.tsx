'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Loader2, Tag, Users } from 'lucide-react';

import {
  useGetEventByIdQuery,
  useGetJoinStatusQuery,
  useGetParticipantCountQuery,
  useJoinEventMutation,
  useLeaveEventMutation,
} from '@/redux/api/eventApi';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getImageUrl } from '@/utils/getImgUrl';
import { getErrorMessage } from '@/lib/getErrMsg';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface EventDetailsProps {
  eventId: string;
}

export function EventDetails({ eventId }: EventDetailsProps) {
  const { data, isLoading, isError } = useGetEventByIdQuery(eventId);
  const { data: participantCount } = useGetParticipantCountQuery(eventId);
  const { data: joinStatus } = useGetJoinStatusQuery(eventId);
  const [joinEvent, joinState] = useJoinEventMutation();
  const [leaveEvent, leaveState] = useLeaveEventMutation();

  // const event = data?.data;
  const joined = joinStatus?.data.joined ?? false;
  const count = participantCount?.data.count ?? 0;
  const loading = joinState.isLoading || leaveState.isLoading;

  // HANDLE JOIN ROOM
  const handleJoin = async () => {
    try {
      const response = await joinEvent(eventId).unwrap();

      toast.success(response.message);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  // HANDLE LEAVE
  const handleLeave = async () => {
    try {
      const response = await leaveEvent(eventId).unwrap();

      toast.success(response.message);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

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
    <section className="mx-auto max-w-6xl space-y-8 py-8">
      {/* Hero Image */}
      <Button variant="outline" asChild>
        <Link href="/events">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
      </Button>

      <Image
        src={getImageUrl(event.photos[0]?.url)}
        alt={event.title}
        width={1200}
        height={500}
        className="h-105 w-full rounded-2xl border object-cover"
        unoptimized
      />

      {/* Header */}

      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <Badge className="w-fit">Live Event</Badge>
            <h1 className="text-4xl font-bold tracking-tight">{event.title}</h1>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Publish Date
                    </p>

                    <p className="font-semibold">
                      {format(new Date(event.publishAt), 'PPP')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Tag className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>

                    <p className="font-semibold">{event.category.name}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Users className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Participants
                    </p>

                    <p className="font-semibold">{count}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            disabled={loading}
            onClick={joined ? handleLeave : handleJoin}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : joined ? (
              'Leave Event'
            ) : (
              'Join Event'
            )}
          </Button>
        </div>

        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">About this Event</h2>

          <p className="leading-8 text-muted-foreground">{event.description}</p>
        </div>
      </div>

      {/* Gallery */}

      {event.photos.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Event Gallery</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {event.photos.map((photo) => (
              <div
                key={photo.filename}
                className="overflow-hidden rounded-xl border"
              >
                <Image
                  src={getImageUrl(photo.url)}
                  alt={event.title}
                  width={400}
                  height={280}
                  className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}

      <div className="rounded-xl border bg-card p-6">
        <div className="rounded-3xl border bg-primary/5 p-10 text-center">
          <h2 className="text-3xl font-bold">Ready to participate?</h2>

          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Join this event to become a participant and receive future updates
            instantly through our real-time platform.
          </p>

          <Button
            size="lg"
            className="mt-8 px-10"
            disabled={loading}
            onClick={joined ? handleLeave : handleJoin}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : joined ? (
              'Leave Event'
            ) : (
              'Join Event'
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}