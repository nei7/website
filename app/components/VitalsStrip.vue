<script setup lang="ts">
// Filled in by plugins/analytics.client.ts. Buffered performance entries mean the
// values can exist before hydration, so the placeholders stay until mounted:
// the hydration markup then matches the server's and the later update is an
// ordinary patch (hydration only rectifies text, not classes or attributes).
const state = useWebVitals();
const ready = ref(false);
onMounted(() => {
  ready.value = true;
});

const loadMs = computed(() => (ready.value ? state.value.loadMs : null));

// INP needs an interaction first and would sit empty here; the dashboard still has it.
const SHOWN = VITAL_NAMES.filter((name) => name !== "inp");

const metrics = computed(() =>
  SHOWN.map((name) => {
    const reading = ready.value ? state.value.metrics[name] : null;
    const description = VITAL_DESCRIPTIONS[name];
    return {
      name,
      label: VITAL_LABELS[name],
      value: reading ? formatVital(name, reading.value) : "—",
      ratingLabel: reading ? RATING_LABELS[reading.rating] : null,
      markClass: ratingMarkClass(reading?.rating),
      title: reading ? `${description}: ${RATING_LABELS[reading.rating]}` : `${description}: measuring…`,
    };
  })
);
</script>

<template>
  <div class="font-mono text-xs text-muted-foreground tabular-nums">
    <p title="Measured in your browser for this visit">
      Your page load
      <span class="text-foreground">{{ loadMs == null ? "…" : formatMs(loadMs) }}</span>
    </p>
    <!-- Fixed-width chips: values arrive after hydration and must not re-wrap the row (that would be a layout shift). -->
    <ul class="mt-1 flex flex-wrap gap-x-4 gap-y-1" aria-label="Web vitals of this page load">
      <li v-for="metric in metrics" :key="metric.name" class="flex items-center gap-1.5" :title="metric.title">
        <span class="size-2 shrink-0" :class="metric.markClass" aria-hidden="true" />
        <span class="min-w-[12ch]">
          {{ metric.label }} <span class="text-foreground">{{ metric.value }}</span>
          <span v-if="metric.ratingLabel" class="sr-only">({{ metric.ratingLabel }})</span>
        </span>
      </li>
    </ul>
  </div>
</template>
