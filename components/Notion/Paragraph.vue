<script setup lang="ts">
import { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

defineProps<{
  paragraph: ParagraphBlockObjectResponse;
}>();
</script>

<template>
  <p class="min-h-[1rem]">
    <NotionRichText :richText="paragraph.paragraph.rich_text"></NotionRichText>
  </p>
</template>
