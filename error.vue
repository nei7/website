<script setup>
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  error: Object,
});

const message = computed(() => String(props.error?.message || ""));
const is404 = computed(
  () => props.error?.statusCode === 404 || message.value?.includes("404")
);
const isDev = process.dev;

function handleError() {
  return clearError({ redirect: "/" });
}
</script>

<template>
  <Navbar></Navbar>
  <div class="flex flex-col items-center max-w-4xl mx-auto text-center mt-64">
    <p
      class="p-5 text-sm font-medium text-indigo-500 rounded-full bg-indigo-50"
    >
      <ExclamationTriangleIcon class="w-7 h-7"> </ExclamationTriangleIcon>
    </p>
    <h1 class="mt-3 text-4xl font-bold text-slate-800 md:text-6xl">
      {{ is404 ? `Page not found` : "An error occurred" }}
    </h1>
    <p class="mt-4 text-slate-500 text-lg">
      {{
        is404
          ? `The page you are looking for doesn't exist. Here are some helpful links:`
          : "An error occurred"
      }}
    </p>
    <pre v-if="isDev">{{ error }}</pre>

    <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
      <Button @click="handleError"> Take me home </Button>
    </div>
  </div>
</template>
