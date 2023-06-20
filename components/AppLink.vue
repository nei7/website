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
    class="border-b border-[rgba(125,125,125,.6)] text-white hover:border-gray-200 transition-colors duration-500 border-dashed"
  >
    <slot />
  </a>
  <router-link
    v-else
    v-bind="$props"
    class="border-b border-[rgba(125,125,125,.6)] text-white hover:border-gray-200 transition-colors duration-500 border-dashed"
  >
    <slot />
  </router-link>
</template>
