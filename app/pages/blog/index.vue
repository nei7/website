<script setup lang="ts">
const route = useRoute();

const activeTag = computed(() =>
  typeof route.query.tag === "string" && route.query.tag ? route.query.tag : undefined
);

const { data } = await useNotionCollection("posts");

const posts = computed(() => {
  const items = data.value?.items ?? [];
  return activeTag.value ? items.filter((post) => post.tags.includes(activeTag.value!)) : items;
});

usePageSeo({
  title: "Blog",
  description: "All posts, newest first.",
  path: "/blog",
});
</script>

<template>
  <div>
    <h1 class="font-serif text-3xl tracking-tight">Blog</h1>

    <TagFilter
      v-if="data?.tags.length"
      class="mt-6"
      :tags="data.tags"
      :active="activeTag"
      :total="data.total"
    />

    <PostList v-if="posts.length" class="mt-10" :posts="posts" group-by-year />
    <p v-else class="mt-10 font-mono text-xs text-muted-foreground">
      Nothing here yet.
    </p>
  </div>
</template>
