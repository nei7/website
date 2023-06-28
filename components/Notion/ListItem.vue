<script setup lang="ts">
import {
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

defineProps<{
  list_item:
    | BulletedListItemBlockObjectResponse
    | NumberedListItemBlockObjectResponse;
}>();
</script>

<template>
  <div class="flex items-center">
    <div
      class="bg-slate-700 rounded-full w-1.5 h-1.5 mr-2"
      v-if="list_item.type === 'bulleted_list_item'"
    ></div>

    <NotionRichText
      :rich-text="
        // @ts-ignore
        list_item[list_item.type].rich_text
      "
    ></NotionRichText>
  </div>
</template>
