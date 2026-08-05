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
    "@nei7/nuxt-notion",
    "nuxt-shiki",
    "@nuxthub/core",
  ],

  // Overridden at runtime via NUXT_SPOTIFY_* environment variables
  runtimeConfig: {
    spotify: {
      clientId: "",
      clientSecret: "",
      refreshToken: "",
    },
  },

  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  hub: {
    cache: {
      driver: "cloudflare-kv-binding",
      // KV namespace used for Nitro's cache storage on Cloudflare.
      // Not a secret — safe to commit.
      namespaceId: process.env.NUXT_HUB_CACHE_NAMESPACE_ID || "",
    },
  },

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
  shiki: {
    defaultTheme: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
    bundledThemes: ["vitesse-dark", "vitesse-light"],

    bundledLangs: ["js", "yaml", "yml", "typescript", "bash", "python"],
  },
});
