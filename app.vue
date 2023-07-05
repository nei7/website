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
    href: "/contact",
  },
  {
    title: "Projects",
    description: "",
    href: "/projects",
  },
];
</script>

<template>
  <NuxtLoadingIndicator color="#4F46E5" />
  <Navbar></Navbar>
  <CommandPalette :items="items"></CommandPalette>

  <div
    class="min-h-screen w-full bg-gray-100 dark:bg-gray-900 overflow-hidden"
    ref="scrollRef"
  >
    <NuxtPage />
  </div>
</template>
