import type { Metadata } from 'next';
import { BrandStorySection } from '@/components/sections/BrandStorySection';
import { ProcessTimelineSection } from '@/components/sections/ProcessTimelineSection';
import { SustainabilitySection } from '@/components/sections/SustainabilitySection';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'The Natural Bee Farm story — forty hives, seventeen seasons of treatment-free beekeeping, and a commitment to sustainable honey production in the Nilgiri Hills.',
};

export default function OurStoryPage() {
  return (
    <div className="pt-24">
      {/* Page hero */}
      <div className="max-w-8xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-wax-500 mb-6">
          Our Story
        </p>
        <h1
          className="font-display font-bold text-walnut-900 leading-[0.88] max-w-3xl"
          style={{ fontSize: 'clamp(3rem, 1rem + 9vw, 8rem)' }}
        >
          Seventeen<br />
          <span className="italic font-light text-honey-500">seasons</span><br />
          of honesty.
        </h1>
      </div>

      <BrandStorySection />
      <section id="process">
        <ProcessTimelineSection />
      </section>
      <section id="sustainability">
        <SustainabilitySection />
      </section>
    </div>
  );
}
