import tailwindcss from "@tailwindcss/vite";

// Workers Logs and traces in the dashboard, plus Issues, which groups uncaught
// exceptions, 5xx responses and console.error() calls. Must stay in the config:
// a deploy without it turns Issues off again. Declared outside the literal
// because Nitro 2's bundled wrangler types only know `logs`; Nitro copies the
// object into wrangler.json as-is.
const observability = {
  logs: { enabled: true },
  traces: { enabled: true },
  issues: { enabled: true },
};

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
    "nuxt-auth-utils",
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
    // Sealed-cookie sessions (nuxt-auth-utils); the key comes from NUXT_SESSION_PASSWORD.
    session: {
      password: "",
      maxAge: 60 * 60 * 24 * 30,
    },
    // GitHub OAuth app: NUXT_OAUTH_GITHUB_CLIENT_ID / NUXT_OAUTH_GITHUB_CLIENT_SECRET
    oauth: {
      github: {
        clientId: "",
        clientSecret: "",
      },
    },
    comments: {
      // GitHub logins that may delete anyone's comment, open /analytics and add
      // notes, comma-separated (NUXT_COMMENTS_ADMIN_LOGINS). Also shown with an "author" badge.
      adminLogins: "nei7",
    },
    analytics: {
      // Secret mixed into the daily visitor hash (NUXT_ANALYTICS_SALT);
      // falls back to session.password when empty.
      salt: "",
    },
    public: {
      // Canonical origin used for SEO tags, RSS and the sitemap.
      // Falls back to the request origin when empty (NUXT_PUBLIC_SITE_URL).
      siteUrl: "",
    },
  },

  // Content comes from three Notion databases exposed as collections.
  // Data source ids: NUXT_NUXT_NOTION_COLLECTIONS_{POSTS,PROJECTS,NOTES}_DATA_SOURCE_ID
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
      // Short notes; the owner adds them from /notes (POST /api/notes creates the page).
      notes: {
        dataSourceId: "",
        properties: {
          slug: "slug",
          // Explicit: the default ['date', 'published'] would read the checkbox below.
          date: "date",
          tags: "tags",
          published: { property: "published", equals: true },
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
      wrangler: {
        observability,
        // D1 database holding users and comments, exposed to NuxtHub as `DB`.
        // The id is build-time config like the KV id (NUXT_HUB_DATABASE_ID);
        // migrations_dir is where NuxtHub bundles server/db/migrations/sqlite.
        d1_databases: process.env.NUXT_HUB_DATABASE_ID
          ? [
              {
                binding: "DB",
                database_name: "nei7-website",
                database_id: process.env.NUXT_HUB_DATABASE_ID,
                migrations_dir: "db/migrations/sqlite/",
                migrations_table: "_hub_migrations",
              },
            ]
          : [],
      },
    },
  },

  hub: {
    cache: {
      driver: "cloudflare-kv-binding",
      // KV namespace used for Nitro's cache storage on Cloudflare.
      // Not a secret — safe to commit.
      namespaceId: process.env.NUXT_HUB_CACHE_NAMESPACE_ID || "",
    },
    // Drizzle on SQLite: a file under .data/ in dev, the D1 binding above in
    // production. Schema in server/db/schema.ts, migrations via `pnpm db:generate`.
    db: "sqlite",
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
