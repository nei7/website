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
  PieController
} from "chart.js";
import type { Summary } from "~/types/wakatime";

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
  LineElement,
  PieController
);

useCustomHead("My statistics", "Various activity statistics gathered in one place");

const { data } = useFetch<Summary[]>("/api/stats/wakatime/summaries");
</script>

<template>
  <div class="w-full max-w-[100rem] mx-auto pt-48">
    <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-5 px-2">
      <div class="rounded-[2rem] p-6 mt-10 border sm:h-[25rem] w-full pb-10">
        <p>Weekly activites</p>

        <ChartsActivity v-if="data" :data="data"></ChartsActivity>
      </div>
      <div class="rounded-[2rem] p-6 mt-10 border sm:h-[25rem]">
        <p>Editors</p>

        <ChartsLangs v-if="data" :data="data"></ChartsLangs>
      </div>
    </div>

    <!-- <section>
      <div>
        <h1 class="font-bold text-4xl sm:text-6xl">📊 My weekly stats</h1>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-10 mt-10">
        <StatsWakatime />
        <StatsSmartWatch />
      </div>
    </section>

    <section class="mt-32"></section> -->
  </div>
</template>
