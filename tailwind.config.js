module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Merriweather"],
      },
      colors: {
        gray: {
          400: "#888888",
          500: "#666666",
          600: "#444444",
          700: "#333333",
          800: "#222222",
          900: "#111111",
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
