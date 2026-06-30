'use client';

import { notFound, useParams } from 'next/navigation';

import { useGetEventByIdQuery } from '@/redux/api/eventApi';
import { EventForm } from '@/components/events/createEventForm';

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetEventByIdQuery(id);

  if (isLoading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }

  if (isError || !data?.data) {
    notFound();
  }

  return <EventForm mode="edit" event={data.data} />;
}