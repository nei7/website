<script lang="ts" setup>
import { useHead } from "@vueuse/head";
import { provide, ref } from "vue";
import Navbar from "../components/Navbar.vue";

useHead({
  meta: [
    { property: "og:title", content: "nei's place" },
    { name: "description", content: "nei's Portfolio" },
  ],
});

const scrollRef = ref<HTMLDivElement>();

provide("scrollRef", scrollRef);
</script>

<template>
  <Navbar></Navbar>
  <div
    class="min-h-screen w-full bg-gray-100 dark:bg-gray-900 overflow-hidden"
    ref="scrollRef"
  >
    <slot></slot>
  </div>
</template>
