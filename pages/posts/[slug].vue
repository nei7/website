<script setup lang="ts">
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Card from "~/components/Card.vue";
import { BookOpenIcon } from "@heroicons/vue/24/outline";

const route = useRoute();

const { data: posts } = await usePosts();

const post = computed(() =>
  posts.value.find((p) => p.slug === route.params.slug.toString())
);

const { data, error } = useAsyncData<{ results: BlockObjectResponse[] }>(
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

        <div class="mt-10 flex gap-4">
          <div
            class="sm:py-4 sm:px-6 py-3 px-5 bg-[#f8fafc] border rounded-3xl cursor-pointer"
          >
            👍 0
          </div>
          <div
            class="sm:py-4 sm:px-6 py-3 px-5 bg-[#f8fafc] border rounded-3xl cursor-pointer"
          >
            ❤️ 0
          </div>
          <div
            class="sm:py-4 sm:px-6 py-3 px-5 bg-[#f8fafc] border rounded-3xl cursor-pointer"
          >
            💀 0
          </div>
        </div>
      </header>

      <div class="prose prose-slate prose-lg mt-20" style="max-width: 100%">
        <NotionRender :blocks="data.results"></NotionRender>
      </div>
    </article>

    <div v-else-if="error"></div>
    <Card class="flex w-max mx-auto gap-8 cursor-alias mt-32">
      <img src="../../assets/icons/reddit.svg" class="h-7 w-7" />
      <img src="../../assets/icons/twitter.svg" class="h-7 w-7" />
      <img src="../../assets/icons/facebook.svg" class="h-7 w-7" />
    </Card>
  </div>
  <div class="mx-auto max-w-7xl mb-32 mt-48">
    <h1 class="font-bold text-4xl text-center">Related posts</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 mt-10">
      <Post v-for="post in posts.slice(0, 3)" :post="post"></Post>
    </div>
  </div>
</template>
