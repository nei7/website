<script setup lang="ts">
import { type RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

defineProps<{
  richText: RichTextItemResponse[];
}>();
</script>

<template>
  <span
    v-for="(element, i) in richText"
    :key="i"
    :class="{
      'font-bold': element.annotations.bold,
      italic: element.annotations.italic,
      'line-through': element.annotations.strikethrough,
      underline: element.annotations.underline,
      'font-mono font-normal bg-base-200 rounded-box py-0.5 px-1': element.annotations.code,
      'text-red-500': element.annotations.color == 'red' || element.annotations.code,
      'text-pink-500': element.annotations.color == 'pink',
      'text-purple-500': element.annotations.color == 'purple',
      'text-blue-500': element.annotations.color == 'blue',
      'text-green-500': element.annotations.color == 'green',
      'text-yellow-500': element.annotations.color == 'yellow',
      'text-orange-500': element.annotations.color == 'orange',
      'text-brown-500': element.annotations.color == 'brown',
      'text-gray-500': element.annotations.color == 'gray',
      'bg-red-200 dark:bg-red-800': element.annotations.color == 'red_background',
      'bg-pink-200 dark:bg-pink-800': element.annotations.color == 'pink_background',
      'bg-purple-200 dark:bg-purple-800': element.annotations.color == 'purple_background',
      'bg-blue-200 dark:bg-blue-800': element.annotations.color == 'blue_background',
      'bg-green-200 dark:bg-green-800': element.annotations.color == 'green_background',
      'bg-yellow-200 dark:bg-yellow-800': element.annotations.color == 'yellow_background',
      'bg-orange-200 dark:bg-orange-800': element.annotations.color == 'orange_background',
      'bg-brown-200 dark:bg-brown-800': element.annotations.color == 'brown_background',
      'bg-gray-200 dark:bg-gray-800': element.annotations.color == 'gray_background'
    }"
  >
    <a v-if="element.href" class="cursor-pointer text-slate-500 border-b" :href="element.href">
      {{ element.plain_text }}
    </a>
    <span v-else-if="element.annotations.code" class="text-sm bg-gray-200 p-1 rounded-md">
      {{ element.plain_text }}
    </span>
    <template v-else>
      {{ element.plain_text }}
    </template>
  </span>
</template>
