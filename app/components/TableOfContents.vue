<script setup lang="ts">
import type { NotionHeading } from "@nei7/nuxt-notion/types";

const props = defineProps<{
  headings: NotionHeading[];
}>();

const minLevel = computed(() => Math.min(...props.headings.map((h) => h.level), 4));

const activeId = ref<string | null>(null);
let observer: IntersectionObserver | undefined;

onMounted(() => {
  const targets = props.headings
    .map((h) => document.getElementById(h.id))
    .filter((el): el is HTMLElement => el !== null);
  if (targets.length === 0) return;

  // Highlight the heading closest to the top of the reading area.
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) activeId.value = visible[0].target.id;
    },
    { rootMargin: "0px 0px -70% 0px", threshold: 0 }
  );
  targets.forEach((el) => observer!.observe(el));
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <nav aria-label="Table of contents" class="font-mono text-xs">
    <p class="mb-3 tracking-wider text-muted-foreground uppercase">On this page</p>
    <ol class="space-y-1.5">
      <li
        v-for="heading in headings"
        :key="heading.id"
        :style="{ paddingLeft: `${(heading.level - minLevel) * 0.75}rem` }"
      >
        <a
          :href="`#${heading.id}`"
          class="block leading-snug transition-colors hover:text-foreground"
          :class="activeId === heading.id ? 'text-foreground' : 'text-muted-foreground'"
        >
          {{ heading.text }}
        </a>
      </li>
    </ol>
  </nav>
</template>
