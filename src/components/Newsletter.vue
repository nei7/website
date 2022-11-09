<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerToNewsletter } from "../composables/api";

const email = ref("");
const error = ref("");

const loading = ref(false);

const router = useRouter();

const subscribeNewsletter = async () => {
  loading.value = true;
  try {
    const data = await registerToNewsletter(email.value);
    if (data.error) {
      error.value = data.error;
      return;
    }

    await router.push("/thank-you");
  } catch (err) {
    const { data } = err as { data: { error: string[] } };
    error.value = data ? data.error[0] : (err as Error).message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form
    class="rounded-2xl border p-6 border-zinc-700/40 mt-10"
    @submit.prevent="subscribeNewsletter"
  >
    <h2 class="flex text-lg font-semibold text-zinc-100">
      Subscribe to my newsletter
    </h2>
    <p class="text-sm mt-1 font-sans">
      Get notified when I publish something new, and unsubscribe at any time.
    </p>
    <div class="mt-6 flex">
      <input
        type="email"
        v-model="email"
        placeholder="email@example.com"
        aria-label="Email address"
        requiredautocomplete="email"
        required
        class=""
      />
      <button
        type="submit"
        class="bg-indigo-600 ml-3 flex items-center justify-center"
      >
        <svg
          v-if="loading"
          class="animate-spin mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path></svg
        >Subscribe
      </button>
    </div>

    <div
      class="p-1 text-red-700 bg-red-100 rounded px-3 text-xs mt-5 py-2 font-sans"
      v-if="error"
    >
      <span class="font-bold">Error: </span>
      {{ error }}
    </div>
  </form>
</template>
