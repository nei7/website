<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="p-4 rounded-lg mt-0 border border-zinc-700/40">
    <p class="m-0 text-sm text-white">{{ title }}</p>
    <div class="text-white text-xl mt-2">
      <slot></slot>
    </div>
  </div>
</template>
