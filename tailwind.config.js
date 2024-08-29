/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
    "./assets/react/controller/**/*.jsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        customFont: ["Eudoxus", "sans-serif"],
        // Add more custom font families as needed
      },    
    },
  },
  plugins: [],  
}
