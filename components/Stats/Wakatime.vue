<script setup lang="ts">
import { Datapoint, Summary } from "../../types/wakatime";
import Editors from "./Editors.vue";
import Languages from "./Languages.vue";

const { data: summaries } = useCachedFetch<Summary[]>(
  "/api/stats/wakatime/summaries"
);

const { data: stats } = useCachedFetch<{
  data: { editors: Datapoint[]; languages: Datapoint[] };
}>("/api/stats/wakatime");
</script>

<template>
  <StatsActivites
    v-if="summaries"
    :data="summaries"
    summary="categories"
    class="lg:col-span-2"
    type="bar"
  />

  <template v-if="stats">
    <Editors :data="stats.data.editors" />
    <Languages :data="stats.data.languages" />
  </template>
</template>
