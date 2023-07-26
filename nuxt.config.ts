// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
  ],
  image: {
    provider: "cloudinary",
    cloudinary: {
      baseURL: "https://res.cloudinary.com/neiblog/image/upload/v1687877980",
    },
  },
  nitro: {
    routeRules: {
      "/notion/**": {
        cache: {
          maxAge: 60 * 60 * 24,
        },
      },
      "/stats/**": {
        cache: {
          maxAge: 60 * 60 * 12,
        },
      },
    },
  },
  googleFonts: {
    families: {
      "Work Sans": {
        wght: [300, 400, 500, 600, 700, 800, 900],
      },
    },
    overwriting: false,
    display: "swap",
    download: true,
    base64: false,
  },
});
