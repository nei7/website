<script setup lang="ts">
import type { DailyPoint } from "#shared/types/analytics";

const props = defineProps<{
  points: DailyPoint[];
}>();

// The drawing is in abstract units stretched to the container; text and axis labels
// live in HTML so they never scale with it.
const WIDTH = 600;
const HEIGHT = 140;
const RADIUS = 4;

const hovered = ref<number | null>(null);

/** 1-2-5 rounding so the top gridline is a clean number. */
function niceMax(value: number): number {
  if (value <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 4, 6, 8, 10].find((candidate) => candidate * magnitude >= value) ?? 10;
  return step * magnitude;
}

const max = computed(() => niceMax(Math.max(0, ...props.points.map((point) => point.views))));
const slot = computed(() => WIDTH / Math.max(props.points.length, 1));
const barWidth = computed(() => Math.max(1, Math.min(24, slot.value - 2)));

const scaleY = (value: number) => (value / max.value) * HEIGHT;

/** A column with a rounded top and a square foot on the baseline. */
function bar(index: number, value: number): string | null {
  const height = scaleY(value);
  if (height <= 0) return null;
  const x = index * slot.value + (slot.value - barWidth.value) / 2;
  const right = x + barWidth.value;
  const top = HEIGHT - height;
  const r = Math.min(RADIUS, barWidth.value / 2, height);
  return [
    `M${x},${HEIGHT}`,
    `V${top + r}`,
    `A${r},${r} 0 0 1 ${x + r},${top}`,
    `H${right - r}`,
    `A${r},${r} 0 0 1 ${right},${top + r}`,
    `V${HEIGHT}`,
    "Z",
  ].join(" ");
}

const totals = computed(() => ({
  views: props.points.reduce((sum, point) => sum + point.views, 0),
  visitors: props.points.reduce((sum, point) => sum + point.visitors, 0),
}));

const readout = computed(() => {
  const point = hovered.value == null ? null : props.points[hovered.value];
  return point
    ? { label: formatShortDate(point.day), views: point.views, visitors: point.visitors }
    : { label: "Total", ...totals.value };
});

const first = computed(() => props.points[0]?.day);
const last = computed(() => props.points.at(-1)?.day);
</script>

<template>
  <figure>
    <figcaption class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <p class="font-mono text-xs text-muted-foreground tabular-nums" aria-live="polite">
        <span class="text-foreground">{{ readout.label }}</span>
        · {{ formatCount(readout.views) }} {{ pluralize(readout.views, "view") }}
        · {{ formatCount(readout.visitors) }} {{ pluralize(readout.visitors, "visitor") }}
      </p>
      <ul class="flex gap-4 font-mono text-xs text-muted-foreground" aria-label="Legend">
        <li class="flex items-center gap-1.5">
          <span class="size-2.5 rounded-xs bg-border" aria-hidden="true" />views
        </li>
        <li class="flex items-center gap-1.5">
          <span class="size-2.5 rounded-xs bg-foreground" aria-hidden="true" />visitors
        </li>
      </ul>
    </figcaption>

    <div class="mt-3 flex gap-3">
      <div
        class="flex w-8 shrink-0 flex-col justify-between text-right font-mono text-[0.625rem] text-muted-foreground tabular-nums"
        aria-hidden="true"
      >
        <span>{{ formatCount(max) }}</span>
        <span>{{ Number.isInteger(max / 2) ? formatCount(max / 2) : "" }}</span>
        <span>0</span>
      </div>
      <svg
        class="h-36 w-full"
        :viewBox="`0 0 ${WIDTH} ${HEIGHT}`"
        preserveAspectRatio="none"
        role="img"
        aria-label="Daily views and visitors; the table below has the values"
        @pointerleave="hovered = null"
      >
        <!-- Hairline grid, one step off the surface. -->
        <line x1="0" :y1="HEIGHT / 2" :x2="WIDTH" :y2="HEIGHT / 2" class="stroke-border" vector-effect="non-scaling-stroke" />
        <line x1="0" :y1="HEIGHT" :x2="WIDTH" :y2="HEIGHT" class="stroke-border" vector-effect="non-scaling-stroke" />

        <g v-for="(point, index) in points" :key="point.day">
          <!-- Hovered day lifts on a wash; the whole slot is the hit target. -->
          <rect
            v-if="hovered === index"
            :x="index * slot"
            y="0"
            :width="slot"
            :height="HEIGHT"
            class="fill-muted"
          />
          <path v-if="bar(index, point.views)" :d="bar(index, point.views)!" class="fill-border" />
          <path v-if="bar(index, point.visitors)" :d="bar(index, point.visitors)!" class="fill-foreground" />
          <rect
            :x="index * slot"
            y="0"
            :width="slot"
            :height="HEIGHT"
            fill="transparent"
            tabindex="0"
            @pointerenter="hovered = index"
            @focus="hovered = index"
            @blur="hovered = null"
          >
            <title>{{ point.day }} · {{ point.views }} views · {{ point.visitors }} visitors</title>
          </rect>
        </g>
      </svg>
    </div>

    <div class="mt-1.5 flex justify-between pl-11 font-mono text-[0.625rem] text-muted-foreground tabular-nums" aria-hidden="true">
      <span>{{ first ? formatShortDate(first) : "" }}</span>
      <span>{{ last ? formatShortDate(last) : "" }}</span>
    </div>

    <details class="mt-3 font-mono text-xs text-muted-foreground">
      <summary class="cursor-pointer transition-colors hover:text-foreground">Table view</summary>
      <table class="mt-2 w-full tabular-nums">
        <thead class="text-left text-[0.625rem] tracking-wider uppercase">
          <tr>
            <th class="py-1 font-normal">Day</th>
            <th class="py-1 text-right font-normal">Views</th>
            <th class="py-1 text-right font-normal">Visitors</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="point in points" :key="point.day" class="border-t border-border">
            <td class="py-1">{{ point.day }}</td>
            <td class="py-1 text-right text-foreground">{{ formatCount(point.views) }}</td>
            <td class="py-1 text-right text-foreground">{{ formatCount(point.visitors) }}</td>
          </tr>
        </tbody>
      </table>
    </details>
  </figure>
</template>
