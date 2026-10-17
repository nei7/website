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
    "@nuxt/fonts",
    "@nuxtjs/color-mode",
    "@nei7/nuxt-notion",
    "@nuxthub/core",
  ],

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },

  // Overridden at runtime via NUXT_* environment variables / Worker secrets
  runtimeConfig: {
    spotify: {
      clientId: "",
      clientSecret: "",
      refreshToken: "",
    },
    public: {
      // Canonical origin used for SEO tags, RSS and the sitemap.
      // Falls back to the request origin when empty (NUXT_PUBLIC_SITE_URL).
      siteUrl: "",
    },
  },

  // Content comes from two Notion databases exposed as collections.
  // Data source ids: NUXT_NUXT_NOTION_COLLECTIONS_{POSTS,PROJECTS}_DATA_SOURCE_ID
  nuxtNotion: {
    cache: { maxAge: 3600, swr: true },
    collections: {
      posts: {
        dataSourceId: "",
        properties: {
          slug: ["slug", "url"],
          date: ["date", "published"],
          tags: ["tags", "category"],
          published: { property: "status", equals: "Published" },
        },
      },
      projects: {
        dataSourceId: "",
        content: false,
        properties: {
          title: "name",
          tags: "tech",
          published: { property: "published", equals: true },
          order: "order",
          featured: "featured",
        },
      },
    },
  },

  fonts: {
    families: [
      { name: "Newsreader", provider: "google", weights: [400, 500, 600], styles: ["normal", "italic"] },
      { name: "Inter", provider: "google", weights: [400, 500, 600] },
      { name: "JetBrains Mono", provider: "google", weights: [400, 500] },
    ],
    defaults: {
      subsets: ["latin", "latin-ext"],
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

  colorMode: {
    classSuffix: "",
  },

  shiki: {
    defaultTheme: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
    bundledThemes: ["vitesse-dark", "vitesse-light"],
    bundledLangs: [
      "javascript",
      "typescript",
      "json",
      "yaml",
      "shellscript",
      "python",
      "go",
      "docker",
      "toml",
      "nix",
      "sql",
      "css",
      "html",
      "vue",
    ],
  },
});
