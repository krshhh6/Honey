'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './StoryBlock.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface StoryBlockProps {
  id?: string;
  image: string;
  imageAlt?: string;
  heading: string;
  text: string;
  reverse?: boolean;
  isIllustration?: boolean;
  imageWidth?: string;
  imageHeight?: string;
}

export default function StoryBlock({
  id,
  image,
  imageAlt = '',
  heading,
  text,
  reverse = false,
  isIllustration = false,
  imageWidth,
  imageHeight,
}: StoryBlockProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // GSAP Subtle Parallax on Image
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Framer Motion Slide Variants
  const imageSlideVariant = {
    hidden: { opacity: 0, x: reverse ? 40 : -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const textFadeVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay: 0.12 },
    },
  };

  const frameStyle: React.CSSProperties = {
    ...(imageWidth ? { width: imageWidth } : {}),
    ...(imageHeight ? { height: imageHeight } : {}),
    maxWidth: '100%',
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={styles.storySection}
      aria-label={heading}
    >
      <div className={`${styles.container} ${reverse ? styles.containerReverse : ''}`}>
        {/* Image Column */}
        <motion.div
          className={styles.imageCol}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={imageSlideVariant}
        >
          <div
            className={styles.imageFrame}
            style={frameStyle}
          >
            <img
              ref={imageRef}
              src={image}
              alt={imageAlt || heading}
              className={`${styles.blockImage} ${
                isIllustration ? styles.illustrationImage : ''
              }`}
            />
          </div>
        </motion.div>

        {/* Text Column */}
        <motion.article
          className={styles.textCol}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={textFadeVariant}
        >
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{text}</p>
        </motion.article>
      </div>
    </section>
  );
}
