<script setup lang="ts">
const route = useRoute();
const { site } = useAppConfig();
const slug = computed(() => String(route.params.slug ?? ""));

const { data, error } = await useNotionCollectionItem("notes", slug);

if (!data.value) {
  throw createError({
    statusCode: error.value?.statusCode === 404 ? 404 : (error.value?.statusCode ?? 500),
    statusMessage: error.value?.statusCode === 404 ? "Note not found" : "Could not load this note",
    fatal: true,
  });
}

const note = computed(() => data.value!.item);

usePageSeo({
  title: note.value.title,
  description: noteExcerpt(data.value.blocks) || site.description,
  path: `/notes/${note.value.slug}`,
  type: "article",
  publishedTime: note.value.date,
  modifiedTime: note.value.lastEditedTime,
});
</script>

<template>
  <article v-if="data">
    <p class="font-mono text-xs text-muted-foreground">
      <NuxtLink to="/notes" class="transition-colors hover:text-foreground">← All notes</NuxtLink>
    </p>

    <header class="mt-6">
      <h1 class="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
        {{ note.title }}
      </h1>
      <p class="mt-3 flex flex-wrap gap-x-2 font-mono text-xs text-muted-foreground">
        <time v-if="note.date" :datetime="note.date">{{ formatDate(note.date) }}</time>
        <template v-for="tag in note.tags" :key="tag">
          <span>·</span>
          <NuxtLink
            :to="{ path: '/notes', query: { tag } }"
            class="transition-colors hover:text-foreground"
          >
            {{ tag }}
          </NuxtLink>
        </template>
      </p>
    </header>

    <NotionRenderer class="prose mt-8 max-w-none" :blocks="data.blocks" :heading-offset="1" />
  </article>
</template>
