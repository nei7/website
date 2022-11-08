<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/outline";

defineProps<{
  title: string;
  date: string;
  description: string;
  path: string;
}>();
</script>

<template>
  <article class="md:grid md:grid-cols-4 md:items-baseline">
    <div class="md:col-span-3 group relative flex flex-col items-start">
      <h2 class="text-base font-semibold tracking-tight text-gray-100">
        <div
          class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 bg-gray-800/50 sm:-inset-x-6 sm:rounded-2xl"
        ></div>
        <router-link :to="path">
          <span
            class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"
          >
          </span>
          <span class="relative z-10">{{ title }}</span>
        </router-link>
      </h2>
      <time
        class="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-gray-500 pl-3.5"
        :datetime="date"
        ><span
          class="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
          ><span class="h-4 w-0.5 rounded-full bg-gray-500"></span></span
        >{{ date }}</time
      >
      <p class="relative z-10 mt-2 text-sm text-gray-400">
        {{ description }}
      </p>
      <div
        aria-hidden="true"
        class="relative z-10 mt-4 flex items-center text-sm font-medium text-indigo-500"
      >
        Read post
        <ChevronRightIcon
          aria-hidden="true"
          class="ml-1 h-4 w-4 stroke-current"
        />
      </div>
    </div>
    <time
      class="mt-1 hidden md:block relative z-10 order-first mb-3 items-center text-sm text-gray-400 dark:text-gray-500"
      :datetime="date"
      >{{ date }}</time
    >
  </article>
</template>
