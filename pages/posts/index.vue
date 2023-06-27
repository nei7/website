<script setup lang="ts">
const { data } = await usePosts();

const selectedTag = ref("");

const posts = computed(() => {
  if (selectedTag.value) {
    return data.value.posts.filter((post) =>
      post.tags.find((tag) => tag.name === selectedTag.value)
    );
  }

  return data.value.posts;
});
</script>

<template>
  <div class="isolate max-w-6xl mx-auto">
    <GradientTop />

    <header class="mt-48">
      <h1 class="font-bold text-4xl sm:text-5xl">Blog 📝</h1>
      <p class="text-slate-700 text-xl mt-10">
        I occasionally publish articles here
      </p>
    </header>

    <section class="mt-32">
      <div class="flex items-center gap-5">
        <PostTag :active="selectedTag === ''" @click="selectedTag = ''">
          All
        </PostTag>
        <PostTag
          v-for="tag in data.tags"
          :active="selectedTag === tag"
          @click="selectedTag = tag"
        >
          {{ tag }}
        </PostTag>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 mt-12">
        <Post v-for="post in posts" :post="post"></Post>
      </div>
    </section>
  </div>
</template>
