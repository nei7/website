<script setup lang="ts">
defineProps<{
  transparent?: boolean;
}>();
</script>

<template>
  <button
    :class="
      transparent
        ? ['text-slate-800']
        : ['bg-indigo-600 text-white  hover:bg-indigo-500']
    "
    class="rounded-3xl appearance-none justify-center py-3 px-8 outline-offset-2 transition duration-300 active:transition-none font-medium"
    hide-cursor
  >
    <slot></slot>
  </button>
</template>
