import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border bg-card p-12 text-center shadow-sm">
          <h2 className="text-4xl font-bold">Ready to Explore Events?</h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Discover exciting events happening around you or manage your own
            events with our powerful admin dashboard.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/events">Browse Events</Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/login">Admin Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}