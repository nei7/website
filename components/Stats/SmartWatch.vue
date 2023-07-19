<script setup lang="ts">
import { SmartwatchData } from "~/types/huami";

const { data: activites } =
  useCachedFetch<SmartwatchData[]>("/api/stats/huami");
</script>

<template>
  <template v-if="activites">
    <StatsAvgSleep :data="activites"></StatsAvgSleep>
    <StatsTotalDistance :data="activites"></StatsTotalDistance>

    <StatsSleep :data="activites" class="lg:col-span-2"> </StatsSleep>
    <StatsSteps :data="activites" class="lg:col-span-2"></StatsSteps>
  </template>
</template>
