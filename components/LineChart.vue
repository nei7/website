<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  type Plugin,
} from "chart.js";
import type Chart from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

withDefaults(
  defineProps<{
    chartId?: string;
    datasetIdKey?: string;
    width?: number;
    height?: number;
    cssClasses?: string;
    styles?: object;
    plugins?: Plugin<"line">[];
    chartData: Chart.ChartData<"line", number[], unknown>;
    chartOptions: Chart.ChartOptions<"line">;
  }>(),
  {
    chartId: "line-chart",
    plugins: () => [],
  }
);
</script>

<template>
  <Line
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
