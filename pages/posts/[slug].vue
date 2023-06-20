<script setup lang="ts">
const route = useRoute();

const { data: posts } = await usePosts();

const post = computed(() =>
  posts.value.find((p) => p.slug === route.params.slug.toString())
);
</script>
<template>
  <div class="mx-auto pt-20 max-w-6xl px-4 xs:px-0" v-if="post">
    <header class="mt-32">
      <h1 class="font-bold text-4xl sm:text-5xl">{{ post.title }}</h1>
      <div class="flex items-center mx-auto w-max mt-8 text-lg text-slate-700">
        <div>{{ post.published }}</div>
      </div>
    </header>
  </div>
</template>
