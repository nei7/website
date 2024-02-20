<script setup lang="ts">
import { type ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

defineProps<{
  paragraph: ParagraphBlockObjectResponse;
}>();
</script>

<template>
  <p v-if="paragraph.paragraph.rich_text.length > 0" class="my-6 text-lg leading-loose text-slate-700">
    <NotionRichText :rich-text="paragraph.paragraph.rich_text"></NotionRichText>
  </p>
  <div v-else class="empty min-h-1"></div>
</template>

<style>
.empty::after {
  content: attr(placeholder);
}
</style>
