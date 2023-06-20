import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
      },
      colors: {
        blue: {
          800: "rgb(49 62 137)",
          900: "rgb(39,49,109)",
        },
      },
    },
  },
  plugins: [typography],
};
