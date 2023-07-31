<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  to: string;
}>();

const isExternal = computed(() => props.to.startsWith("http"));
</script>

<template>
  <a
    v-if="isExternal"
    v-bind="$attrs"
    target="_blank"
    :href="to"
    class="border-b border-indigo-500 text-indigo-600 hover:border-indigo-700 transition-colors duration-500 border-dashed"
  >
    <slot />
  </a>
  <router-link
    v-else
    v-bind="$props"
    class="border-b border-indigo-500 text-indigo-600 hover:border-indigo-700 transition-colors duration-500 border-dashed"
  >
    <slot />
  </router-link>
</template>
