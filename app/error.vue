<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const message = computed(() =>
  props.error.statusCode === 404
    ? props.error.statusMessage || "Page not found"
    : "Something went wrong"
);

useHead({ title: message });
</script>

<template>
  <NuxtLayout>
    <div class="py-10">
      <p class="font-mono text-xs text-muted-foreground">{{ error.statusCode }}</p>
      <h1 class="mt-2 font-serif text-3xl tracking-tight">{{ message }}</h1>
      <NuxtLink
        to="/"
        class="mt-8 inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        @click="clearError({ redirect: '/' })"
      >
        ← Home
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
