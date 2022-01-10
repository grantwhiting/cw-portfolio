const Color = require("color");
const alpha = (clr, val) => Color(clr).alpha(val).rgb().string();
const lighten = (clr, val) => Color(clr).lighten(val).rgb().string();
const darken = (clr, val) => Color(clr).darken(val).rgb().string();

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          default: "#5e7076",
          darker: darken("#5e7076", 0.2),
          lighter: lighten("#5e7076", 0.2),
          "75": alpha("#5e7076", 0.75),
        },
      },
    },
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
