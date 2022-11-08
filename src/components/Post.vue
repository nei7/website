<script setup lang="ts">
import type { Post } from "../posts";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { updateView } from "../composables/api";
import { useRoute } from "vue-router";
import type AppLinkVue from "./AppLink.vue";

const { frontmatter } = defineProps<{
  frontmatter: Post;
}>();

const route = useRoute();

const postContent = ref<HTMLDivElement>();
const postDate = dayjs(frontmatter.date).format("MMMM DD, YYYY");
const postViews = ref(0);

onMounted(async () => {
  const { views } = await updateView(route.path.replace("/posts/", "")).catch(
    () => ({ views: 0 })
  );

  postViews.value = views;
});
</script>

<template>
  <article class="w-full max-w-3xl mx-auto px-6 py-10">
    <header class="flex flex-col">
      <time
        class="relative z-10 order-first mb-3 flex items-center text-sm text-gray-400 pl-3.5 font-sans"
        :datetime="postDate"
      >
        <span
          class="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span class="h-4 w-0.5 rounded-full bg-gray-400"></span>
        </span>

        {{ postDate }}
      </time>

      <h1 class="text-white text-4xl sm:text-6xl font-bold mb-0">
        {{ frontmatter.title }}
      </h1>

      <p class="text-sm">
        <reading-time :text="postContent?.innerHTML || ''" />;
        {{ postViews }} views
      </p>
    </header>

    <div
      class="content mt-6 text-gray-50 text-justify sm:text-left"
      ref="postContent"
    >
      <slot></slot>
    </div>

    <footer class="my-8">
      <AppLink to="/posts" class="text-gray-400">cd ~/posts</AppLink>
    </footer>
  </article>
</template>

<style>
.content p {
  color: rgb(209 213 219);
}
</style>
