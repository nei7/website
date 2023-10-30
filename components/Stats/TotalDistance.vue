<script setup lang="ts">
import type { SmartwatchData } from "~/types/huami";

const props = defineProps<{ data: SmartwatchData[] }>();

const distance = computed(() => props.data.reduce((a, b) => a + b.steps.distance, 0) / 1000);
</script>

<template>
  <Card class="bg-white">
    <h2 class="font-bold text-xl text-slate-700 mb-5">Total distance walked</h2>
    <p class="text-slate-600 text-lg">{{ distance }} km</p>
  </Card>
</template>
