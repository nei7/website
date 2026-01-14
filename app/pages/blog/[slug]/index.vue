<script setup lang="ts">
const route = useRoute();

const page = await getPageBySlug(route.params.slug?.toString() || "");
if (!page.value)
  throw createError({
    message: "Page not found",
    statusCode: 404,
    fatal: true,
  });

const { data: content } = await getPageContent(page.value.id);
</script>

<template>
  <div v-if="content" class="prose dark:prose-invert">
    <h1>{{ page?.title }}</h1>

    <NotionRenderer :blocks="content.results" />
  </div>

  <div v-else>{{ page }}</div>
</template>
