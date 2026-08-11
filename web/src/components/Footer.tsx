'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

function WhiteMeadlightLogo() {
  return (
    <img
      src="/assets/bee-hero.svg"
      alt="Meadlight Bee Logo"
      style={{
        width: '150px',
        height: 'auto',
        filter: 'brightness(0) invert(1)',
        display: 'block',
      }}
    />
  );
}

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumnLinks {
  id: string;
  title: string;
  type: 'links';
  underlined?: boolean;
  links: FooterLink[];
}

interface FooterColumnContact {
  id: string;
  title: string;
  type: 'contact';
  address: string[];
  email: string;
  phone: string;
  whatsapp: string;
  whatsappUrl: string;
}

type FooterColumn = FooterColumnLinks | FooterColumnContact;

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: 'shop',
    title: 'SHOP',
    type: 'links',
    underlined: false,
    links: [
      { label: 'All products', href: '/collections' },
      { label: 'Best Sellers', href: '#bestsellers' },
      { label: 'Impact/Ethics', href: '/about#impact' },
      { label: 'About Us', href: '/about' },
    ],
  },
  {
    id: 'policies',
    title: 'POLICIES',
    type: 'links' as const,
    underlined: true,
    links: [
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'Refund Policy', href: '/refund' },
    ],
  },
  {
    id: 'contact',
    title: 'CONTACT',
    type: 'contact' as const,
    address: [
      '63/2, Byandahalli,',
      'Kadabagere Post,',
      'Bengaluru – 562130',
    ],
    email: 'marketing@honeyday.in',
    phone: '+91 9606052255',
    whatsapp: 'Chat on WhatsApp',
    whatsappUrl: 'https://wa.me/919606052255',
  },
  {
    id: 'social',
    title: 'SOCIAL',
    type: 'links' as const,
    underlined: true,
    links: [
      { label: 'Instagram', href: 'https://instagram.com', external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footerSection} aria-label="Site Footer">
      <div className={styles.container}>
        {/* 4 Column Data Grid */}
        <div className={styles.grid}>
          {FOOTER_COLUMNS.map((col) => {
            if (col.type === 'contact') {
              return (
                <div key={col.id} className={styles.column}>
                  <h3 className={styles.heading}>{col.title}</h3>
                  <div className={styles.contactBlock}>
                    {col.address.map((line, idx) => (
                      <p key={idx} className={styles.addressLine}>
                        {line}
                      </p>
                    ))}
                    <a href={`mailto:${col.email}`} className={styles.contactLink}>
                      {col.email}
                    </a>
                    <a href={`tel:${col.phone.replace(/\s+/g, '')}`} className={styles.contactLink}>
                      {col.phone}
                    </a>
                    <a
                      href={col.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      {col.whatsapp}
                    </a>
                  </div>
                </div>
              );
            }

            return (
              <div key={col.id} className={styles.column}>
                <h3 className={styles.heading}>{col.title}</h3>
                <ul className={styles.linkList}>
                  {col.links?.map((linkItem) => {
                    const isUnderlined = col.underlined;
                    const linkClassName = `${styles.link} ${isUnderlined ? styles.underlined : ''}`;

                    if (linkItem.external) {
                      return (
                        <li key={linkItem.label} className={styles.linkItem}>
                          <a
                            href={linkItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClassName}
                          >
                            {linkItem.label}
                          </a>
                        </li>
                      );
                    }

                    return (
                      <li key={linkItem.label} className={styles.linkItem}>
                        <Link href={linkItem.href} className={linkClassName}>
                          {linkItem.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* White Meadlight Bee Logo Below Column 1 */}
        <div className={styles.logoWrapper}>
          <WhiteMeadlightLogo />
        </div>
      </div>
    </footer>
  );
}
