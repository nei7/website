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
import type { TChartData, TChartOptions } from "vue-chartjs/dist/types";

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
    chartData: TChartData<"bar", number[], unknown>;
    chartOptions: TChartOptions<"bar">;
  }>(),
  {
    chartId: "bar-chart",
    plugins: () => [],
  }
);
</script>

<template>
  <Bar
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
