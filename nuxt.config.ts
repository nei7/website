import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/css/tailwind.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@nuxt/eslint",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "nuxt-notion",
    "nuxt-shiki",
  ],

  eslint: {
    checker: true, // <---
  },
  shadcn: {
    prefix: "",

    componentDir: "@/components/ui",
  },

  colorMode: {
    classSuffix: "",
  },
  nuxtNotion: {
    notionApiKey: process.env.NOTION_API_KEY,
  },
  shiki: {
    defaultTheme: "material-theme",
    bundledThemes: ["material-theme"],
    bundledLangs: ["js", "yaml", "yml", "typescript", "bash", "python"],
  },
});
