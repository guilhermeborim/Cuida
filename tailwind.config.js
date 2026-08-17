/** @type {import('tailwindcss').Config} */
const colors = require("./src/shared/design/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      regular: ["Figtree_400Regular"],
      medium: ["Figtree_500Medium"],
      semibold: ["Figtree_600SemiBold"],
      bold: ["Figtree_700Bold"],
    },
    colors: {
      ...colors,
    },
  },
  plugins: [],
};
