<script setup lang="ts">
import { Heading2BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

defineProps<{ heading: Heading2BlockObjectResponse }>();
</script>

<template>
  <h2>
    <NotionRichText :rich-text="heading.heading_2.rich_text"></NotionRichText>
  </h2>
</template>
