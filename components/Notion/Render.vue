<script setup lang="ts">
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

defineProps<{
  blocks: BlockObjectResponse[];
}>();
</script>
<template>
  <div v-for="block in blocks" :key="block.id">
    <NotionHeading1 v-if="block.type === 'heading_1'" :heading="block" />
    <NotionHeading2 v-else-if="block.type === 'heading_2'" :heading="block" />
    <NotionHeading3 v-else-if="block.type === 'heading_3'" :heading="block" />
    <NotionParagraph v-else-if="block.type === 'paragraph'" :paragraph="block" />
    <NotionImage v-else-if="block.type === 'image'" :image="block" />
    <NotionCode v-else-if="block.type === 'code'" :code="block" />
    <NotionListItem v-else-if="block.type === 'bulleted_list_item' || block.type === 'numbered_list_item'" :list_item="block" />
    <NotionTable v-else-if="block.type === 'table'" :table="block"></NotionTable>
  </div>
</template>
