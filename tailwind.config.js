const { colors } = require("./src/shared/design/colors");

/** @type {import("tailwindcss").Config} */
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
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      "2xl": "48px",
      gutter: "24px",
      "icon-sm": "20px",
      icon: "24px",
      "icon-lg": "32px",
      avatar: "48px",
      "avatar-lg": "64px",
    },
    fontSize: {
      display: ["32px", { lineHeight: "40px" }],
      heading: ["28px", { lineHeight: "36px" }],
      title: ["24px", { lineHeight: "32px" }],
      body: ["18px", { lineHeight: "28px" }],
      bodySmall: ["16px", { lineHeight: "24px" }],
      caption: ["14px", { lineHeight: "20px" }],
      label: ["16px", { lineHeight: "24px" }],
    },
    lineHeight: {
      display: "40px",
      heading: "36px",
      title: "32px",
      body: "28px",
      bodySmall: "24px",
      caption: "20px",
      label: "24px",
    },
    borderRadius: {
      input: "12px",
      button: "12px",
      card: "16px",
      modal: "24px",
      pill: "9999px",
    },
    boxShadow: {
      card: "0px 2px 4px rgba(26, 26, 26, 0.10)",
      raised: "0px 4px 8px rgba(26, 26, 26, 0.14)",
      modal: "0px 8px 16px rgba(26, 26, 26, 0.18)",
    },
    minHeight: { touch: "48px", button: "56px", input: "56px" },
    minWidth: { touch: "48px" },
    maxWidth: { content: "640px", modal: "480px" },
  },
  plugins: [],
};
