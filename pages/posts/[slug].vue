<script setup lang="ts">
import { type BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { useEventListener } from "@vueuse/core";
import { useReadingTime } from "~/utils/notion";

import { useCommentStore } from "~/stores/comments";

const route = useRoute();

const { data } = await usePosts();

const post = computed(() => data.value.posts.find(({ slug }) => slug === route.params.slug.toString())!);

const { data: blocks } = await useCachedFetch<BlockObjectResponse[]>(`/api/notion/blocks/${post.value?.id}`);

useCustomHead(post.value?.title, post.value?.description);

const relatedPosts = computed(() =>
  data.value.posts.slice(0, 3).filter(({ id, tags }) => id !== post.value.id && tags.some((tag) => post.value.tags.includes(tag)))
);
const readingTime = computed(() => (blocks.value ? useReadingTime(blocks.value) : 0));

const { $state, fetchList } = useCommentStore();

fetchList(post.value.id);

const commentsCount = computed(() => $state.rootComments.length);

const paragraphs = ref<Element[]>([]);
const currentParagaph = ref(0);
onMounted(() => {
  paragraphs.value = [...document.querySelectorAll(".prose h1")];
});

const onScroll = () => {
  paragraphs.value.forEach((paragraph, i) => {
    if (paragraph.getBoundingClientRect().top < 0) {
      currentParagaph.value = i;
    }
  });
};

useEventListener("scroll", onScroll);
</script>

<template>
  <div class="relative bg-gray-100 bg-gradient-to-r from-gray-100 via-sky-50 to-indigo-100 pt-48">
    <header class="text-white absolute border-white top-0 left-0 right-0 pb-10 md:pb-32 z-[1] h-[80vh]">
      <div class="flex w-full h-full justify-center items-center">
        <div class="max-w-5xl">
          <h1 class="font-bold text-4xl sm:text-7xl text-center text-slate-800 px-3 md:px-0">
            {{ post.title }}
          </h1>
          <div class="flex items-center gap-x-4 mx-auto w-max mt-8 text-slate-600 text-sm sm:text-base">
            <div>{{ post.published }}</div>
            /
            <div class="flex items-center">{{ readingTime }} min read</div>
          </div>
          <ClientOnly><PostReactions :slug="post.slug" class="mt-10 mx-auto"></PostReactions></ClientOnly>
        </div>

        <!-- <div class="aspect-video lg:aspect-[2/1] relative overflow-hidden rounded-3xl mt-12">
          <nuxt-img :src="post.coverImage" fit="cover" />
        </div> -->
      </div>
    </header>

    <div class="relative bg-white pb-0 pt-10 sm:pt-20 top-[45vh] sm:top-[50vh] z-10">
      <div class="mx-auto w-full max-w-4xl">
        <article class="content sm:prose xl:prose-xl prose-slate sm:px-0 px-4 text-justify md:text-start break-words max-w-full">
          <NotionRender :blocks="blocks"></NotionRender>
        </article>

        <div v-if="relatedPosts.length > 0" class="mt-24">
          <h1 class="font-bold text-4xl text-center">Related posts</h1>

          <div class="grid grid-cols-1 lg:grid-cols-3 mt-10">
            <Post v-for="_post in relatedPosts" :key="_post.id" :post="_post"></Post>
          </div>
        </div>

        <!-- <div class="lg:col-span-3 sticky top-28 h-96 hidden lg:block justify-self-end">
          <div class="border dark:border-gray-800 p-3 rounded-md min-w-[230px]">
            <h1 class="font-bold mb-3 border-b dark:border-gray-800 pb-2">Table Of Content</h1>
            <a
              v-for="(c, i) in paragraphs"
              :key="c.id"
              :href="`#${c.textContent}`"
              :class="currentParagaph === i ? 'bg-indigo-600 text-white' : ''"
              aria-current="page"
              class="block text-sm mb-3 hover:underline text-slate-800 p-2 rounded-xl"
            >
              {{ c.textContent }}
            </a>
          </div>
        </div> -->
      </div>

      <DialogAuth></DialogAuth>

      <div class="w-full py-16 flex justify-center relative mt-20">
        <div class="w-full max-w-4xl px-10 lg:px-0">
          <h2 class="font-bold text-2xl mb-10">Top Comments ({{ commentsCount }})</h2>

          <CommentsContainer></CommentsContainer>
        </div>
      </div>
    </div>
  </div>
</template>
