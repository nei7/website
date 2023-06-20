<script setup lang="ts">
const { data } = usePosts();

const tags = computed(() =>
  data.value
    ? data.value.reduce<{ name: string; color: string }[]>((acc, post) => {
        acc.push(...post.tags);
        return acc;
      }, [])
    : []
);

const selectedTag = ref("");

const posts = computed(() =>
  selectedTag.value
    ? data.value.filter((post) =>
        post.tags.find((tag) => tag.name === selectedTag.value)
      )
    : data.value
);
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
          v-for="tag in tags"
          :active="selectedTag === tag.name"
          @click="selectedTag = tag.name"
        >
          {{ tag.name }}
        </PostTag>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 mt-12">
        <Post v-for="post in posts" :post="post"></Post>
      </div>
    </section>
  </div>
</template>
