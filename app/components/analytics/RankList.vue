<script setup lang="ts">
import type { RankedRow } from "#shared/types/analytics";

const props = defineProps<{
  title: string;
  rows: RankedRow[];
  /** Human-readable label for a key, e.g. a country name for its code. */
  format?: (key: string) => string;
  /** Render keys as internal links (used for pages). */
  link?: boolean;
}>();

const max = computed(() => Math.max(1, ...props.rows.map((row) => row.views)));
</script>

<template>
  <section>
    <div class="flex items-baseline justify-between gap-4">
      <h2 class="font-serif text-xl">{{ title }}</h2>
      <p class="font-mono text-[0.625rem] tracking-wider text-muted-foreground uppercase">views · visitors</p>
    </div>

    <ol v-if="rows.length" class="mt-2">
      <li v-for="row in rows" :key="row.key" class="border-b border-border py-2 last:border-0">
        <div class="flex items-baseline justify-between gap-4 text-sm">
          <NuxtLink
            v-if="link"
            :to="row.key"
            class="min-w-0 truncate transition-colors hover:text-muted-foreground"
            :title="row.key"
          >
            {{ format ? format(row.key) : row.key }}
          </NuxtLink>
          <span v-else class="min-w-0 truncate" :title="row.key">{{ format ? format(row.key) : row.key }}</span>
          <span class="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
            <span class="text-foreground">{{ formatCount(row.views) }}</span> · {{ formatCount(row.visitors) }}
          </span>
        </div>
        <div class="mt-1.5 h-px bg-border" aria-hidden="true">
          <div class="h-px bg-muted-foreground" :style="{ width: `${(row.views / max) * 100}%` }" />
        </div>
      </li>
    </ol>
    <p v-else class="mt-3 text-sm text-muted-foreground">Nothing yet.</p>
  </section>
</template>
