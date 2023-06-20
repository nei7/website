<script setup lang="ts">
import BarChart from "../components/BarChart.vue";
import type { Activity } from "../../@types/stats";
import type Chart from "chart.js";

const { activities } = defineProps<{
  activities: Activity[];
}>();

const chartData: Chart.ChartData<"bar", number[], unknown> = {
  labels: activities.map((a) => a.date.split("-").slice(1).join("-")),

  datasets: [
    {
      label: "Deep sleep",
      data: activities.map((activity) => activity.sleep.deepSleep / 60),
      backgroundColor: "#a855f7",
      stack: "s1",
    },
    {
      label: "Light sleep",
      data: activities.map((activity) => activity.sleep.lightSleep / 60),
      backgroundColor: "#38bdf8",
      stack: "s1",
    },
  ],
};

const chartOptions: Chart.ChartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: true,
      callbacks: {
        label: (item) => {
          const hour = Math.floor(Number(item.raw));

          const minutes = Math.round((Number(item.raw) - hour) * 60);
          return `${hour}g ${minutes}m`;
        },
      },
    },
  },
};
</script>

<template>
  <BarChart :chart-data="chartData" :chart-options="chartOptions"></BarChart>
</template>
