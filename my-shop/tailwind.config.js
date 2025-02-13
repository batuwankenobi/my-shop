/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#23A6F0",
        secondary: "#23856D",
        muted: "#BDBDBD",
        success: "#2DC071",
        lightblue: "#8EC2F2",
        red: "#E74040",
        lightGray: "#E6E6E6",
        yellow: "#F3CD03",
        lightbg: "#FAFAFA",
        text: {
          default: "#252B42",
          secondary: "#737373",
          light: "#FFFFFF",
          lightSecondary: "#858585",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          md: "2rem",
          lg: "2.5rem",
          xl: "3rem",
        },
        screens: {
          sm: "540px",
          md: "720px",
          lg: "920px",
          xl: "1140px",
          "2xl": "1440px",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
