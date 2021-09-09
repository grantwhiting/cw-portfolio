module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    aspectRatio: {
      none: 0,
      square: [1, 1],
      "16/9": [16, 9],
      "4/3": [4, 3],
      "21/9": [21, 9],
    },
    fontFamily: {
      CenturyGothic: ["century-gothic", "sans-serif"],
    },
  },
  variants: {
    extend: {},
    aspectRatio: ["responsive"],
  },
  plugins: [require("tailwindcss-aspect-ratio")],
};
