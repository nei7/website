<script setup lang="ts">
import type { Activity } from "../../@types/stats";
import type Chart from "chart.js";

const { activities } = defineProps<{
  activities: Activity[];
}>();

const chartData: Chart.ChartData<"line", number[]> = {
  labels: activities.map((a) => a.date.split("-").slice(1).join("-")),
  datasets: [
    {
      backgroundColor: "#b45309",
      borderColor: "#f97316",
      label: "Total steps",
      data: activities.map((a) => a.steps.distance),
    },
  ],
};

const chartOptions: Chart.ChartOptions<"line"> = {};
</script>

<template>
  <LineChart :chart-data="chartData" :chart-options="chartOptions"></LineChart>
</template>
