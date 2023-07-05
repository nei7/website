<script setup lang="ts">
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  Legend,
  LinearScale,
  LineController,
  Title,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  BarController,
  CategoryScale,
  LinearScale,
  ArcElement,
  Legend,
  Tooltip,
  Title,
  DoughnutController,
  BarElement,
  LineController,
  PointElement,
  LineElement
);

useCustomHead(
  "My statistics",
  "various activity statistics gathered in one place"
);
</script>

<template>
  <div class="w-full max-w-7xl mx-auto pt-20 px-5">
    <section class="mt-32">
      <div cl>
        <h1 class="font-bold text-4xl sm:text-6xl">📊 My weekly stats</h1>

        <p
          class="text-xl leading-9 text-justify sm:text-left mt-10 text-slate-600"
        ></p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <StatsWakatime />
        <StatsSmartWatch />
      </div>
    </section>

    <section class="mt-32"></section>
  </div>
</template>
