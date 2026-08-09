'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { staggerContainer, scaleIn } from '@/lib/framer-variants';
import type { Product, WeightOption } from '@/types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  index: number;
}

function ProductCard({ product, onSelect, index }: ProductCardProps) {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layoutId={`card-${product.id}`}
      variants={prefersReduced ? undefined : scaleIn}
      custom={index}
      className="relative cursor-pointer group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onSelect(product)}
      whileHover={prefersReduced ? {} : { y: -8 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      style={{ rotate: product.tilt }}
      aria-label={`View ${product.name} — ${product.subtitle}`}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === 'Enter' && onSelect(product)}
    >
      {/* Card background */}
      <div className="relative rounded-[2rem] overflow-hidden bg-cream-100 shadow-walnut hover:shadow-walnut-lg transition-shadow duration-500">
        {/* Image container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Honey drip SVG reveal on hover */}
          <AnimatePresence>
            {hovered && !prefersReduced && (
              <motion.div
                className="absolute inset-x-0 top-0"
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <svg viewBox="0 0 100 20" className="w-full" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M0 0 Q25 20 50 8 Q75 -4 100 0 L100 0 L0 0Z"
                    fill="#D4890A"
                    opacity="0.85"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4">
              <Badge variant={product.id === 'forest-dark' ? 'walnut' : 'honey'}>
                {product.badge}
              </Badge>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-6">
          <h3 className="font-display font-bold text-walnut-900 text-2xl leading-tight mb-1">
            {product.name}
          </h3>
          <p className="font-body text-sm text-walnut-800/60 mb-4 italic">
            {product.subtitle}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-wax-500 tracking-widest uppercase">From</span>
              <p className="font-display font-bold text-honey-600 text-xl">
                ₹{(product.price / 100).toFixed(0)}
              </p>
            </div>
            <motion.div
              className="w-10 h-10 rounded-full border border-walnut-900/20 flex items-center justify-center"
              whileHover={prefersReduced ? {} : { scale: 1.1, backgroundColor: '#D4890A', borderColor: '#D4890A' }}
              transition={{ duration: 0.2 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<WeightOption | null>(
    product?.weightOptions[0] ?? null
  );
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const price = selectedWeight
    ? Math.round((product.price * selectedWeight.priceMultiplier) / 100)
    : product.price / 100;

  const handleAddToCart = () => {
    if (!selectedWeight) return;
    addItem(product, selectedWeight);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Modal isOpen={!!product} onClose={onClose} ariaLabel={`${product.name} product details`}>
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative aspect-[4/5] lg:aspect-auto min-h-[300px] rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none overflow-hidden">
          <motion.div layoutId={`card-${product.id}`} className="absolute inset-0">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          {product.badge && (
            <div className="absolute top-5 left-5">
              <Badge variant={product.id === 'forest-dark' ? 'walnut' : 'honey'}>
                {product.badge}
              </Badge>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-8 lg:p-10 flex flex-col">
          <p className="font-mono text-xs tracking-widest uppercase text-wax-500 mb-3">
            {product.origin} · {product.harvestSeason}
          </p>
          <h2 className="font-display font-bold text-walnut-900 leading-tight mb-2"
            style={{ fontSize: 'clamp(2rem, 1.5rem + 2vw, 2.75rem)' }}>
            {product.name}
          </h2>
          <p className="font-body italic text-walnut-800/60 text-lg mb-6">{product.subtitle}</p>
          <p className="font-body text-walnut-800/80 leading-relaxed mb-8 text-sm">
            {product.description}
          </p>

          {/* Tasting notes */}
          <div className="mb-8">
            <p className="font-mono text-xs tracking-widest uppercase text-wax-500 mb-3">
              Tasting Notes
            </p>
            <div className="flex flex-wrap gap-2">
              {product.tastingNotes.map((note) => (
                <Badge key={note} variant="wax">{note}</Badge>
              ))}
            </div>
          </div>

          {/* Weight selector */}
          <div className="mb-8">
            <p className="font-mono text-xs tracking-widest uppercase text-wax-500 mb-3">
              Size
            </p>
            <div className="flex gap-2">
              {product.weightOptions.map((opt) => (
                <button
                  key={opt.grams}
                  onClick={() => setSelectedWeight(opt)}
                  className={[
                    'px-4 py-2 rounded-full border font-mono text-sm transition-all duration-200',
                    selectedWeight?.grams === opt.grams
                      ? 'bg-walnut-900 text-cream-50 border-walnut-900'
                      : 'bg-transparent text-walnut-800 border-walnut-800/30 hover:border-walnut-900',
                  ].join(' ')}
                  aria-pressed={selectedWeight?.grams === opt.grams}
                >
                  {opt.grams}g
                </button>
              ))}
            </div>
          </div>

          {/* Price + Add to cart */}
          <div className="flex items-center gap-6 mt-auto">
            <div>
              <span className="font-display font-bold text-3xl text-walnut-900">
                ₹{price}
              </span>
            </div>
            <Button
              variant="primary"
              size="md"
              magnetic
              onClick={handleAddToCart}
              className="flex-1"
            >
              {added ? '✓ Added' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function ProductShelfSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-28 lg:py-36 bg-cream-50" aria-label="Our Honey — Product Shelf">
      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        {/* Section header — asymmetric */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 mb-16 lg:mb-24">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-wax-500 mb-4">
              The Shelf
            </p>
            <h2
              className="font-display font-bold text-walnut-900 leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 1.5rem + 5vw, 5.5rem)' }}
            >
              Our<br />
              <span className="italic font-light text-honey-500">Honeys</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="font-body text-walnut-800/70 max-w-md leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 0.85rem + 0.35vw, 1.125rem)' }}>
              Four varieties. Each one a distinct landscape, season, and set of flowers.
              We never blend them — what you taste is exactly where the bees went.
            </p>
          </div>
        </div>

        {/* Product grid — intentionally broken rhythm */}
        <LayoutGroup>
          <motion.div
            variants={prefersReduced ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-end"
          >
            {products.map((product, i) => (
              <div
                key={product.id}
                style={{
                  // Intentional vertical offset for each card
                  marginTop: i === 1 ? '3rem' : i === 3 ? '5rem' : '0',
                }}
              >
                <ProductCard
                  product={product}
                  onSelect={setSelectedProduct}
                  index={i}
                />
              </div>
            ))}
          </motion.div>

          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </LayoutGroup>
      </div>
    </section>
  );
}
