<script setup lang="ts">
import BlogCard from "~/components/blog/BlogCard.vue";

// definePageMeta({
//   layout: "home",
// });

const { data: posts } = getFeaturedPosts();
</script>

<template>
  <div class="prose dark:prose-invert w-full">
    <h1>Franciszek Szarek</h1>
    <p>
      Hi, I'm Franek, a Computer Science student from Poland driven by a passion
      for problem solving and continuous learning. I love applying new concepts
      to real-world projects. You can see my work
      <a href="">here</a>.
    </p>

    <p>
      Besides programming, I am passionate about music and play the guitar. I
      also go to the gym regularly.
    </p>

    <br />

    <h3>My latest blog post</h3>

    <div class="grid grid-cols-1 gap-7 not-prose">
      <BlogCard v-for="(post, idx) in posts" :key="idx" v-bind="post" />
    </div>

    <SpotifyStatus class="mt-14 not-prose" />
  </div>
</template>
