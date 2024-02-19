<template>
  <li
    class="flex px-5 py-3 rounded-xl cursor-pointer transition-all mb-2 items-center"
    :class="active ? 'bg-gray-100' : 'hover:bg-gray-100 '"
  >
    <div class="">
      <slot />
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  active?: boolean;
}>();
</script>
