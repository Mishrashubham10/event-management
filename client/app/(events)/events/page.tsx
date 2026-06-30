import { PublicEvents } from "@/components/events/public/PublicEvents";

export default function EventsPage() {
  return (
    <main className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Upcoming Events</h1>

        <p className="mt-2 text-muted-foreground">
          Discover and explore the latest events.
        </p>
      </div>

      <PublicEvents />
    </main>
  );
}