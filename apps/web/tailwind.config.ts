import type { Config } from 'tailwindcss';
import { designTokens } from '@dshit/design-tokens';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'sm': designTokens.breakpoints.sm,
        'md': designTokens.breakpoints.md,
        'lg': designTokens.breakpoints.lg,
        'xl': designTokens.breakpoints.xl,
        '2xl': designTokens.breakpoints['2xl'],
      },
      colors: {
        // Background
        'bg-primary': '#09090B',
        'bg-secondary': '#111113',
        'surface': '#18181B',
        'surface-elevated': '#27272A',

        // Text
        'text-primary': '#FAFAFA',
        'text-secondary': '#A1A1A6',
        'text-tertiary': '#71717A',

        // Interactive
        'purple-primary': '#7C3AED',
        'purple-hover': '#A855F7',
        'purple-light': '#C084FC',
        'purple-glow': '#A855F7',

        // Semantic
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'info': '#3B82F6',

        // Special
        'gold': '#FBBF24',
        'border': '#27272A',
        'divider': '#1F1F23',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '56px', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '44px', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'h4': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'label': ['11px', { lineHeight: '16px', fontWeight: '500' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '64px',
        '5xl': '96px',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
      },
      boxShadow: {
        'level-1': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'level-2': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'level-3': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'level-4': '0 20px 25px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(168, 85, 247, 0.5)',
      },
      animation: {
        'envelope-assemble': 'envelope-assemble 250ms ease-out',
        'glitch': 'glitch 100ms ease-in-out',
        'bloom': 'bloom 300ms ease-in-out',
        'receipt-print': 'receipt-print 400ms ease-out',
        'delivery-confirm': 'delivery-confirm 350ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'wallet-connected': 'wallet-connected 250ms ease-out',
      },
      keyframes: {
        'envelope-assemble': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '25%': { transform: 'translate(-1px, 1px)' },
          '50%': { transform: 'translate(1px, -1px)' },
          '75%': { transform: 'translate(-1px, -1px)' },
        },
        'bloom': {
          '0%': { boxShadow: '0 0 0px rgba(168, 85, 247, 0)' },
          '100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' },
        },
        'receipt-print': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'delivery-confirm': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        'wallet-connected': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      transitionDuration: {
        'quick': '150ms',
        'standard': '250ms',
        'slow': '350ms',
      },
    },
  },
  plugins: [],
};

export default config;
