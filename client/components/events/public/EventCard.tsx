'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

import { Event } from '@/redux/api/eventApi';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/utils/getImgUrl';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-video">
        <Image
          src={getImageUrl(event.photos[0]?.url)}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">
            {typeof event.category === 'string'
              ? event.category
              : event.category?.name}
          </Badge>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />

            {new Date(event.publishAt).toLocaleDateString()}
          </div>
        </div>

        <h3 className="line-clamp-1 text-xl font-semibold">{event.title}</h3>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {event.description}
        </p>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/events/${event._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}