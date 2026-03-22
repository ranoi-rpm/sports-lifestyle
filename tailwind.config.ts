import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#ff6b35', dark: '#e55a25', light: '#ff8c5a' },
        accent:    { DEFAULT: '#00d4ff', dark: '#00a8cc' },
        dark:      { DEFAULT: '#0d0d0d', 2: '#1a1a2e', 3: '#16213e', 4: '#0f3460' },
        surface:   { DEFAULT: '#16213e', 2: '#1e2a45' },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #0d0d0d 60%)',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease forwards',
        'slide-up':   'slideUp 0.4s ease forwards',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
} satisfies Config
