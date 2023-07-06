<script setup lang="ts">
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { useReadingTime } from "~/composables/utils";
import NotFound from "~/components/NotFound.vue";

const route = useRoute();

const { data } = await usePosts();

const post = computed(() =>
  data.value.posts.find(({ slug }) => slug === route.params.slug.toString())
);

const { data: blocks, error } = await useCachedFetch<{
  results: BlockObjectResponse[];
}>(`/api/notion/blocks/${post.value?.id}`);

useCustomHead(post.value?.title, post.value?.description);

const { data: comments } = useFetch<{ data: any[] }>(
  `/api/post/comments?postId=${post.value?.id}`
);

const relatedPosts = computed(() => data.value.posts.slice(0, 3));

const readingTime = computed(() =>
  blocks.value.results ? useReadingTime(blocks.value.results) : 0
);

const supabase = useSupabaseClient();
const user = await supabase.auth.getUser();

const isCommenting = ref(false);
const commentText = ref("");

const handleSignIn = () => {
  if (!user) {
    supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }
};

const handleAddComment = async () => {
  try {
    const { data } = await $fetch<{ data: any[] }>("/api/post/comments", {
      method: "POST",
      body: {
        text: commentText.value,
        postId: post.value?.id,
      },
    });

    // @ts-ignore
    if (data) comments.value.data?.push(data[0]);
  } catch (err) {
  } finally {
    commentText.value = "";
  }
};
</script>
<template>
  <section v-if="data && post">
    <div
      class="isolate mx-auto mt-48 rounded-2xl pt-20 max-w-6xl px-20 xs:px-0 bg-white"
    >
      <article>
        <header>
          <h1 class="font-bold text-4xl sm:text-6xl text-center">
            {{ post.title }}
          </h1>
          <div
            class="flex items-center gap-x-4 mx-auto w-max mt-8 text-slate-600"
          >
            <div>{{ post.published }}</div>
            /
            <div class="flex items-center">{{ readingTime }} min read</div>
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
      <hr class="mb-10" />

      <div class="mt-20">
        <div class="mb-10">
          <h2 class="font-bold text-2xl">
            Top Comments ({{ comments?.data?.length }})
          </h2>
        </div>

        <div>
          <Textarea
            v-model="commentText"
            placeholder="Leave a comment..."
            @focus="isCommenting = true"
            @click="handleSignIn"
          ></Textarea>

          <Button
            v-if="isCommenting"
            size="sm"
            class="mt-5"
            :disabled="!commentText"
            @click="handleAddComment"
            >Submit</Button
          >
        </div>
      </div>

      <div v-if="comments?.data" class="mt-20">
        <PostComment
          v-for="comment in comments.data"
          :username="comment.username"
          :avatar_url="comment.avatar_url"
          :data="comment.data"
          :created_at="comment.created_at"
          :profile_url="comment.profile_url"
          :loved="comment.loved"
        ></PostComment>
      </div>

      <div class="mt-24">
        <h1 class="font-bold text-4xl text-center">Related posts</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 mt-10">
          <Post v-for="post in relatedPosts" :post="post"></Post>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl mb-32 mt-32"></div>
  </section>
  <NotFound v-else-if="error"> </NotFound>
</template>
