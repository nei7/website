<script setup lang="ts">
import { getPosts } from "../../posts";

const posts = getPosts();
</script>

<template>
  <main class="mt-16 px-6 sm:mt-20 mx-auto w-full max-w-4xl">
    <div class="md:border-l md:pl-6 md:border-gray-800">
      <div class="flex max-w-3xl flex-col space-y-16">
        <Article
          v-for="(post, i) in posts"
          :key="i"
          :title="post.title"
          :date="post.date"
          :description="post.description"
          :path="post.path"
        ></Article>
      </div>
    </div>
  </main>
</template>
