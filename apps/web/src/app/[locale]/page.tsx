import { Hero, HowItWorks, FeaturedCollections, FAQ } from '@/components/sections';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedCollections />
      <FAQ />
      <Footer />
    </>
  );
}
