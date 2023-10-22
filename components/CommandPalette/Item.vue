<template>
  <li
    class="flex px-6 py-4 rounded-xl cursor-pointer transition-all mb-2 items-center"
    :class="active ? 'bg-gray-100' : 'hover:bg-gray-100 '"
  >
    <div class="grow">
      <p class="font-bold text-slate-800 text-lg">{{ title }}</p>
      <p class="text-slate-600 text-sm">{{ description }}</p>
    </div>
    <kbd v-if="active" class="border-2 border-b-[7px] h-6 w-5 flex justify-center items-center">⏎</kbd>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  active?: boolean;
}>();
</script>
