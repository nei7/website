<script setup lang="ts">
import { type Heading1BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

defineProps<{ heading: Heading1BlockObjectResponse }>();
</script>

<template>
  <h1 :id="`${heading.heading_1.rich_text[0].plain_text}`" class="my-10 font-bold">
    <NotionRichText :rich-text="heading.heading_1.rich_text"></NotionRichText>
  </h1>
</template>
