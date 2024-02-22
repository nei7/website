<script setup lang="ts">
import { type BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useReadingTime } from "~/utils/notion";
import { useCommentStore } from "~/stores/comments";

const route = useRoute();
const { data: posts } = await usePosts();

const post = computed(() => posts.value.posts.find(({ slug }) => slug === route.params.slug.toString())!);

useCustomHead(post.value?.title, post.value?.description);

const { data: blocks } = await useCachedFetch<BlockObjectResponse[]>(`/api/notion/blocks/${post.value?.id}`);

const relatedPosts = computed(() =>
  posts.value.posts.slice(0, 3).filter(({ id, tags }) => id !== post.value.id && tags.some((tag) => post.value.tags.includes(tag)))
);
const readingTime = computed(() => (blocks.value ? useReadingTime(blocks.value) : 0));

const { $state, fetchComments } = useCommentStore();

fetchComments(post.value.id);

const commentsCount = computed(() => $state.rootComments.length);

const dialog = ref(false);

const { data: user } = useUser();

const openDialog = () => {
  if (!user.value.userId) dialog.value = true;
};
</script>

<template>
  <div class="relative bg-gray-100 bg-gradient-to-r from-gray-100 via-sky-50 to-indigo-100 pt-48">
    <Dialog v-model="dialog">
      <template #header>
        <div class="border-b py-2 px-6 flex items-center">
          <p class="text-xl font-semibold grow">Log in to continue</p>
          <div class="rounded-xl hover:bg-gray-100 p-2 cursor-pointer" @click="dialog = false"><XMarkIcon class="w-6 h-6"></XMarkIcon></div>
        </div>
      </template>

      <div class="text-center flex flex-col justify-center items-center py-4">
        <p class="text-slate-700 mb-7">Unlock access to add comments, reactions and more...</p>
        <Button size="sm" class="w-full sm:w-[30rem] mb-5" href="/login">Log in</Button>
        <Button size="sm" color="bg-transparent hover:bg-gray-50 w-full sm:w-[30rem] text-indigo-600" href="/register"
          >Create account</Button
        >
      </div>
    </Dialog>

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
          <ClientOnly><PostReactions :slug="post.slug" class="mt-10 mx-auto" @click="openDialog"></PostReactions></ClientOnly>
        </div>
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
      </div>

      <div class="w-full py-16 flex justify-center relative mt-20">
        <div class="w-full max-w-4xl px-2 sm:px-10 lg:px-0">
          <h2 class="font-bold text-2xl mb-10">Top Comments ({{ commentsCount }})</h2>

          <CommentContainer></CommentContainer>
        </div>
      </div>
    </div>
  </div>
</template>
