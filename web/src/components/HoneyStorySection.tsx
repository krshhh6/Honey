'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HoneyStorySection.module.css';

// Register GSAP plugin safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StoryLineItem {
  id: string;
  stepNum: string;
  stepLabel: string;
  text: string;
}

interface StorySectionItem {
  id: string;
  circleNum: string;
  badgeText: string;
  mainHeading: string;
  shortQuote: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  isReverse: boolean;
  lines: StoryLineItem[];
}

const STORY_SECTIONS: StorySectionItem[] = [
  {
    id: 'section-1',
    circleNum: '01',
    badgeText: 'Apiary Opening',
    mainHeading: 'HOW NATURAL HONEY IS MADE ?',
    shortQuote: 'Step 01 · Entering the hive in harmony with nature.',
    image: '/h1.png',
    imageAlt: 'Beekeeper carefully opening hive on natural honey farm',
    imageCaption: 'Principia Apiary · Live Harvest',
    isReverse: false,
    lines: [
      {
        id: '1-1',
        stepNum: '01',
        stepLabel: 'Phase 01 · Hive Opening',
        text: 'Deep in the natural farm, the beekeeper carefully opens the hive.',
      },
      {
        id: '1-2',
        stepNum: '02',
        stepLabel: 'Phase 02 · Bee Colony',
        text: 'Inside, thousands of bees work together to fill the honeycomb with golden honey.',
      },
      {
        id: '1-3',
        stepNum: '03',
        stepLabel: 'Phase 03 · Frame Selection',
        text: 'The beekeeper gently lifts a honey-filled frame, beginning the journey from hive to pure honey.',
      },
    ],
  },
  {
    id: 'section-2',
    circleNum: '02',
    badgeText: 'Golden Frame Extraction',
    mainHeading: 'GOLDEN HONEYCOMB HARVEST',
    shortQuote: '“Carefully harvested from the hive, where nature creates every drop of golden honey.”',
    image: '/h2.png',
    imageAlt: 'Beekeeper lifting honey-filled frame surrounded by bees',
    imageCaption: 'Principia Honey · Frame Extraction',
    isReverse: true,
    lines: [
      {
        id: '2-1',
        stepNum: '01',
        stepLabel: 'Phase 01 · Frame Lifting',
        text: 'The beekeeper carefully lifts a honey-filled frame from the hive, surrounded by thousands of hardworking bees.',
      },
      {
        id: '2-2',
        stepNum: '02',
        stepLabel: 'Phase 02 · Golden Cell Creation',
        text: 'Each golden cell represents hours of natural work—nectar collected from flowers, transformed, and stored by the bees.',
      },
      {
        id: '2-3',
        stepNum: '03',
        stepLabel: 'Phase 03 · Journey to Bottle',
        text: 'This is the moment the pure honey begins its journey from the hive to the bottle.',
      },
    ],
  },
  {
    id: 'section-3',
    circleNum: '03',
    badgeText: 'Pure Nectar Transformation',
    mainHeading: 'FROM HIVE TO HONEYCOMB',
    shortQuote: '“Inside the hive, bees transform nature’s nectar into golden honey, filling each honeycomb cell drop by drop.”',
    image: '/h3.png',
    imageAlt: 'Beekeeper checking honey-filled comb dripping raw golden honey',
    imageCaption: 'Principia Honey · Golden Dripping Comb',
    isReverse: false,
    lines: [
      {
        id: '3-1',
        stepNum: '01',
        stepLabel: 'Phase 01 · Comb Inspection',
        text: 'The beekeeper carefully opens the hive and checks the honeycomb.',
      },
      {
        id: '3-2',
        stepNum: '02',
        stepLabel: 'Phase 02 · Bee Alchemy',
        text: 'Inside the hive, thousands of bees work together to store fresh honey.',
      },
      {
        id: '3-3',
        stepNum: '03',
        stepLabel: 'Phase 03 · Drop by Drop',
        text: 'Each honeycomb cell is filled drop by drop, transforming nature’s nectar into pure golden honey.',
      },
    ],
  },
  {
    id: 'section-4',
    circleNum: '04',
    badgeText: 'Raw Cold Filtering',
    mainHeading: 'GENTLE COLD FILTERING',
    shortQuote: '“The honey is gently filtered from the harvested comb, removing wax and impurities.”',
    image: '/h4.png',
    imageAlt: 'Raw golden honey being gently filtered through stainless steel mesh strainers',
    imageCaption: 'Principia Honey · Cold Gravity Filtering',
    isReverse: true,
    lines: [
      {
        id: '4-1',
        stepNum: '01',
        stepLabel: 'Phase 01 · Natural Filtration',
        text: 'The honey is gently filtered from the harvested comb, removing wax and impurities.',
      },
      {
        id: '4-2',
        stepNum: '02',
        stepLabel: 'Phase 02 · Fresh Farm Collection',
        text: 'Pure, golden honey is collected fresh from the farm, ready for the next step.',
      },
      {
        id: '4-3',
        stepNum: '03',
        stepLabel: 'Phase 03 · Enzyme Preservation',
        text: 'Unheated and raw, preserving every natural enzyme, antioxidant, and delicate floral bouquet.',
      },
    ],
  },
  {
    id: 'section-5',
    circleNum: '05',
    badgeText: 'Jar Bottling & Perfection',
    mainHeading: 'HIVE TO BOTTLE JOURNEY',
    shortQuote: '“The harvested honey is gently filtered to remove wax and impurities, keeping its natural golden color and rich texture.”',
    image: '/h5.png',
    imageAlt: 'Golden honey flowing from stainless steel tap into a clean glass jar',
    imageCaption: 'Principia Honey · Glass Jar Bottling',
    isReverse: false,
    lines: [
      {
        id: '5-1',
        stepNum: '01',
        stepLabel: 'Phase 01 · Gentle Filtration',
        text: 'The harvested honey is gently filtered to remove wax and impurities.',
      },
      {
        id: '5-2',
        stepNum: '02',
        stepLabel: 'Phase 02 · Golden Color & Texture',
        text: 'Keeping its natural golden color and rich, velvety texture untouched.',
      },
      {
        id: '5-3',
        stepNum: '03',
        stepLabel: 'Phase 03 · Glass Jar Bottling',
        text: 'Filled into clean glass jars, bringing the journey from hive to bottle to life.',
      },
    ],
  },
];

