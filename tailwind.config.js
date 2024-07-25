/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.html'],
  darkMode:'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors:{
        "dark-bg" : '#12141A'
      }
    },
  },
  plugins: [],
};
