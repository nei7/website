<script setup lang="ts">
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const route = useRoute();

const { data: posts } = await usePosts();

const post = computed(() =>
  posts.value.find((p) => p.slug === route.params.slug.toString())
);

const { data } = useAsyncData<{ results: BlockObjectResponse[] }>(
  "blocks",
  () => $fetch("/api/notion/blocks/" + post.value?.id)
);
</script>
<template>
  <div class="isolate mx-auto pt-20 max-w-6xl px-4 xs:px-0" v-if="post">
    <GradientTop />
    <article>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mr-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            10 min read
          </div>
        </div>

        <div
          class="aspect-video lg:aspect-[2/1] relative overflow-hidden rounded-3xl mt-10"
        >
          <img :src="post.coverImage" alt="" style="object-fit: cover" />
        </div>

        <div class="mt-10 flex gap-4">
          <div class="py-4 px-6 bg-[#f8fafc] border rounded-3xl cursor-pointer">
            👍 0
          </div>
          <div class="py-4 px-6 bg-[#f8fafc] border rounded-3xl cursor-pointer">
            ❤️ 0
          </div>
          <div class="py-4 px-6 bg-[#f8fafc] border rounded-3xl cursor-pointer">
            💀 0
          </div>
        </div>
      </header>

      <div v-if="data" class="prose prose-slate prose-lg mt-20">
        <NotionRender :blocks="data.results"></NotionRender>
      </div>
    </article>
  </div>
</template>
