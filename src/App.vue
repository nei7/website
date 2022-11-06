<script setup lang="ts">
import { useHead } from "@vueuse/head";
import Navbar from "./components/Navbar.vue";

useHead({
  meta: [
    { property: "og:title", content: "nei's place" },
    { property: "og:image", content: "https://antfu.me/og-icon.png" },
    { name: "description", content: "nei's Portfolio" },
  ],
});
</script>
<template>
  <div class="relative min-h-screen h-full w-full bg-gray-900 font-body">
    <Navbar />
    <router-view />
  </div>
</template>