export default function HoneyStorySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const imageFrameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const lineCardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const leafLeftRefs = useRef<(HTMLImageElement | null)[]>([]);
  const leafRightRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      STORY_SECTIONS.forEach((sec, sIdx) => {
        const secEl = sectionRefs.current[sIdx];
        if (!secEl) return;

        // 1. Side Leaves Popping & Continuous Floating Animation
        const leftLeaf = leafLeftRefs.current[sIdx];
        if (leftLeaf) {
          gsap.fromTo(
            leftLeaf,
            { scale: 0, opacity: 0, rotate: -30 },
            {
              scale: 1,
              opacity: 0.85,
              rotate: 0,
              duration: 1.2,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: secEl,
                start: 'top 75%',
              },
            }
          );
          gsap.to(leftLeaf, {
            y: -12,
            rotate: -3,
            duration: 4.5 + sIdx * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.2,
          });
        }

        const rightLeaf = leafRightRefs.current[sIdx];
        if (rightLeaf) {
          gsap.fromTo(
            rightLeaf,
            { scale: 0, opacity: 0, rotate: 30 },
            {
              scale: 1,
              opacity: 0.85,
              rotate: 0,
              duration: 1.2,
              delay: 0.15,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: secEl,
                start: 'top 75%',
              },
            }
          );
          gsap.to(rightLeaf, {
            y: 12,
            rotate: 3,
            duration: 4.8 + sIdx * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.3,
          });
        }

        // 2. Image Slash Reveal Animation
        const imgEl = imageRefs.current[sIdx];
        if (imgEl) {
          gsap.set(imgEl, {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            scale: 1.2,
          });

          gsap.to(imgEl, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            scale: 1.0,
            ease: 'power3.out',
            duration: 1.3,
            scrollTrigger: {
              trigger: secEl,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        // 3. Floating Effect for Image Frame (Scroll Parallax + Organic Floating Loop)
        const imgFrameEl = imageFrameRefs.current[sIdx];
        if (imgFrameEl) {
          gsap.to(imgFrameEl, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: secEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });

          gsap.to(imgFrameEl, {
            y: -10,
            rotation: sIdx % 2 === 0 ? 1.2 : -1.2,
            duration: 3.8 + sIdx * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        // 4. Line-by-Line Cards Scroll Highlights & Micro Floating Loops
        sec.lines.forEach((_, lIdx) => {
          const cardKey = `${sIdx}-${lIdx}`;
          const cardEl = lineCardRefs.current[cardKey];
          if (!cardEl) return;

          gsap.fromTo(
            cardEl,
            { opacity: 0.3, y: 25, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: 'power2.out',
              duration: 0.8,
              scrollTrigger: {
                trigger: cardEl,
                start: 'top 82%',
                end: 'top 50%',
                scrub: 0.6,
                toggleClass: { targets: cardEl, className: styles.storyLineCardActive },
              },
            }
          );

          gsap.to(cardEl, {
            y: -5,
            duration: 3.2 + lIdx * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: lIdx * 0.25,
          });
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.sectionWrapper}>
      {STORY_SECTIONS.map((sec, sIdx) => (
        <section
          key={sec.id}
          ref={(el) => { sectionRefs.current[sIdx] = el; }}
          className={`${styles.section} ${sec.isReverse ? styles.sectionAlt : ''}`}
          aria-label={sec.mainHeading}
        >
          {/* Background Pattern */}
          <div className={styles.honeycombBg} aria-hidden="true" />

          {/* Seamless Organic Top Wave Separator (Matches preceding section color, no straight line) */}
          {sIdx > 0 && (
            <div className={styles.sectionWaveTop} aria-hidden="true">
              <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={styles.sectionWaveSvg}>
                <path
                  fill={sIdx % 2 === 1 ? '#fdf0ee' : '#fff7eb'}
                  d="M0,0 L1440,0 L1440,64 C1344,64 1248,64 1152,53.3 C1056,43 960,21 864,21.3 C768,21 672,43 576,58.7 C480,75 384,85 288,80 C192,75 96,53 48,42.7 L0,32 Z"
                />
              </svg>
            </div>
          )}

          {/* Side Leaves (Popping Animation) */}
          <img
            ref={(el) => { leafLeftRefs.current[sIdx] = el; }}
            src="/assets/eucalyptus.png"
            alt=""
            className={styles.poppingLeafLeft}
            aria-hidden="true"
          />
          <img
            ref={(el) => { leafRightRefs.current[sIdx] = el; }}
            src="/assets/eucalyptus.png"
            alt=""
            className={styles.poppingLeafRight}
            aria-hidden="true"
          />

          <div className={styles.container}>
            {/* Section Header with Circle Badge */}
            <header className={styles.sectionHeader}>
              <div className={styles.circleBadge}>
                <svg viewBox="0 0 100 100" className={styles.circleSvg}>
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    stroke="#ffcc26"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="270"
                    strokeLinecap="round"
                  />
                </svg>
                <span className={styles.circleNumber}>{sec.circleNum}</span>
              </div>

              <div className={styles.headerTextGroup}>
                <span className={styles.subHeadingPill}>{sec.badgeText}</span>
                <h2 className={styles.mainHeading}>{sec.mainHeading}</h2>
                <p className={styles.shortTextQuote}>{sec.shortQuote}</p>
              </div>
            </header>

            {/* Grid: Image Frame & 3 Aligned Vertical Cards */}
            <div className={`${styles.grid} ${sec.isReverse ? styles.gridReverse : ''}`}>
              {/* Floating Image Frame with Slash Reveal */}
              <div
                ref={(el) => { imageFrameRefs.current[sIdx] = el; }}
                className={styles.imageFrame}
              >
                <div className={styles.slashImageContainer}>
                  <img
                    ref={(el) => { imageRefs.current[sIdx] = el; }}
                    src={sec.image}
                    alt={sec.imageAlt}
                    className={styles.slashImage}
                  />
                  <div className={`${styles.slashEdge} ${styles.slashEdgeLeft}`} aria-hidden="true" />
                  <div className={`${styles.slashEdge} ${styles.slashEdgeRight}`} aria-hidden="true" />

                  <div className={styles.imageBadge}>
                    <span className={styles.imageBadgeDot} />
                    <span>{sec.imageCaption}</span>
                  </div>
                </div>
              </div>

              {/* 3 Vertical Cards (Height Aligned with Image) */}
              <div className={styles.storyLinesWrapper}>
                {sec.lines.map((line, lIdx) => {
                  const cardKey = `${sIdx}-${lIdx}`;
                  return (
                    <div
                      key={line.id}
                      ref={(el) => { lineCardRefs.current[cardKey] = el; }}
                      className={styles.storyLineCard}
                    >
                      <div className={styles.stepCardCircle}>{line.stepNum}</div>
                      <span className={styles.storyLineNumber}>{line.stepLabel}</span>
                      <p className={styles.storyLineText}>{line.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
