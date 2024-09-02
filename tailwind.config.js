/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
    "./assets/react/controller/**/*.jsx"
  ],
  theme: {
    colors: {
      'black': '#000000',
      'primary': '#272B34',
      'secondary': '#23272F',
      'text': '#A9AEBA',
      'button': '#D4D4D4',
      'font': '#AFB4C0',
      'stroke': '#404145',
      white: '#F5F5F5',
      red: '#F11809'
    },
    extend: {
      fontFamily: {
        eudoxus: ['Eudoxus', 'sans-serif']
      },
    },
  },
  plugins: [],
}
