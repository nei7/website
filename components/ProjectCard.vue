<script setup lang="ts">
defineProps<{
  title: string;
  link: string;
  description: string;
  language: string;
}>();

const languages = {
  Rust: "#dea584",
  Go: "#00ADD8",
  Typescript: "#3178c6",
};
</script>

<template>
  <a
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
    class="flex flex-col rounded-2xl border p-6 border-zinc-700/40 mt-10"
  >
    <header class="flex-grow">
      <h5 class="mb-3">{{ title }}</h5>
      <p class="m-0 text-sm">{{ description }}</p>
    </header>
    <footer class="mt-5">
      <div class="flex items-center text-white text-xs gap-x-2">
        <span
          class="w-3 h-3 rounded-full"
          :style="{backgroundColor:languages[language as keyof typeof languages] || '#444444'}"
        ></span>
        {{ language }}
      </div>
    </footer>
  </a>
</template>
