<script setup lang="ts">
import { ChartData, ChartOptions, ChartType } from "chart.js";
import { Summary } from "~/types/wakatime";
import { colorScheme } from "~/constants/colors";

const props = defineProps<{
  summary: Exclude<keyof Summary, "range" | "grand_total">;
  data: Summary[];
  type: ChartType;
}>();

const data: ChartData = {
  labels: props.data.map((summary) => summary.range.text),

  datasets: props.data[0][props.summary].map(({ name }, i) => ({
    label: name,
    backgroundColor: colorScheme[10 + i],
    data: props.data
      .map((data) =>
        data[props.summary]
          .filter((datapoint) => datapoint.name === name)
          .map(({ decimal }) => parseFloat(decimal))
      )
      .flat(),
  })),
};

const options: ChartOptions = {
  plugins: {
    legend: {
      position: "bottom",
    },
    tooltip: {
      callbacks: {
        label: (item) => `${item.raw} hours`,
      },
    },
  },
};
</script>

<template>
  <Card>
    <h2 class="font-bold text-xl text-slate-800 mb-5 text-center">
      Activities
    </h2>
    <Chart
      :type="type"
      :data="data"
      :options="options"
      class="max-h-64"
    ></Chart>
  </Card>
</template>
