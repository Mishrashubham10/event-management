'use client';

import { Activity } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

export function RecentActivity() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Activity</h2>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Activity className="mb-4 h-12 w-12 text-muted-foreground" />

          <h3 className="text-lg font-semibold">Live Activity Feed</h3>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Real-time event creation, updates, deletions and participant
            activity will appear here once Socket.IO activity tracking is
            enabled.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}