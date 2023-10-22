<script setup lang="ts">
defineProps<{
  active?: boolean;
}>();
</script>

<template>
  <div class="cursor-pointer px-6 py-2 font-medium rounded-3xl" :class="active ? 'bg-indigo-600 text-white' : ''">
    <slot></slot>
  </div>
</template>
