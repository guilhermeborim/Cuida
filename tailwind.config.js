/** @type {import('tailwindcss').Config} */
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
      primary: {
        DEFAULT: "#1D9E75",
        light: "#E1F5EE",
        dark: "#0F6E56",
      },
      surface: "#F8F8F6",
      danger: {
        DEFAULT: "#E24B4A",
        light: "#FCEBEB",
        text: "#A32D2D",
      },
      warning: {
        DEFAULT: "#EF9F27",
        light: "#FAEEDA",
        text: "#854F0B",
      },
      success: {
        DEFAULT: "#1D9E75",
        light: "#E1F5EE",
        text: "#0F6E56",
      },
      info: {
        DEFAULT: "#378ADD",
        light: "#E6F1FB",
        text: "#0C447C",
      },
      purple: {
        DEFAULT: "#534AB7",
        light: "#EEEDFE",
        text: "#3C3489",
      },
      content: {
        primary: "#1A1A1A",
        secondary: "#888888",
        hint: "#B4B2A9",
      },
      border: "#E0E0E0",
    },
  },
  plugins: [],
};
