<script setup lang="ts">
import { EnvelopeIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <form
    action="/thank-you"
    class="rounded-2xl border p-6 border-zinc-700/40 mt-10"
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
        placeholder="email@example.com"
        aria-label="Email address"
        class=""
      />
      <button type="submit" class="bg-indigo-600 ml-3">Subscribe</button>
    </div>
  </form>
</template>
