<template>
  <li
    class="flex px-5 py-3 rounded-xl cursor-pointer transition-all mb-2 items-center"
    :class="active ? 'bg-gray-100' : 'hover:bg-gray-100 '"
  >
    <div class="grow">
      <p class="font-bold text-slate-800 text-lg">{{ title }}</p>
      <p class="text-slate-600 text-sm">{{ description }}</p>
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
