'use client';

import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-primary" />

          <span className="text-xl font-bold">Event Manager</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>

          <Link
            href="/events"
            className="text-sm font-medium hover:text-primary"
          >
            Events
          </Link>
        </nav>

        <Button asChild>
          <Link href="/login">Admin Login</Link>
        </Button>
      </div>
    </header>
  );
}