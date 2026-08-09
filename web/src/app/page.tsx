import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { BrandStorySection } from '@/components/sections/BrandStorySection';
import { ProductShelfSection } from '@/components/sections/ProductShelfSection';
import { ProcessTimelineSection } from '@/components/sections/ProcessTimelineSection';
import { SustainabilitySection } from '@/components/sections/SustainabilitySection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FarmVisitSection } from '@/components/sections/FarmVisitSection';

export const metadata: Metadata = {
  title: 'Natural Bee Farm — Raw Honey from the Nilgiri Hills',
  description:
    'Single-origin, treatment-free raw honey from forty hives in the Nilgiri Hills. Two harvests a year — Wildflower Raw, Forest Dark, Raw Comb, and Creamed Honey.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStorySection />
      <ProductShelfSection />
      <ProcessTimelineSection />
      <SustainabilitySection />
      <TestimonialsSection />
      <FarmVisitSection />
    </>
  );
}
