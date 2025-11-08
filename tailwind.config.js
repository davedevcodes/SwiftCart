/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // important! use class-based dark mode
  content: [
    "./public/**/*.html", // make sure all HTML files are scanned
    "./js/**/*.js"       // include JS if you dynamically add classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
