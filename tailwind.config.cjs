/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        cupcake: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#d5a8e3',
        },
      },
      'dark',
    ],
  },
  plugins: [require('daisyui')],
};
