/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#00F260',
        'brand-secondary': '#0575E6',
        'brand-dark': '#0f172a',
        'brand-light': '#f1f5f9',
        'india-saffron': '#FF9933',
        'india-green': '#138808',
      },
    },
  },
  plugins: [],
};
