'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '#home' },
  { label: 'OUR STORY', href: '#story' },
  { label: 'COLLECTIONS', href: '#collections' },
  { label: 'GALLERY', href: '#gallery' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  // Track scroll position for header styling & active link highlight
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetEl.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setActiveSection(targetId);
        setMobileMenuOpen(false);
      } else if (window.location.pathname !== '/') {
        // Redirect to homepage anchor if currently on another route
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        {/* Left: Brand Logo */}
        <a href="/" className={styles.brand}>
          <img src="/assets/bee-hero.svg" alt="Natural Bee Farm Logo" className={styles.brandBee} />
          <span className={styles.brandText}>
            NATURAL <span className={styles.brandHighlight}>BEE FARM</span>
          </span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className={styles.navMenu}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className={styles.navIndicator}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Actions & Pill Button */}
        <div className={styles.actions}>
          {/* Cart Icon Button */}
          <button className={styles.iconBtn} aria-label="Shopping Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>

          {/* Golden ABOUT Pill Button - Navigates to /about route */}
          <motion.a
            href="/about"
            className={styles.aboutPill}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            ABOUT
          </motion.a>

          {/* Mobile Hamburger Toggle */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span
              className={styles.hamburgerLine}
              style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}
            />
            <span
              className={styles.hamburgerLine}
              style={{ opacity: mobileMenuOpen ? 0 : 1 }}
            />
            <span
              className={styles.hamburgerLine}
              style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={styles.mobileNavLink}
              >
                {item.label}
              </a>
            ))}
            <motion.a
              href="#collections"
              onClick={(e) => handleNavClick(e, '#collections')}
              className={styles.aboutPill}
              style={{ marginTop: '16px', width: '80%', textAlign: 'center' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SHOP NOW
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
