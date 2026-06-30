'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Eye } from 'lucide-react';

import { useGetAdminEventsQuery } from '@/redux/api/eventApi';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { getImageUrl } from '@/utils/getImgUrl';

export default function RecentEvents() {
  const { data, isLoading } = useGetAdminEventsQuery();

  const events = data?.data ?? [];

  const recentEvents = [...events]
    .sort(
      (a, b) =>
        new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime(),
    )
    .slice(0, 5);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>Latest created events.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-14 animate-pulse rounded-md bg-muted"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recentEvents.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>Latest created events.</CardDescription>
        </CardHeader>

        <CardContent className="flex h-40 items-center justify-center">
          <p className="text-muted-foreground">No events found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Events</CardTitle>

        <CardDescription>Latest created events.</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>

              <TableHead>Title</TableHead>

              <TableHead>Category</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Publish Date</TableHead>

              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentEvents.map((event) => (
              <TableRow key={event._id}>
                <TableCell>
                  <Image
                    src={getImageUrl(event.photos[0]?.url)}
                    alt={event.title}
                    width={70}
                    height={50}
                    className="rounded-md border object-cover"
                    unoptimized
                  />
                </TableCell>

                <TableCell className="font-medium">{event.title}</TableCell>

                <TableCell>
                  {typeof event.category === 'string'
                    ? event.category
                    : event.category?.name}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      event.status === 'published' ? 'default' : 'secondary'
                    }
                  >
                    {event.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  {new Date(event.publishAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/dashboard/admin/events`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
