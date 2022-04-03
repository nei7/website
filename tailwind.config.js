module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Google Sans", "sans-serif"],
      },
      colors: {
        gray: {
          900: "#151618",
          800: "#2f3339",
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
