<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { useUser } from "./stores/user";
// const items = [
//   {
//     title: "Blog",
//     description: "View my blog posts",
//     href: "/posts"
//   },
//   {
//     title: "Stats",
//     description: "",
//     href: "/stats"
//   },
//   {
//     title: "Projects",
//     description: "",
//     href: "/projects"
//   }
// ];

useHead({
  htmlAttrs: {
    lang: "en"
  },

  link: [
    {
      rel: "icon",
      href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>"
    }
  ]
});

const user = useUser();

onMounted(() => $fetch<{ userId: string }>("/api/auth/me").then(({ userId }) => user.$patch({ id: userId })));
</script>

<template>
  <NuxtLoadingIndicator color="#4F46E5" />
  <Navbar></Navbar>

  <NuxtPage />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 200ms;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
