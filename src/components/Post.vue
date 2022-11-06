<script setup lang="ts">
import type { Post } from "../posts";
import dayjs from "dayjs";
import { ref } from "vue";

const props = defineProps<{
  frontmatter: Post;
}>();

const articleDate = dayjs(props.frontmatter.date).format("MMMM DD, YYYY");

const content = ref<HTMLElement | null>();
</script>

<template>
  <article class="w-full max-w-3xl mx-auto px-6 py-10">
    <header class="flex flex-col">
      <time
        class="relative z-10 order-first mb-3 flex items-center text-sm text-gray-300 pl-3.5 font-sans"
        :datetime="articleDate"
      >
        <span
          class="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span class="h-4 w-0.5 rounded-full bg-gray-400"></span>
        </span>

        {{ articleDate }}
      </time>

      <h1 class="text-white text-6xl font-bold mb-0">
        {{ frontmatter.title }}
      </h1>

      <p class="text-sm">
        <reading-time :text="content?.innerHTML || ''" />; 30 views
      </p>
    </header>

    <div
      class="content mt-6 text-gray-50 text-justify sm:text-left"
      ref="content"
    >
      <slot></slot>
    </div>
  </article>
</template>

<style>
.content p {
  color: rgb(249 250 251);
}
</style>
