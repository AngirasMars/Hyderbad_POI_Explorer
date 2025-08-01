/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // <- This tells Tailwind to scan your components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

