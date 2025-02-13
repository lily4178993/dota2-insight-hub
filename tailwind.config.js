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
      },
      animation: {
        rotate: 'rotate 30s linear infinite',
      },
      fontFamily: {
        ica: ['ICA Rubrik', 'sans-serif'],
      },
    },
    screens: {
      xs: '320px',
      sm: '360px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
