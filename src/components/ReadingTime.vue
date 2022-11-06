<script setup lang="ts">
import { computed } from "@vue/reactivity";

const props = defineProps<{
  text: string;
}>();

const stripTags = (str: string) => {
  const pattern = "<\\w+(\\s+(\"[^\"]*\"|\\'[^\\']*'|[^>])+)?>|<\\/\\w+>";
  const reg = new RegExp(pattern, "gi");
  return str.replace(reg, "");
};

const getReadingTime = (text: string) => {
  text = stripTags(text);
  const humanWordPerMinute = 255;
  const words = text.split(/\s+/).length;
  const time = Math.ceil(words / humanWordPerMinute);
  return time;
};

const time = computed(() => getReadingTime(props.text));
</script>

<template>
  <span class="reading-time">{{ time }} minutes{{ time > 1 ? "s" : "" }}</span>
</template>
