<script lang="ts" setup>
import { provide, ref } from "vue";
import Navbar from "../components/Navbar.vue";

const scrollRef = ref<HTMLDivElement>();

provide("scrollRef", scrollRef);
</script>

<template>
  <Navbar></Navbar>
  <CommandPalette></CommandPalette>

  <div
    class="min-h-screen w-full bg-gray-100 dark:bg-gray-900 overflow-hidden"
    ref="scrollRef"
  >
    <slot></slot>
  </div>
</template>
