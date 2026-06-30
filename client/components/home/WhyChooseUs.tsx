import { CalendarDays, ShieldCheck, Sparkles } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: 'Easy Event Discovery',
    description: 'Browse upcoming events through a clean and modern interface.',
    icon: Sparkles,
  },
  {
    title: 'Smart Scheduling',
    description:
      'Events are automatically published based on their scheduled date.',
    icon: CalendarDays,
  },
  {
    title: 'Secure Management',
    description:
      'Admin dashboard protected with secure httpOnly cookie authentication.',
    icon: ShieldCheck,
  },
];

export function WhyChooseUs() {
  return (
    <section className="border-y bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Why Choose Event Manager?</h2>

          <p className="mt-4 text-muted-foreground">
            Everything you need to manage and discover events in one modern
            platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title}>
                <CardContent className="space-y-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold">{feature.title}</h3>

                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}