<script setup lang="ts">
import Navbar from './components/Navbar.vue';

</script>
<template>
  <div class="overflow-hidden w-full min-h-screen font-sans bg-gray-900">
    <div class="relative h-screen">
      <img src="./assets/svgs/bg-1.svg" class="absolute opacity-70 z-0 h-72 invisible md:visible" />
      <Navbar />
      <router-view />
    </div>
  </div>
</template>