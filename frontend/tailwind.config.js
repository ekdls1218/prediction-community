/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pyeongchang: ["var(--font-pyeongchang)"],
      },
      colors: {
        "primary-color": '#634282',
        "secondary-color": '#edd9ff',
      },
    },
  },
  plugins: [],
};
