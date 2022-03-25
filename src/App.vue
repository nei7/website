<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>
<template>
  <div class="overflow-hidden w-full min-h-screen font-sans bg-gray-900">
    <Navbar />
    <router-view />
  </div>
</template>