/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'shared': '#3C1F62',
        'button-navbar': '#523886',
        'main': '#523886',
        'button': '#9579DC',
        'button-hover': '#7958C5',
        'titles': '#9579DC',
        'card': '#01010165',
        'forms': '#010101B6'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}