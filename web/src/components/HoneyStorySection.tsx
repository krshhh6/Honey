'use client';

import React from 'react';
import ScrollStack, { ScrollStackItem } from './ui/ScrollStack';
import styles from './HoneyStorySection.module.css';

interface HarvestStep {
  id: string;
  circleNum: string;
  badgeText: string;
  mainHeading: string;
  quote: string;
  detail: string;
  tag: string;
  image: string;
  imageAlt: string;
}

const HARVEST_STEPS: HarvestStep[] = [
  {
    id: 'step-1',
    circleNum: '01',
    badgeText: 'Apiary Opening',
    mainHeading: 'HOW NATURAL HONEY IS MADE ?',
    quote: 'Step 01 · Entering the hive in harmony with nature.',
    detail: 'Beekeeper carefully opening hive on natural honey farm',
    tag: 'Principia Apiary · Live Harvest',
    image: '/h1.png',
    imageAlt: 'Beekeeper carefully opening hive on natural honey farm',
  },
  {
    id: 'step-2',
    circleNum: '02',
    badgeText: 'Golden Frame Extraction',
    mainHeading: 'GOLDEN HONEYCOMB HARVEST',
    quote: '“Carefully harvested from the hive, where nature creates every drop of golden honey.”',
    detail: 'Beekeeper lifting honey-filled frame surrounded by bees',
    tag: 'Principia Honey · Frame Extraction',
    image: '/h2.png',
    imageAlt: 'Beekeeper lifting honey-filled frame surrounded by bees',
  },
  {
    id: 'step-3',
    circleNum: '03',
    badgeText: 'Pure Nectar Transformation',
    mainHeading: 'FROM HIVE TO HONEYCOMB',
    quote: '“Inside the hive, bees transform nature’s nectar into golden honey, filling each honeycomb cell drop by drop.”',
    detail: 'Beekeeper checking honey-filled comb dripping raw golden honey',
    tag: 'Principia Honey · Golden Dripping Comb',
    image: '/h3.png',
    imageAlt: 'Beekeeper checking honey-filled comb dripping raw golden honey',
  },
  {
    id: 'step-4',
    circleNum: '04',
    badgeText: 'Raw Cold Filtering',
    mainHeading: 'GENTLE COLD FILTERING',
    quote: '“The honey is gently filtered from the harvested comb, removing wax and impurities.”',
    detail: 'Raw golden honey being gently filtered through stainless steel mesh strainers',
    tag: 'Principia Honey · Cold Gravity Filtering',
    image: '/h4.png',
    imageAlt: 'Raw golden honey being gently filtered through stainless steel mesh strainers',
  },
  {
    id: 'step-5',
    circleNum: '05',
    badgeText: 'Jar Bottling & Perfection',
    mainHeading: 'HIVE TO BOTTLE JOURNEY',
    quote: '“The harvested honey is gently filtered to remove wax and impurities, keeping its natural golden color and rich texture.”',
    detail: 'Golden honey flowing from stainless steel tap into a clean glass jar',
    tag: 'Principia Honey · Glass Jar Bottling',
    image: '/h5.png',
    imageAlt: 'Golden honey flowing from stainless steel tap into a clean glass jar',
  },
];

export default function HoneyStorySection() {
  return (
    <section className={styles.section} aria-label="How Natural Honey Is Made — Harvest Story">
      {/* Background Honeycomb Pattern */}
      <div className={styles.honeycombBg} aria-hidden="true" />

      {/* Decorative Accents */}
      <img
        src="/assets/story_00.png"
        alt=""
        className={styles.storyDipperLeft}
        aria-hidden="true"
      />
      <img
        src="/assets/story_01.png"
        alt=""
        className={styles.storyJarRight}
        aria-hidden="true"
      />

      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.sectionHeader} style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div className={styles.headerTextGroup} style={{ alignItems: 'center' }}>
            <span className={styles.subHeadingPill}>Pure Honey Harvest Journey</span>
            <h2 className={styles.mainHeading} style={{ fontSize: 'clamp(36px, 4.5vw, 64px)' }}>
              HOW NATURAL HONEY IS MADE ?
            </h2>
            <p className={styles.shortTextQuote} style={{ textAlign: 'center' }}>
              Explore the 5-step journey from our pristine hive apiaries to pure raw golden honey.
            </p>
          </div>
        </header>

        {/* ScrollStack Component Integration */}
        <ScrollStack
          useWindowScroll={true}
          itemDistance={100}
          itemScale={0.03}
          itemStackDistance={30}
          stackPosition="20%"
          scaleEndPosition="10%"
          baseScale={0.88}
          blurAmount={2}
        >
          {HARVEST_STEPS.map((step) => (
            <ScrollStackItem key={step.id}>
              <div className={styles.stackCardContent}>
                {/* Left Information Content */}
                <div className={styles.stackCardLeft}>
                  <div className={styles.stackCardHeader}>
                    <div className={styles.stackCircleBadge}>{step.circleNum}</div>
                    <span className={styles.stackBadgePill}>{step.badgeText}</span>
                  </div>

                  <h3 className={styles.stackMainHeading}>{step.mainHeading}</h3>

                  <p className={styles.stackQuoteText}>{step.quote}</p>

                  <div className={styles.stackDetailCard}>
                    <span className={styles.stackDetailIcon}>✦</span>
                    <p className={styles.stackDetailText}>{step.detail}</p>
                  </div>

                  <div className={styles.stackTagPill}>
                    <span>{step.tag}</span>
                  </div>
                </div>

                {/* Right High-Definition Harvest Image */}
                <div className={styles.stackCardRight}>
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    className={styles.stackCardImage}
                  />
                  <div className={styles.stackImageBadge}>
                    <span className={styles.stackImageBadgeDot} />
                    <span>{step.tag}</span>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
