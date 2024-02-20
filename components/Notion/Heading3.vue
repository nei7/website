<script setup lang="ts">
import { type Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

defineProps<{ heading: Heading3BlockObjectResponse }>();
</script>

<template>
  <h3 class="my-5 font-bold text-2xl">
    <NotionRichText :rich-text="heading.heading_3.rich_text"></NotionRichText>
  </h3>
</template>
