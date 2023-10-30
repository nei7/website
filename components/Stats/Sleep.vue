<script setup lang="ts">
import type { ChartData, ChartOptions } from "chart.js";

import type { SmartwatchData } from "~/types/huami";

const props = defineProps<{
  data: SmartwatchData[];
}>();

const data: ChartData = {
  labels: props.data.map((a) => a.date.split("-").slice(1).join("-")),

  datasets: [
    {
      label: "Deep sleep",
      data: props.data.map((activity) => activity.sleep.deepSleep / 60),
      backgroundColor: "#a855f7",
      stack: "s1"
    },
    {
      label: "Light sleep",
      data: props.data.map((activity) => activity.sleep.lightSleep / 60),
      backgroundColor: "#38bdf8",
      stack: "s1"
    }
  ]
};

const options: ChartOptions = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      position: "bottom"
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (item) => {
          const hour = Math.floor(Number(item.raw));

          const minutes = Math.round((Number(item.raw) - hour) * 60);
          return `${hour}g ${minutes}m`;
        }
      }
    }
  }
};
</script>

<template>
  <Card class="bg-white">
    <h2 class="font-bold text-xl text-slate-700 mb-5 text-center">Sleep time</h2>
    <Chart type="bar" :data="data" :options="options" class="max-h-96"></Chart
  ></Card>
</template>
