'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlantBees from './PlantBees';
import styles from './HoneyProcessSection.module.css';

// Register GSAP plugin safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    id: 1,
    title: 'The Farmer',
    shortDesc: 'Beekeeper tends the hives, checks frames, and ensures the health of the colony.',
    iconSvg: '/assets/icons/step-1.svg',
    fullStory:
      'Every jar of Meadlight begins with dedicated beekeepers who work in harmony with nature. Using traditional and sustainable methods, they inspect hive boxes, monitor queen vitality, and shield the bees from environmental stressors without synthetic chemicals.',
    detailPoints: ['100% Organic & Chemical-Free', 'Sustainable Apiary Operations', 'Heritage Beekeeping Traditions'],
    badge: 'Step 01 · Care',
  },
  {
    id: 2,
    title: 'The Bees',
    shortDesc: 'Bees forage nearby flowers, collecting nectar and returning it to the hive.',
    iconSvg: '/assets/icons/step-2.svg',
    fullStory:
      'Thousands of worker bees journey across pristine wildflowers and eucalyptus groves within a 3-mile radius. A single bee produces just 1/12 teaspoon of honey in her lifetime, making every golden drop a precious, collective masterpiece of nature.',
    detailPoints: ['Wild Eucalyptus & Meadow Flora', 'Untouched Foraging Grounds', 'Natural Honeybee Alchemy'],
    badge: 'Step 02 · Forage',
  },
  {
    id: 3,
    title: 'The Hive',
    shortDesc: 'Inside the honeycomb, nectar is transformed into honey and sealed with wax caps.',
    iconSvg: '/assets/icons/step-3.svg',
    fullStory:
      'Back inside the hive, house bees pass nectar from bee to bee, reducing moisture through rapid wing fanning. When moisture drops below 18%, the honey reaches peak ripeness and bees cap each hexagonal cell with pure beeswax.',
    detailPoints: ['Natural Moisture Reduction', 'Hexagonal Beeswax Capping', 'Enzyme & Antioxidant Density'],
    badge: 'Step 03 · Ripening',
  },
  {
    id: 4,
    title: 'The Harvest',
    shortDesc: 'Honey is carefully extracted, filtered, and jarred raw and unprocessed.',
    iconSvg: '/assets/icons/step-4.svg',
    fullStory:
      'Once fully capped, honey frames are harvested by hand. We cold-extract and gravity-strain the honey without micro-filtering or pasteurization, preserving live enzymes, wild pollen grains, and rich complex aromas.',
    detailPoints: ['Raw & Unpasteurized', 'Gravity Mesh Strained Only', 'Small-Batch Glass Bottled'],
    badge: 'Step 04 · Pure Bottling',
  },
];

export default function HoneyProcessSection() {
  const sectionRef = useRef(null);
  const botanicalLeftRef = useRef(null);
  const botanicalRightRef = useRef(null);
  const iconRefs = useRef([]);
  const cardRefs = useRef([]);
  const [activeModalStep, setActiveModalStep] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 1. Floating Parallax for Eucalyptus Branches & Continuous Bobbing
      if (botanicalLeftRef.current) {
        gsap.to(botanicalLeftRef.current, {
          y: 45,
          rotate: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
        gsap.to(botanicalLeftRef.current, {
          y: -10,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (botanicalRightRef.current) {
        gsap.to(botanicalRightRef.current, {
          y: -40,
          rotate: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
        gsap.to(botanicalRightRef.current, {
          y: 10,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 2. Floating Effect & Gentle Bobbing Loops for Step Cards
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl) return;

        // Scroll Parallax Displacement
        gsap.to(cardEl, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: cardEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        // Continuous Gentle Floating Loop
        gsap.to(cardEl, {
          y: -8,
          rotation: index % 2 === 0 ? 0.8 : -0.8,
          duration: 3.5 + index * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      });

      // 3. Idle Icon Floating Animation
      iconRefs.current.forEach((iconEl, index) => {
        if (!iconEl) return;

        ScrollTrigger.create({
          trigger: iconEl,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(iconEl, {
              y: -5,
              duration: 2.2 + index * 0.2,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            });
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="How Honey Is Made - Steps & Stories">
      {/* Background Honeycomb Pattern */}
      <div className={styles.honeycombBg} aria-hidden="true" />

      {/* Seamless Organic Top Wave Separator (Matches preceding section color #fdf0ee, no straight line) */}
      <div className={styles.sectionWaveTop} aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={styles.sectionWaveSvg}>
          <path
            fill="#fdf0ee"
            d="M0,0 L1440,0 L1440,64 C1344,64 1248,64 1152,53.3 C1056,43 960,21 864,21.3 C768,21 672,43 576,58.7 C480,75 384,85 288,80 C192,75 96,53 48,42.7 L0,32 Z"
          />
        </svg>
      </div>

      {/* Eucalyptus Botanical Decor (Left & Right) */}
      <img
        ref={botanicalLeftRef}
        src="/assets/eucalyptus.png"
        alt=""
        className={styles.botanicalLeft}
        aria-hidden="true"
      />
      <img
        ref={botanicalRightRef}
        src="/assets/eucalyptus.png"
        alt=""
        className={styles.botanicalRight}
        aria-hidden="true"
      />

      {/* Group 2 Plant & Greenery Bees (ScrollTriggered) */}
      <PlantBees targetSectionRef={sectionRef} />

      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <div className={styles.subTitlePill}>
            <span className={styles.subTitleDot} />
            Pure Honey Alchemy
          </div>
          <h2 className={styles.mainTitle}>How Honey Is Made</h2>
          <p className={styles.description}>
            From wild eucalyptus blossoms to pure golden jars, discover the 4-step story of nature’s finest honey.
          </p>
        </header>

        {/* 4 Steps Grid (Compact & Seamless) */}
        <div className={styles.processWrapper}>
          <div className={styles.stepsGrid}>
            {STEPS.map((step, idx) => (
              <motion.article
                key={step.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={styles.stepCard}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.65, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
              >
                {/* Step Circle Badge */}
                <div className={styles.stepBadge}>
                  <span className={styles.stepBadgeNum}>{step.id}</span>
                </div>

                {/* Floating Icon Frame */}
                <div ref={(el) => (iconRefs.current[idx] = el)} className={styles.iconContainer}>
                  <img src={step.iconSvg} alt="" className={styles.stepIcon} />
                </div>

                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.shortDesc}</p>

                {/* Interactive Story Drawer Button */}
                <button
                  type="button"
                  className={styles.readStoryBtn}
                  onClick={() => setActiveModalStep(step)}
                  aria-label={`Read full story for ${step.title}`}
                >
                  <span>Read Story</span>
                  <svg className={styles.btnArrow} viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Story Drawer Modal */}
      <AnimatePresence>
        {activeModalStep && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalStep(null)}
          >
            <motion.div
              className={styles.modalCard}
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="modal-title"
            >
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setActiveModalStep(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className={styles.modalHeader}>
                <span className={styles.modalPill}>{activeModalStep.badge}</span>
                <h3 id="modal-title" className={styles.modalTitle}>
                  {activeModalStep.title}
                </h3>
              </div>

              <div className={styles.modalBody}>
                <p className={styles.modalStoryText}>{activeModalStep.fullStory}</p>
                <div className={styles.pointsList}>
                  {activeModalStep.detailPoints.map((point, i) => (
                    <div key={i} className={styles.pointItem}>
                      <span className={styles.pointCheck}>✓</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
