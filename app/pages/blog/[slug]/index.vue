<script setup lang="ts">
const route = useRoute();

const { data, error } = await getPost(route.params.slug?.toString() || "");
if (error.value || !data.value)
  throw createError({
    message: "Page not found",
    statusCode: 404,
    fatal: true,
  });
</script>

<template>
  <div v-if="data" class="prose dark:prose-invert">
    <h1>{{ data.post.title }}</h1>

    <NotionRenderer :blocks="data.blocks" />
  </div>
</template>
