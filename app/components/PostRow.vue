<script setup lang="ts">
import type { NotionCollectionItem } from "@nei7/nuxt-notion/types";

defineProps<{
  post: NotionCollectionItem;
}>();
</script>

<template>
  <li
    class="flex items-baseline justify-between gap-6 border-b border-border py-2.5 last:border-0"
  >
    <NuxtLink
      :to="`/blog/${post.slug}`"
      class="min-w-0 leading-snug underline-offset-4 hover:underline"
    >
      {{ post.title }}
    </NuxtLink>
    <time
      v-if="post.date"
      :datetime="post.date"
      class="shrink-0 font-mono text-xs text-muted-foreground tabular-nums"
    >
      {{ formatMonthYear(post.date) }}
    </time>
  </li>
</template>
