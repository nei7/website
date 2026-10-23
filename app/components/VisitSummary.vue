<script setup lang="ts">
import type { AnalyticsSummary, VisitCounts } from "#shared/types/analytics";

const { data } = await useFetch<AnalyticsSummary>("/api/visits/summary", { key: "visits-summary" });

const columns = computed<{ label: string; counts: VisitCounts }[]>(() =>
  data.value
    ? [
        { label: "All time", counts: data.value.allTime },
        { label: "Last 30 days", counts: data.value.last30Days },
        { label: "Today (UTC)", counts: data.value.today },
      ]
    : []
);
</script>

<template>
  <dl
    v-if="data"
    class="grid grid-cols-3 gap-x-4 border-y border-border py-3 font-mono text-xs text-muted-foreground tabular-nums"
    aria-label="Visits to this site"
  >
    <div v-for="column in columns" :key="column.label">
      <dt class="mb-1 text-[0.625rem] tracking-wider uppercase">{{ column.label }}</dt>
      <dd>
        <span class="text-foreground">{{ formatCount(column.counts.views) }}</span>
        {{ pluralize(column.counts.views, "view") }}
      </dd>
      <dd>
        <span class="text-foreground">{{ formatCount(column.counts.visitors) }}</span>
        {{ pluralize(column.counts.visitors, "visitor") }}
      </dd>
    </div>
  </dl>
</template>
