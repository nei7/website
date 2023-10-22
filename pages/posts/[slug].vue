<script setup lang="ts">
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { useReadingTime } from "~/composables/utils";

import NotFound from "~/components/NotFound.vue";
import { useCommentStore } from "~/stores/comments";

const route = useRoute();

const { data } = await usePosts();

const post = computed(() => data.value.posts.find(({ slug }) => slug === route.params.slug.toString())!);

const { data: blocks, error } = await useCachedFetch<{
  results: BlockObjectResponse[];
}>(`/api/notion/blocks/${post.value?.id}`);

useCustomHead(post.value?.title, post.value?.description);

const relatedPosts = computed(() =>
  data.value.posts.slice(0, 3).filter(({ id, tags }) => id !== post.value.id && tags.some((tag) => post.value.tags.includes(tag)))
);
const readingTime = computed(() => (blocks.value.results ? useReadingTime(blocks.value.results) : 0));

const { $state, fetchList } = useCommentStore();

fetchList(post.value.id);

const commentsCount = computed(() => $state.rootComments.length);
</script>
<template>
  <div>
    <div v-if="data && post" class="isolate mx-auto mt-24 sm:mt-48 rounded-2xl py-20 max-w-6xl px-5 sm:px-20 xs:px-0 bg-white">
      <article>
        <header>
          <h1 class="font-bold text-4xl sm:text-6xl text-center">
            {{ post.title }}
          </h1>
          <div class="flex items-center gap-x-4 mx-auto w-max mt-8 text-slate-600">
            <div>{{ post.published }}</div>
            /
            <div class="flex items-center">{{ readingTime }} min read</div>
          </div>

          <div class="aspect-video lg:aspect-[2/1] relative overflow-hidden rounded-3xl mt-12">
            <nuxt-img :src="post.coverImage" fit="cover" />
          </div>

          <PostReactions :slug="post.slug" class="mt-10"></PostReactions>
        </header>

        <div
          class="prose prose-slate prose-base lg:prose-lg mt-20 prose-p:my-2 prose-headings:mt-14 prose-headings:mb-5"
          style="max-width: 100%"
        >
          <NotionRender :blocks="blocks.results"></NotionRender>
        </div>
      </article>
      <hr class="mb-10" />

      <div class="mt-20">
        <h2 class="font-bold text-2xl mb-10">Top Comments ({{ commentsCount }})</h2>

        <CommentsContainer></CommentsContainer>
      </div>

      <div v-if="relatedPosts.length > 0" class="mt-24">
        <h1 class="font-bold text-4xl text-center">Related posts</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 mt-10">
          <Post v-for="_post in relatedPosts" :key="_post.id" :post="_post"></Post>
        </div>
      </div>
    </div>

    <NotFound v-else-if="error"> </NotFound>

    <Footer class="max-w-6xl mx-auto my-20 px-4"></Footer>

    <DialogAuth></DialogAuth>
  </div>
</template>
