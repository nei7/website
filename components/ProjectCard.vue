<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/24/outline";

defineProps<{
  title: string;
  description: string;
  link?: string;
  githubLink?: string;
}>();
</script>

<template>
  <div class="p-6 mt-10 border rounded-3xl flex flex-col sm:flex-row items-center justify-between px-4 py-4 sm:px-6">
    <div class="flex flex-1 items-center justify-start w-full">
      <span class="text-2xl">
        <slot name="icon"></slot>
      </span>
      <div class="min-w-0 flex-1 px-4">
        <h1 class="text-slate-700 sm:text-xl font-bold">{{ title }}</h1>
        <p class="flex items-center mt-1 text-slate-600 sm:text-base text-sm">
          {{ description }}
        </p>
      </div>
    </div>
    <div class="inline-flex items-center justify-end space-x-2 w-full sm:w-auto mt-4 sm:mt-1">
      <a
        v-if="link"
        class="relative inline-flex justify-center w-full sm:w-10 h-10 px-3 py-2 hover:bg-gray-100 text-slate-500 hover:text-slate-700 border-gray-200 rounded-lg text-sm font-medium default-transition default-focus border"
        :href="link"
        rel="noopener noreferrer"
        target="_blank"
      >
        <HomeIcon class="mt-1"> </HomeIcon>
      </a>
      <a
        v-if="githubLink"
        class="relative inline-flex justify-center items-center w-full sm:w-10 h-10 px-3 py-2 hover:bg-gray-100 text-slate-500 hover:text-slate-700 border-gray-200 rounded-lg text-sm font-medium default-transition default-focus border"
        :href="githubLink"
        rel="noopener noreferrer"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="mt-1 iconify"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>
