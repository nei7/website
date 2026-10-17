<script setup lang="ts">
import { ArrowUpRight } from "@lucide/vue";
import type { NotionCollectionItem, NotionCollections } from "@nei7/nuxt-notion/types";

const props = defineProps<{
  project: NotionCollectionItem<NotionCollections["projects"]>;
}>();

const href = computed(
  () => props.project.properties.repo || props.project.properties.demo || null
);

const meta = computed(() =>
  [...props.project.tags, props.project.properties.year].filter(Boolean).join(" · ")
);
</script>

<template>
  <li class="border-b border-border py-3 last:border-0">
    <div class="flex items-baseline justify-between gap-6">
      <component
        :is="href ? 'a' : 'span'"
        :href="href ?? undefined"
        :target="href ? '_blank' : undefined"
        :rel="href ? 'noopener noreferrer' : undefined"
        class="inline-flex min-w-0 items-baseline gap-1 leading-snug underline-offset-4"
        :class="href && 'hover:underline'"
      >
        <span class="truncate">{{ project.title }}</span>
        <ArrowUpRight v-if="href" class="size-3.5 shrink-0 self-center text-muted-foreground" aria-hidden="true" />
      </component>
      <span v-if="meta" class="shrink-0 font-mono text-xs text-muted-foreground">
        {{ meta }}
      </span>
    </div>
    <p v-if="project.description" class="mt-1 text-sm text-muted-foreground">
      {{ project.description }}
    </p>
  </li>
</template>
