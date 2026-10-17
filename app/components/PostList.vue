<script setup lang="ts">
import type { NotionCollectionItem } from "@nei7/nuxt-notion/types";

const props = withDefaults(
  defineProps<{
    posts: NotionCollectionItem[];
    groupByYear?: boolean;
  }>(),
  { groupByYear: false }
);

const groups = computed(() => {
  if (!props.groupByYear) return [{ year: null, posts: props.posts }];

  const byYear = new Map<string, NotionCollectionItem[]>();
  for (const post of props.posts) {
    const year = yearOf(post.date);
    byYear.set(year, [...(byYear.get(year) ?? []), post]);
  }
  return [...byYear.entries()].map(([year, posts]) => ({ year, posts }));
});
</script>

<template>
  <div class="space-y-10">
    <section v-for="group in groups" :key="group.year ?? 'all'">
      <h2 v-if="group.year" class="mb-3 font-serif text-xl">
        {{ group.year }}
      </h2>
      <ul>
        <PostRow v-for="post in group.posts" :key="post.id" :post="post" />
      </ul>
    </section>
  </div>
</template>
