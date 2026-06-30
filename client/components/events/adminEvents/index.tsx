'use client';

import Link from 'next/link';
import Image from 'next/image';

import { format } from 'date-fns';
import { SquarePen, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  useDeleteEventMutation,
  useGetAdminEventsQuery,
} from '@/redux/api/eventApi';

import { getImageUrl } from '@/utils/getImgUrl';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';

export function AdminEventsTable() {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAdminEventsQuery();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteEvent(id).unwrap();

      toast.success(response.message);
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error as { data?: { message?: string } }).data?.message ===
          'string'
          ? (error as { data?: { message?: string } }).data?.message
          : 'Unable to delete event.';

      toast.error(message);
    }
  };

  if (isLoading) {
    return <p className="py-10 text-center">Loading events...</p>;
  }

  if (isError) {
    return (
      <p className="py-10 text-center text-destructive">
        Failed to fetch events.
      </p>
    );
  }

  if (!data?.data.length) {
    return <p className="py-10 text-center">No events found.</p>;
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Events</h1>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>

              <TableHead>Title</TableHead>

              <TableHead>Category</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Publish Date</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.data.map((item) => (
              <TableRow
                key={item._id}
                onClick={() => router.push(`/events/${item._id}`)}
              >
                <TableCell>
                  <Image
                    src={getImageUrl(item.photos[0]?.url)}
                    alt={item.title}
                    width={80}
                    height={56}
                    className="rounded-md border object-cover"
                    unoptimized
                  />
                </TableCell>

                <TableCell className="font-medium">{item.title}</TableCell>

                <TableCell>
                  {typeof item.category === 'string'
                    ? item.category
                    : item.category.name}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      item.status === 'published' ? 'default' : 'secondary'
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  {format(new Date(item.publishAt), 'dd MMM yyyy')}
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button asChild size="icon" variant="outline">
                      <Link href={`/dashboard/admin/events/${item._id}`}>
                        <SquarePen className="h-4 w-4" />
                      </Link>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Event?</AlertDialogTitle>

                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction
                            disabled={isDeleting}
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
