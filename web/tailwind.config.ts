import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Color System ───────────────────────────────────────────────────────
      colors: {
        // Cream / Off-white — page surface
        cream: {
          50: '#FAF6EF',
          100: '#F3ECD8',
          200: '#EADDbF',
        },
        // Honey / Amber — primary brand
        honey: {
          100: '#FBF0C8',
          200: '#F5D98B',
          300: '#EEC350',
          400: '#E8A820',
          500: '#D4890A',
          600: '#B06B00',
          700: '#8C4F00',
        },
        // Walnut / Espresso — text and dark surfaces
        walnut: {
          700: '#5C3010',
          800: '#3D2008',
          900: '#1F0E02',
        },
        // Wax / Gold — honeycomb motifs, dividers
        wax: {
          200: '#F2E4C0',
          300: '#E8D5A3',
          400: '#D4B87A',
          500: '#C4A05A',
          600: '#A07A38',
        },
        // Sage / Olive — sustainability accent
        sage: {
          100: '#E8EDD9',
          200: '#CDDAB0',
          400: '#8A9E6E',
          500: '#6E8250',
          600: '#5C6E45',
          700: '#3E4E2D',
        },
      },

      // ─── Font Families ──────────────────────────────────────────────────────
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },

      // ─── Custom Spacing ─────────────────────────────────────────────────────
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
        '54': '13.5rem',
        '58': '14.5rem',
        '62': '15.5rem',
        '66': '16.5rem',
        '70': '17.5rem',
        '76': '19rem',
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '96': '24rem',
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '116': '29rem',
        '120': '30rem',
        '128': '32rem',
        '136': '34rem',
        '144': '36rem',
        '160': '40rem',
      },

      // ─── Custom Easing Curves ────────────────────────────────────────────────
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'honey-drip': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      },

      // ─── Custom Animations ───────────────────────────────────────────────────
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'hex-pulse': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.7' },
        },
        'drip': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'fade-in': 'fade-in 0.5s ease forwards',
        'hex-pulse': 'hex-pulse 3s ease-in-out infinite',
        'drip': 'drip 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
      },

      // ─── Custom Border Radius ────────────────────────────────────────────────
      borderRadius: {
        'blob': '60% 40% 70% 30% / 50% 60% 40% 70%',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ─── Custom Box Shadows ──────────────────────────────────────────────────
      boxShadow: {
        'honey': '0 4px 24px -4px rgba(212, 137, 10, 0.25)',
        'honey-lg': '0 8px 48px -8px rgba(212, 137, 10, 0.35)',
        'walnut': '0 4px 32px -4px rgba(31, 14, 2, 0.15)',
        'walnut-lg': '0 16px 64px -16px rgba(31, 14, 2, 0.25)',
        'inner-cream': 'inset 0 2px 12px rgba(31, 14, 2, 0.05)',
      },

      // ─── Aspect Ratios ───────────────────────────────────────────────────────
      aspectRatio: {
        '4/5': '4 / 5',
        '3/4': '3 / 4',
        '5/6': '5 / 6',
        '9/16': '9 / 16',
      },

      // ─── Custom Max Widths ───────────────────────────────────────────────────
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '120rem',
      },

      // ─── Background Images ───────────────────────────────────────────────────
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
        'hex-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V18L28 2l28 16v32z' fill='none' stroke='%23C4A05A' stroke-opacity='0.12' stroke-width='1'/%3E%3Cpath d='M28 66v34M0 50L0 84M56 50v34' fill='none' stroke='%23C4A05A' stroke-opacity='0.12' stroke-width='1'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

export default config
