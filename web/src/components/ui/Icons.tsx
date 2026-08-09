'use client';

import React from 'react';

// SVG honeycomb / hexagon mark — used as logo mark and decorative motif
// Not an emoji. Custom SVG.

interface HexMarkProps {
  size?: number;
  color?: string;
  className?: string;
}

export function HexMark({ size = 32, color = 'currentColor', className = '' }: HexMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Single hexagon cell with inner detail */}
      <path
        d="M20 1L38 11V31L20 41L2 31V11L20 1Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M20 8L32 15V28L20 35L8 28V15L20 8Z"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.4"
        fill="none"
      />
      {/* Center dot */}
      <circle cx="20" cy="21.5" r="2.5" fill={color} />
    </svg>
  );
}

// Decorative honeycomb grid — used in hero overlay and footer
interface HoneycombGridProps {
  cols?: number;
  rows?: number;
  cellSize?: number;
  className?: string;
  color?: string;
  animateIn?: boolean;
}

export function HoneycombGrid({
  cols = 8,
  rows = 4,
  cellSize = 56,
  className = '',
  color = '#C4A05A',
}: HoneycombGridProps) {
  const hexPath = (x: number, y: number, r: number) => {
    const points = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return [x + r * Math.cos(angle), y + r * Math.sin(angle)];
    });
    return `M ${points.map((p) => p.join(',')).join(' L ')} Z`;
  };

  const hexW = cellSize;
  const hexH = cellSize * 0.866;
  const totalW = cols * hexW * 0.75 + hexW * 0.25;
  const totalH = rows * hexH + hexH * 0.5;

  const cells: { d: string; delay: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * hexW * 0.75 + hexW / 2;
      const y = row * hexH + (col % 2 === 0 ? 0 : hexH / 2) + hexH / 2;
      cells.push({
        d: hexPath(x, y, cellSize / 2 - 1),
        delay: (row * cols + col) * 0.05,
      });
    }
  }

  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {cells.map((cell, i) => (
        <path
          key={i}
          d={cell.d}
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity="0.15"
          className="animate-hex-pulse"
          style={{ animationDelay: `${cell.delay}s` }}
        />
      ))}
    </svg>
  );
}

// Bee flight path SVG — animatable stroke for hero intro
interface BeeFlightProps {
  className?: string;
  strokeColor?: string;
}

export function BeeFlightPath({ className = '', strokeColor = '#D4890A' }: BeeFlightProps) {
  return (
    <svg
      viewBox="0 0 800 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Dashed curved path — drawn via GSAP DrawSVGPlugin */}
      <path
        id="bee-path"
        d="M 50 200 C 120 120, 200 250, 300 160 S 450 50, 550 130 S 700 220, 760 100"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeDasharray="6 8"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Small circle at tip as "bee" */}
      <circle id="bee-dot" r="5" fill={strokeColor} opacity="0.8">
        <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
          <mpath href="#bee-path" />
        </animateMotion>
      </circle>
    </svg>
  );
}
