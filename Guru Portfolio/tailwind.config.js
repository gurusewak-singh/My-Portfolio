// tailwind.config.js
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%) rotate(25deg)' },
          '100%': { transform: 'translateX(200%) rotate(25deg)' },
        },
      },
      animation: {
        shine: 'shine 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
