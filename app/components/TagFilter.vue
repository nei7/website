<script setup lang="ts">
import type { NotionCollectionTag } from "@nei7/nuxt-notion/types";

defineProps<{
  tags: NotionCollectionTag[];
  active?: string;
  total: number;
}>();

const linkClass =
  "transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline underline-offset-4";
</script>

<template>
  <nav
    aria-label="Filter by tag"
    class="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground"
  >
    <NuxtLink
      :to="{ path: '/blog' }"
      :class="linkClass"
      :aria-current="!active ? 'page' : undefined"
    >
      All <span class="opacity-60">{{ total }}</span>
    </NuxtLink>
    <NuxtLink
      v-for="tag in tags"
      :key="tag.name"
      :to="{ path: '/blog', query: active === tag.name ? {} : { tag: tag.name } }"
      :class="linkClass"
      :aria-current="active === tag.name ? 'page' : undefined"
    >
      {{ tag.name }} <span class="opacity-60">{{ tag.count }}</span>
    </NuxtLink>
  </nav>
</template>
