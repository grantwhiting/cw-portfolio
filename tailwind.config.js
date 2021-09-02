module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    aspectRatio: {
      // defaults to {}
      none: 0,
      square: [1, 1], // or 1 / 1, or simply 1
      "16/9": [16, 9], // or 16 / 9
      "4/3": [4, 3], // or 4 / 3
      "21/9": [21, 9], // or 21 / 9
    },
  },
  variants: {
    extend: {},
    aspectRatio: ["responsive"],
  },
  plugins: [require('tailwindcss-aspect-ratio')],
};
