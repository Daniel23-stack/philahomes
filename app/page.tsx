import { HeroBanner } from '@/components/home/HeroBanner';
import { HighlightsSection } from '@/components/home/HighlightsSection';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { LatestProjectSection } from '@/components/home/LatestProjectSection';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { AboutTeaserSection } from '@/components/home/AboutTeaserSection';
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <HighlightsSection />
      <ServicesOverview />
      <LatestProjectSection />
      <FeaturedSection />
      <AboutTeaserSection />
      <TestimonialsCarousel />
      <NewsletterSection />
    </>
  );
}
