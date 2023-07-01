<script setup lang="ts">
import { Datapoint, Summary } from "~/types/wakatime";
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartTypeRegistry,
  DoughnutController,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  TooltipItem,
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
  BarElement
);

const { data: stats } = useCachedFetch<{
  data: { editors: Datapoint[]; languages: Datapoint[] };
}>("/api/wakatime/stats");

const { data: summaries } = useCachedFetch<Summary[]>(
  "/api/wakatime/summaries"
);

const languagesToolTipCb = (item: TooltipItem<keyof ChartTypeRegistry>) => {
  return `${item.formattedValue}% (${
    stats.value.data.languages[item.dataIndex].text
  })`;
};

const editorsToolTipCb = (item: TooltipItem<keyof ChartTypeRegistry>) => {
  return `${item.formattedValue}% (${
    stats.value.data.editors[item.dataIndex].text
  })`;
};
</script>

<template>
  <div class="w-full max-w-7xl mx-auto pt-20 px-5">
    <section class="mt-32">
      <div class="mb-5">
        <h1 class="text-4xl sm:text-6xl font-bold">Wakatime stats</h1>
      </div>

      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-10"
        v-if="stats && summaries"
      >
        <Card class="lg:col-span-2">
          <h2 class="font-bold text-xl text-slate-800 mb-5 text-center">
            Activities
          </h2>
          <ChartSummary
            type="bar"
            summary="categories"
            :data="summaries"
          ></ChartSummary>
        </Card>
        <Card>
          <h2 class="font-bold text-xl text-slate-800 mb-5 text-center">
            Editors
          </h2>
          <ChartWakatime
            type="doughnut"
            :data="stats.data.editors"
            :tooltipLabelCb="editorsToolTipCb"
          ></ChartWakatime>
        </Card>
        <Card>
          <h2 class="font-bold text-xl text-slate-800 mb-5 text-center">
            Languages
          </h2>
          <ChartWakatime
            type="doughnut"
            :data="stats.data.languages"
            :tooltipLabelCb="languagesToolTipCb"
          ></ChartWakatime>
        </Card>
      </div>
    </section>
  </div>
</template>
