<script setup lang="ts">
import type { ChartData, ChartOptions } from "chart.js";
import type { Summary } from "~/types/wakatime";

const props = defineProps<{ data: Summary[] }>();

const chartData = computed(() => {
  const data: ChartData<"pie"> & Required<Pick<ChartData, "labels">> = {
    labels: [],
    datasets: [
      {
        label: "Editors",
        data: [],
        hoverOffset: 4,
        backgroundColor: ["#6366f1", "#bae6fd"]
      }
    ]
  };

  props.data.forEach((datapoint) => {
    datapoint.editors.forEach((editor) => {
      let idx = data.labels.findIndex((_) => _ === editor.name);

      if (idx === -1 || idx === undefined) {
        idx = data.labels.push(editor.name);
      }

      const dataset = data.datasets[0].data;
      if (dataset[idx] === undefined) dataset[idx] = 0;
      else dataset[idx] += editor.total_seconds;
    });
  });

  return data;
});

const options: ChartOptions = {
  plugins: {
    legend: {
      position: "bottom"
    }
  }
};
</script>

<template>
  <Chart type="pie" :data="chartData" :options="options" class="mx-auto"></Chart>
</template>
