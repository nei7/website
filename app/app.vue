<script setup lang="ts">
const { site } = useAppConfig();

useHead({
  htmlAttrs: { lang: "en" },
  titleTemplate: (title) => (title ? `${title} · ${site.name}` : site.name),
  link: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "alternate", type: "application/rss+xml", title: `${site.name} · RSS`, href: "/rss.xml" },
  ],
  meta: [
    { name: "theme-color", media: "(prefers-color-scheme: light)", content: "#fcfbf8" },
    { name: "theme-color", media: "(prefers-color-scheme: dark)", content: "#1a1917" },
  ],
});

useSeoMeta({
  ogSiteName: site.name,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
