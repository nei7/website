<script setup lang="ts">
import type { VitalStat } from "#shared/types/analytics";

const props = defineProps<{
  vitals: VitalStat[];
  loadP75: number | null;
  loadSamples: number;
}>();

const percent = (part: number, total: number) => (total ? Math.round((part / total) * 100) : 0);

const rows = computed(() =>
  props.vitals.map((vital) => {
    const total = vital.good + vital.needsImprovement + vital.poor;
    const shares = {
      good: percent(vital.good, total),
      needsImprovement: percent(vital.needsImprovement, total),
      poor: percent(vital.poor, total),
    };
    return {
      ...vital,
      label: VITAL_LABELS[vital.name],
      description: VITAL_DESCRIPTIONS[vital.name],
      value: vital.p75 == null ? "—" : formatVital(vital.name, vital.p75),
      ratingLabel: vital.rating ? RATING_LABELS[vital.rating] : null,
      markClass: ratingMarkClass(vital.rating),
      shares,
      distribution: total
        ? `${shares.good}% good, ${shares.needsImprovement}% needs improvement, ${shares.poor}% poor`
        : "no samples yet",
    };
  })
);
</script>

<template>
  <table class="w-full text-sm">
    <thead class="font-mono text-[0.625rem] tracking-wider text-muted-foreground uppercase">
      <tr>
        <th class="py-1 text-left font-normal">Metric</th>
        <th class="py-1 text-right font-normal">p75</th>
        <th class="hidden py-1 pl-6 text-left font-normal sm:table-cell">Distribution</th>
        <th class="py-1 pl-4 text-right font-normal">Samples</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.name" class="border-t border-border">
        <td class="py-2.5">
          {{ row.label }}
          <span class="hidden text-xs text-muted-foreground md:inline">{{ row.description }}</span>
        </td>
        <td class="py-2.5 text-right font-mono text-xs tabular-nums">
          <span class="inline-flex items-center gap-1.5" :title="row.ratingLabel ?? undefined">
            <span class="size-2 shrink-0" :class="row.markClass" aria-hidden="true" />
            <span>{{ row.value }}</span>
            <span v-if="row.ratingLabel" class="hidden text-muted-foreground sm:inline">{{ row.ratingLabel }}</span>
            <span v-else-if="row.p75 != null" class="sr-only">{{ row.ratingLabel }}</span>
          </span>
        </td>
        <td class="hidden py-2.5 pl-6 sm:table-cell">
          <div v-if="row.samples" class="flex h-1.5 gap-0.5" :title="row.distribution">
            <div v-if="row.good" class="rounded-xs bg-good" :style="{ flexGrow: row.good }" />
            <div v-if="row.needsImprovement" class="rounded-xs bg-warn" :style="{ flexGrow: row.needsImprovement }" />
            <div v-if="row.poor" class="rounded-xs bg-poor" :style="{ flexGrow: row.poor }" />
          </div>
          <span class="sr-only">{{ row.distribution }}</span>
        </td>
        <td class="py-2.5 pl-4 text-right font-mono text-xs text-muted-foreground tabular-nums">
          {{ formatCount(row.samples) }}
        </td>
      </tr>
      <tr class="border-t border-border">
        <td class="py-2.5">
          Page load
          <span class="hidden text-xs text-muted-foreground md:inline">Until the load event</span>
        </td>
        <td class="py-2.5 text-right font-mono text-xs tabular-nums">
          {{ loadP75 == null ? "—" : formatMs(loadP75) }}
        </td>
        <td class="hidden py-2.5 pl-6 text-xs text-muted-foreground sm:table-cell">No rating defined</td>
        <td class="py-2.5 pl-4 text-right font-mono text-xs text-muted-foreground tabular-nums">
          {{ formatCount(loadSamples) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
