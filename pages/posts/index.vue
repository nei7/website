<script setup lang="ts">
const { data, error } = await usePosts();

const selectedTag = ref("");

const posts = computed(() => {
  if (selectedTag.value) {
    return data.value.posts.filter((post) =>
      post.tags.find((tag) => tag.name === selectedTag.value)
    );
  }
  console.log(error);

  return data.value.posts;
});

useCustomHead("My blog", "");
</script>

<template>
  <div class="relative isolate max-w-6xl mx-auto">
    <header class="mt-32 sm:mt-48 px-3">
      <h1 class="font-bold text-4xl sm:text-5xl">Blog 📝</h1>
      <p class="text-slate-700 sm:text-xl mt-10">
        I occasionally publish articles here. Hope you find something useful for
        yourself.
      </p>
    </header>

    <section class="mt-16 px-4 mb-32">
      <div class="grid grid-cols-1 lg:grid-cols-3 mt-12">
        <Post v-for="post in posts" :post="post"></Post>
      </div>
    </section>
    <GradientBottom></GradientBottom>
  </div>
</template>
