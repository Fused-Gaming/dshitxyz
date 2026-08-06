import { Hero, HowItWorks, FeaturedCollections } from '@/components/sections';
import { Footer } from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedCollections />
      {/* <FAQ /> - TODO: Debug useState issue */}
      <Footer />
    </>
  );
}
