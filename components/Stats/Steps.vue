<script setup lang="ts">
import { ChartData, ChartOptions } from "chart.js";

import { SmartwatchData } from "~/types/huami";

const props = defineProps<{
  data: SmartwatchData[];
}>();

const data: ChartData = {
  labels: props.data.map((a) => a.date.split("-").slice(1).join("-")),

  datasets: [
    {
      backgroundColor: "#b45309",
      borderColor: "#f97316",

      label: "Total steps",
      data: props.data.map((a) => a.steps.distance)
    }
  ]
};

const options: ChartOptions = {
  responsive: true,

  plugins: {
    legend: {
      position: "bottom"
    }
  }
};
</script>

<template>
  <Card class="bg-white">
    <h2 class="font-bold text-xl text-slate-700 mb-5 text-center">Steps</h2>
    <Chart type="line" :data="data" :options="options" class="max-h-96"></Chart
  ></Card>
</template>
