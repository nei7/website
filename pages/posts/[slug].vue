<script setup lang="ts">
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { BookOpenIcon } from "@heroicons/vue/24/outline";
import { useReadingTime } from "~/composables/utils";

const route = useRoute();

const { data } = await usePosts();

const post = computed(() =>
  data.value.posts.find(({ slug }) => slug === route.params.slug.toString())
);

const { data: blocks, error } = await useCachedFetch<{
  results: BlockObjectResponse[];
}>(`/api/notion/blocks/${post.value?.id}`);

const relatedPosts = computed(() => data.value.posts.slice(0, 3));

const readingTime = computed(() =>
  blocks.value.results ? useReadingTime(blocks.value.results) : 0
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
            {{ readingTime }} min read
          </div>
        </div>

        <div
          class="aspect-video lg:aspect-[2/1] relative overflow-hidden rounded-3xl mt-12"
        >
          <nuxt-img :src="post.coverImage" fit="cover" />
        </div>

        <PostReactions :slug="post.slug" class="mt-10"></PostReactions>
      </header>

      <div class="prose prose-slate prose-lg mt-20" style="max-width: 100%">
        <NotionRender :blocks="blocks.results"></NotionRender>
      </div>
    </article>

    <div v-else-if="error"></div>
  </div>
  <div class="mx-auto max-w-7xl mb-32 mt-48">
    <h1 class="font-bold text-4xl text-center">Related posts</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 mt-10">
      <Post v-for="post in relatedPosts" :post="post"></Post>
    </div>
  </div>
</template>
