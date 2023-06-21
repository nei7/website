<script setup lang="ts">
import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const { image } = defineProps<{ image: ImageBlockObjectResponse }>();

// @ts-ignore
const url = image.image[image.image.type].url;
</script>

<template>
  <figure class="aspect-video relative overflow-hidden rounded-2xl">
    <img :src="url" alt="" />
  </figure>
</template>
