<script setup lang="ts">
import {
  ChartData,
  ChartOptions,
  ChartType,
  ChartTypeRegistry,
  TooltipItem,
} from "chart.js";
import Chart from "./index.vue";
import { Datapoint } from "~/types/wakatime";
import { colorScheme } from "~/constants/colors";

const props = defineProps<{
  data: Datapoint[];
  type: ChartType;
  tooltipLabelCb?: (ctx: TooltipItem<keyof ChartTypeRegistry>) => void;
}>();

const data: ChartData = {
  labels: props.data.map(({ name }) => name),

  datasets: [
    {
      data: props.data.map(({ percent }) => percent),
      backgroundColor: colorScheme,
    },
  ],
};

const options: ChartOptions = {
  plugins: {
    legend: {
      position: "bottom",
    },
    tooltip: {
      callbacks: {
        label: props.tooltipLabelCb,
      },
    },
  },
};
</script>

<template>
  <Chart :type="type" :data="data" :options="options" class="max-h-64"></Chart>
</template>
