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
      padding: {
        'content-default': '4%',
      },
      margin: {
        'content-default': '4%',
      },
      screens: {
        xsm: '512px',
        msm: '567px',
        'netflix-sm': '640px',
        'netflix-md': '740px',
        'original-md': '768px',
        mmd: '840px',
        xmd: '920px',
        mlg: '950px',
        'netflix-lg': '1024px',
        xlg: '1280px',
        'netflix-2xl': '1536px',

        // sm	640px	@media (min-width: 640px) { ... }
        // md	768px	@media (min-width: 768px) { ... }
        // lg	1024px	@media (min-width: 1024px) { ... }
        // xl	1280px	@media (min-width: 1280px) { ... }
        // 2xl	1536px	@media (min-width: 1536px) { ... }

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
