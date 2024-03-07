<script setup lang="ts">
import type { ChartData } from "chart.js";
import type { Summary } from "~/types/wakatime";

const props = defineProps<{ data: Summary[] }>();

const chartData = computed(() =>
  props.data.reduce<ChartData>(
    (acc, current) => {
      acc.labels?.push(current.range.date);
      acc.datasets.forEach((dataset) => {
        const category = current.categories.find((_) => _.name === dataset.label);
        if (category) dataset.data.push(category.total_seconds);
        else dataset.data.push(0);
      });
      return acc;
    },
    {
      datasets: [
        { label: "Browsing", data: [], backgroundColor: ["#6366f1"] },
        { label: "Coding", data: [], backgroundColor: ["#bae6fd"] }
      ],
      labels: []
    }
  )
);
</script>

<template>
  <Chart v-if="props" type="bar" :data="chartData"></Chart>
</template>
