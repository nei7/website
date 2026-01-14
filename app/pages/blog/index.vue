<script setup lang="ts">
const { data: posts } = await getPosts();
</script>

<template>
  <div>
    <div class="grid grid-cols-1 gap-7 not-prose">
      <BlogCard v-for="(post, idx) in posts" :key="idx" v-bind="post" />
    </div>
  </div>
</template>
