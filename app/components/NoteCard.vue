<script setup lang="ts">
import type { NoteEntry } from "#shared/types/notes";

defineProps<{
  note: NoteEntry;
}>();
</script>

<template>
  <article :id="note.slug" class="scroll-mt-24">
    <header>
      <h2 class="font-serif text-xl tracking-tight">
        <NuxtLink :to="`/notes/${note.slug}`" class="underline-offset-4 hover:underline">
          {{ note.title }}
        </NuxtLink>
      </h2>
      <p class="mt-1.5 flex flex-wrap gap-x-2 font-mono text-xs text-muted-foreground">
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

    <NotionRenderer
      v-if="note.blocks.length"
      class="prose mt-4 max-w-none"
      :blocks="note.blocks"
      :heading-offset="2"
    />
  </article>
</template>
