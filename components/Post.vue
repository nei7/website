<script setup lang="ts">
import { Post } from "../utils/notion";

const props = defineProps<{
  post: Post;
}>();

const postLink = computed(() => `/posts/${props.post.slug}`);
</script>

<template>
  <RouterLink :to="postLink" class="cursor-pointer">
    <img
      class="rounded-3xl hover:opacity-80 transition-opacity"
      :src="post.coverImage"
    />
    <h3 class="text-2xl font-bold mt-5">{{ post.title }}</h3>
    <p class="mt-3 text-slate-600 font-medium">{{ post.published }}</p>
  </RouterLink>
</template>
