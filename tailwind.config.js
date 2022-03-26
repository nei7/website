module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Google Sans", "sans-serif"],
      },
      colors: {
        gray: {
          900: "#121316",
          800: "#181a1d",
        },
        teal: {
          200: "#D4ECDD",
          300: "#DBE1B9",
        },
      },
    },
  },
  plugins: [],
};
