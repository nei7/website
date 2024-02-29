<script setup lang="ts">
import Navbar from "./components/Navbar.vue";

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

const menuItems = [
  {
    title: "Home",
    href: "/",
    description: "Home page"
  },
  {
    title: "Posts",
    href: "/posts",
    description: "My personal blog"
  },
  {
    title: "Projects",
    description: "A selection list of my favorite projects",
    href: "/projects"
  },
  {
    title: "Statistics",
    description: "Various activity statistics gathered in one place",
    href: "/stats"
  },
  {
    title: "Sign in",
    description: "Get the ability to comment, add reactions and more",
    href: "/enter"
  }
];

const menuOpen = useMenu();
</script>

<template>
  <NuxtLoadingIndicator color="#4F46E5" />
  <CommandPalette v-model="menuOpen" :items="menuItems" />

  <Navbar />

  <NuxtPage />

  <Notifications />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 100ms;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
