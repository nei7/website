<script setup lang="ts">
import type { SmartwatchData } from "~/types/huami";

const props = defineProps<{ data: SmartwatchData[] }>();

const formatTime = (minutes: number) => `${Math.floor(minutes / 60)}h ${Math.round(minutes % 60)}m`;

const date = computed(() => {
  const total = props.data.reduce((a, b) => a + b.sleep.total, 0);

  return formatTime(total / props.data.length);
});
</script>

<template>
  <Card class="bg-white">
    <h2 class="font-bold text-xl text-slate-700 mb-5">Avg. sleep time</h2>
    <p class="text-slate-600 text-lg">{{ date }}</p>
  </Card>
</template>
