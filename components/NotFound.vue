<script setup lang="ts">
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="flex flex-col items-center max-w-4xl mx-auto text-center mt-64">
    <p class="p-5 text-sm font-medium text-indigo-500 rounded-full bg-indigo-50">
      <ExclamationTriangleIcon class="w-7 h-7"> </ExclamationTriangleIcon>
    </p>
    <h1 class="mt-3 text-4xl font-bold text-slate-800 md:text-6xl">Page not found</h1>
    <p class="mt-4 text-slate-500 text-lg">The page you are looking for doesn't exist. Here are some helpful links:</p>

    <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
      <Button transparent class="flex items-center gap-x-4" @click="$router.go(-1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 rtl:rotate-180"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>

        <span>Go back</span>
      </Button>

      <Button href="/"> Take me home </Button>
    </div>
  </div>
</template>
