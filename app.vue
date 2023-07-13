<script setup lang="ts">
import { provide, ref } from "vue";
import Navbar from "./components/Navbar.vue";

const scrollRef = ref<HTMLDivElement>();

provide("scrollRef", scrollRef);

const items = [
  {
    title: "Blog",
    description: "View my blog posts",
    href: "/posts",
  },
  {
    title: "Stats",
    description: "",
    href: "/stats",
  },
  {
    title: "Projects",
    description: "",
    href: "/projects",
  },
];

useHead({
  htmlAttrs: {
    lang: "en",
  },

  link: [
    {
      rel: "icon",
      href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>",
    },
  ],
});
</script>

<template>
  <NuxtLoadingIndicator color="#4F46E5" />
  <Navbar></Navbar>
  <CommandPalette :items="items"></CommandPalette>

  <div
    class="min-h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden"
    ref="scrollRef"
  >
    <NuxtPage />
  </div>
</template>
