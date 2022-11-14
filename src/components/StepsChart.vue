<script setup lang="ts">
import type { Activity } from "../@types/stats";
import type { TChartData, TChartOptions } from "vue-chartjs/dist/types";

const { activities } = defineProps<{
  activities: Activity[];
}>();

const chartData: TChartData<"line", number[]> = {
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

const chartOptions: TChartOptions<"line"> = {};
</script>

<template>
  <LineChart :chart-data="chartData" :chart-options="chartOptions"></LineChart>
</template>
