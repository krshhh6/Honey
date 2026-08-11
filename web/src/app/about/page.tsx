'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AboutHero from '@/components/about/AboutHero';
import StoryBlock, { StoryBlockProps } from '@/components/about/StoryBlock';
import HorizontalImageSlider from '@/components/about/HorizontalImageSlider';
import LifecycleSection from '@/components/about/LifecycleSection';

const STORY_BLOCKS: StoryBlockProps[] = [
  {
    id: 'story-blocks',
    image: '/s2.avif',
    imageAlt: 'Farmers and beekeepers gathering around beehives',
    heading: 'It began with training beekeepers.',
    text: 'Farmers, hobbyists, and tribal communities learning and working with bees.',
    reverse: false,
    isIllustration: false,
    imageWidth: '462.22px',
    imageHeight: '297.76px',
  },
  {
    id: 'block-ecosystem',
    image: '/about-illustration.png',
    imageAlt: 'Flat illustration of beekeepers and customers trading honey under floating bees',
    heading: 'A community slowly became an ecosystem.',
    text: 'Beekeepers, colonies, apiaries, and honey sourcing began to grow together.',
    reverse: true,
    isIllustration: true,
    imageWidth: '561.05px',
    imageHeight: '376.82px',
  },
];

export default function AboutPage() {
  // Ensure page scrolls to top on navigation entry
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#fdf0ee', minHeight: '100vh', width: '100%' }}>
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <AboutHero
        headline="MEADLIGHT DID NOT BEGIN AS A BRAND."
        subtext="We started as a beekeeping community."
        ctaText="Explore our complete journey"
        imageSrc="/s1.avif"
        imageAlt="Beekeepers inspecting honeycomb frame in natural farm"
      />

      {/* Repeating Sequential Story Blocks */}
      <main style={{ width: '100%', paddingTop: '100px' }}>
        {STORY_BLOCKS.map((block) => (
          <StoryBlock key={block.id || block.heading} {...block} />
        ))}

        {/* Full-Width Horizontal Image Slider (Sharp Square Images) */}
        <HorizontalImageSlider />

        {/* Terracotta Lifecycle & Ecosystem Sections + Impact Counter */}
        <LifecycleSection />
      </main>
    </div>
  );
}
