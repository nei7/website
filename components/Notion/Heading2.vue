<script setup lang="ts">
import { type Heading2BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

defineProps<{ heading: Heading2BlockObjectResponse }>();
</script>

<template>
  <h2 :id="`${heading.heading_2.rich_text[0].plain_text}`" class="my-5 font-bold text-3xl" d>
    <NotionRichText :rich-text="heading.heading_2.rich_text"></NotionRichText>
  </h2>
</template>
