/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F0EFFA",
          100: "#D1D0F1",
          200: "#B3B0E8",
          300: "#9490DF",
          400: "#8581DA",
          500: "#7671D6",
          600: "#6761D1",
          700: "#5751CD",
          800: "#4841C8",
          900: "#3E37BE",
        },
        secondary: {
          50: "#C4E8E4",
          100: "#B6E2DD",
          200: "#A7DDD6",
          300: "#98D7D0",
          400: "#89D1C9",
          500: "#7CCCC3",
          600: "#6CC6BB",
          700: "#5DC0B5",
          800: "#4FBAAE",
          900: "#3FA296",
        },
        dark: "#313234",
        background: "#E9E8FA",
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Merryweather", "serif"],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

