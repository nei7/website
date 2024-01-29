<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  to: string;
}>();

const isExternal = computed(() => props.to.startsWith("http"));
</script>

<template>
  <a v-if="isExternal" v-bind="$attrs" target="_blank" :href="to" class="text-indigo-600 transition-colors duration-500">
    <slot />
  </a>
  <router-link v-else v-bind="$props" class="text-indigo-600 transition-colors duration-500">
    <slot />
  </router-link>
</template>
