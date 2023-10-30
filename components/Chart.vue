<script setup lang="ts">
import { Chart, type ChartData, type ChartOptions, type ChartType } from "chart.js";

const props = defineProps<{
  type: ChartType;
  data: ChartData;
  options?: ChartOptions;
}>();

const canvasRef = ref<HTMLCanvasElement>();
const chartRef = shallowRef<Chart | null>();

const renderChart = () => {
  if (!canvasRef.value) return;

  chartRef.value = new Chart(canvasRef.value, {
    type: props.type,
    data: props.data,
    options: props.options
  });
};

const destroyChart = () => {
  const chart = toRaw(chartRef.value);

  if (chart) {
    chart.destroy();
    chartRef.value = null;
  }
};

onMounted(renderChart);
onUnmounted(destroyChart);
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>
