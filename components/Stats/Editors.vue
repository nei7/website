<script setup lang="ts">
import { Datapoint } from "~/types/wakatime";
import SummaryChart from "./SummaryChart.vue";

defineProps<{
  data: Datapoint[];
}>();
</script>

<template>
  <Card>
    <h2 class="font-bold text-xl text-slate-700 mb-5 text-center">Editors</h2>
    <SummaryChart type="doughnut" :data="data" />
  </Card>
</template>
