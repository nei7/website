<template>
  <li class="flex px-6 py-4 rounded-xl hover:bg-gray-100">
    <div class="">
      <p class="font-bold text-slate-800 text-lg">{{ title }}</p>
      <p class="text-slate-600 text-sm">{{ description }}</p>
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>
