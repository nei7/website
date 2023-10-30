<script setup lang="ts">
import SummaryChart from "./SummaryChart.vue";
import type { Datapoint } from "~/types/wakatime";

defineProps<{
  data: Datapoint[];
}>();
</script>

<template>
  <Card class="bg-white">
    <h2 class="font-bold text-xl text-slate-700 mb-5 text-center">Editors</h2>
    <SummaryChart type="doughnut" :data="data" />
  </Card>
</template>
