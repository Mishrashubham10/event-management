import Link from 'next/link';
import { ArrowRight, CalendarDays, ShieldCheck, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="border-b">
      <div className="container mx-auto px-4 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />

              <span>Modern Event Management Platform</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-extrabold leading-tight tracking-tight lg:text-6xl">
                Discover & Manage
                <span className="block text-primary">Amazing Events</span>
              </h1>

              <p className="max-w-xl text-lg text-muted-foreground">
                Discover upcoming events, explore exciting experiences, and
                manage everything from a modern dashboard built for organizers.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/events">
                  Browse Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/login">Admin Login</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 pt-6">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-primary" />

                <div>
                  <p className="font-semibold">Easy Scheduling</p>

                  <p className="text-sm text-muted-foreground">
                    Publish events instantly
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />

                <div>
                  <p className="font-semibold">Secure Dashboard</p>

                  <p className="text-sm text-muted-foreground">
                    Protected admin access
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="rounded-2xl border bg-card p-8 shadow-xl">
              <div className="space-y-6">
                <div className="rounded-xl border bg-muted p-6">
                  <h3 className="text-lg font-semibold">
                    🎵 Music Festival 2026
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Join thousands of music lovers for an unforgettable live
                    experience.
                  </p>
                </div>

                <div className="rounded-xl border bg-muted p-6">
                  <h3 className="text-lg font-semibold">
                    ⚽ Sports Championship
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Experience thrilling matches from top teams around the
                    country.
                  </p>
                </div>

                <div className="rounded-xl border bg-muted p-6">
                  <h3 className="text-lg font-semibold">💼 Tech Conference</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Explore the latest trends in AI, startups, and modern web
                    technologies.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-5 -right-5 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}