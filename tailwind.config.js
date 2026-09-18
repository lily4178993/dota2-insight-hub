/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        rotate: {
          '0%': { transform: 'perspective(1000px) rotateY(360deg)' },
          '100%': { transform: 'perspective(1000px) rotateY(0deg)' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': {
            transform: 'translateX(calc(-50% - var(--gap)))',
          },
        },
        scrollRight: {
          '0%': { transform: 'translateX(calc(-50% - var(--gap)))' },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        rotate: 'rotate 30s linear infinite',
        'scroll-left': 'scrollLeft 30s linear infinite',
        'scroll-right': 'scrollRight 30s linear infinite',
      },
      fontFamily: {
        ica: ['ICA Rubrik', 'sans-serif'],
      },
    },
    screens: {
      xs: '320px', // extra small
      sm: '360px', // small medium
      smx: '540px', // small medium extra
      md: '768px', // medium
      lg: '1024px', // large
      xl: '1280px', // extra large
      '2xl': '1536px',
    },
  },
  plugins: [],
};
