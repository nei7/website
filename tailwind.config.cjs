import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts,vue}",
    "./nuxt.config.{js,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work Sans", "sans-serif"]
      },
      colors: {
        gray: {
          50: "rgba(248,249,250)"
        },
        blue: {
          800: "rgb(49 62 137)",
          900: "rgb(39,49,109)"
        }
      }
    }
  },
  plugins: [typography]
};
