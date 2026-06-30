import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-10 md:flex-row">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />

          <span className="font-semibold">Event Manager</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/">Home</Link>

          <Link href="/events">Events</Link>

          <Link href="/login">Login</Link>
        </div>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Event Manager. All rights reserved.
        </p>
      </div>
    </footer>
  );
}