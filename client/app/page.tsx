import { CTA } from '@/components/home/CTA';
import { FeaturedEvents } from '@/components/home/FeaturedEvents';
import { Hero } from '@/components/home/Hero';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <FeaturedEvents />
        <WhyChooseUs />
        <CTA />
      </main>
    </>
  );
}