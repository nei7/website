<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type Plugin,
} from "chart.js";
import type Chart from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

withDefaults(
  defineProps<{
    chartId?: string;
    datasetIdKey?: string;
    width?: number;
    height?: number;
    cssClasses?: string;
    styles?: object;
    plugins?: Plugin[];
    chartData: Chart.ChartData<"bar", number[], unknown>;
    chartOptions: Chart.ChartOptions<"bar">;
  }>(),
  {
    chartId: "bar-chart",
    plugins: () => [],
  }
);
</script>

<template>
  <Bar
    :data="chartData"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>
