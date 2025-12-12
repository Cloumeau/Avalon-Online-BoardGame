import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: { 900: '#0a0a0f', 800: '#12121a', 700: '#1a1a26', 600: '#252532' },
        gold: { DEFAULT: '#d4a846', light: '#e8c77b', dark: '#9a7a32' },
        crimson: { DEFAULT: '#8b1538', light: '#b91c4a', dark: '#5c0e26' },
        royal: { DEFAULT: '#2d4a87', light: '#4a6db0', dark: '#1c2f57' },
        emerald: { DEFAULT: '#1a5f4b', light: '#2a8f70', dark: '#0f3a2d' },
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        body: ['var(--font-cormorant)', 'serif'],
      },
      animation: {
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 168, 70, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 168, 70, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
