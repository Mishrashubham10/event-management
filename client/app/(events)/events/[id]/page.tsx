import { EventDetails } from "@/components/events/public/EventDetail";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="container mx-auto py-10">
      <EventDetails eventId={id} />
    </main>
  );
}