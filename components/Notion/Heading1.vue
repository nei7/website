<script setup lang="ts">
import { Heading1BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

defineProps<{ heading: Heading1BlockObjectResponse }>();
</script>

<template>
  <h1>
    <NotionRichText :richText="heading.heading_1.rich_text"></NotionRichText>
  </h1>
</template>
