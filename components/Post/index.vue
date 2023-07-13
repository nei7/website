<script setup lang="ts">
import { Post } from "../../utils/notion";

const props = defineProps<{
  post: Post;
}>();

const postLink = `/posts/${props.post.slug}`;
</script>

<template>
  <RouterLink :to="postLink" class="cursor-pointer">
    <nuxt-img
      class="rounded-3xl hover:opacity-80 transition-opacity h-[30rem] w-full object-cover"
      :src="post.coverImage"
      :alt="post.description"
    />

    <div class="text-xl sm:text-2xl font-bold mt-5">{{ post.title }}</div>
    <p class="mt-3 sm:text-base text-sm text-slate-600">{{ post.published }}</p>
  </RouterLink>
</template>
