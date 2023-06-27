// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "@nuxt/image"],
  image: {
    provider: "cloudinary",
    cloudinary: {
      baseURL: "https://res.cloudinary.com/neiblog/image/upload/v1687877980",
    },
  },
});
