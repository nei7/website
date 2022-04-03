<script setup lang="ts">
import Navbar from './components/Navbar.vue';

</script>
<template>
  <div class="overflow-hidden w-full min-h-screen font-sans bg-gray-900">
    <div class="relative min-h-screen">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>