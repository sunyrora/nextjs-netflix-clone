const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './screens/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bggray: {
          100: '#141414',
        },
      },
      screens: {
        'netflix-md': '740px',
        mlg: '870px',
        // 'tablet': '640px',
        // // => @media (min-width: 640px) { ... }

        // 'laptop': '1024px',
        // // => @media (min-width: 1024px) { ... }

        // 'desktop': '1280px',
        // // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
