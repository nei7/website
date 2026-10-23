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
    <!-- Phones stack the meta under the title: a long tag list can't fit beside it without overflowing the page. -->
    <div class="flex flex-col items-start gap-y-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <component
        :is="href ? 'a' : 'span'"
        :href="href ?? undefined"
        :target="href ? '_blank' : undefined"
        :rel="href ? 'noopener noreferrer' : undefined"
        class="inline-flex min-w-0 max-w-full items-baseline gap-1 leading-snug underline-offset-4"
        :class="href && 'hover:underline'"
      >
        <span class="sm:truncate">{{ project.title }}</span>
        <ArrowUpRight v-if="href" class="size-3.5 shrink-0 self-center text-muted-foreground" aria-hidden="true" />
      </component>
      <span v-if="meta" class="font-mono text-xs text-muted-foreground sm:shrink-0 sm:text-right">
        {{ meta }}
      </span>
    </div>
    <p v-if="project.description" class="mt-1 text-sm text-muted-foreground">
      {{ project.description }}
    </p>
  </li>
</template>
