// tailwind.config.js
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      // A_Added fonts for a more 'techy' feel
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        mono: ['Fira Code', ...fontFamily.mono],
      },
      colors: {
        // A_Centralized color palette for consistency
        primary: {
          DEFAULT: '#FFA500',
          dark: '#E59400'
        },
        dark: {
          100: '#1E1E1E',
          200: '#2a2a2a',
          300: '#333333'
        }
      },
      keyframes: {
        // A_ This is the new keyframe for the background shimmer
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      },
      animation: {
        // A_ This registers the shine animation
        shine: 'shine 2s linear infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};