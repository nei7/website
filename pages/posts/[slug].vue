<script setup lang="ts">
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { BookOpenIcon } from "@heroicons/vue/24/outline";

const route = useRoute();

const { data: posts } = await usePosts();

const post = computed(() =>
  posts.value.find((p) => p.slug === route.params.slug.toString())
);

const { data, error } = await useAsyncData<{ results: BlockObjectResponse[] }>(
  "blocks",
  () => $fetch("/api/notion/blocks/" + post.value?.id)
);
</script>
<template>
  <div class="isolate mx-auto pt-20 max-w-6xl px-4 xs:px-0">
    <GradientTop />
    <article v-if="data && post">
      <header class="mt-32">
        <h1 class="font-bold text-4xl sm:text-6xl text-center">
          {{ post.title }}
        </h1>
        <div
          class="flex items-center gap-x-4 mx-auto w-max mt-8 text-lg text-slate-700"
        >
          <div>{{ post.published }}</div>
          ·
          <div class="flex items-center">
            <BookOpenIcon class="w-5 h-5 mr-3" />
            10 min read
          </div>
        </div>

        <div
          class="aspect-video lg:aspect-[2/1] relative overflow-hidden rounded-3xl mt-12"
        >
          <img :src="post.coverImage" alt="" style="object-fit: cover" />
        </div>

        <PostReactions :slug="post.slug" class="mt-10"></PostReactions>
      </header>

      <div class="prose prose-slate prose-lg mt-20" style="max-width: 100%">
        <NotionRender :blocks="data.results"></NotionRender>
      </div>
    </article>

    <div v-else-if="error"></div>
  </div>
  <div class="mx-auto max-w-7xl mb-32 mt-48">
    <h1 class="font-bold text-4xl text-center">Related posts</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 mt-10">
      <Post v-for="post in posts.slice(0, 3)" :post="post"></Post>
    </div>
  </div>
</template>
