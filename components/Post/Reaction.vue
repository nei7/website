<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";

const props = defineProps<{
  incrementFn: () => void;
  decrementFn: () => void;
  isActive: boolean;
}>();

const onClick = useDebounceFn(
  () => (props.isActive ? props.decrementFn() : props.incrementFn()),
  300
);
</script>

<template>
  <div
    @click="onClick"
    class="sm:py-4 sm:px-6 py-3 px-5 border rounded-3xl cursor-pointer transition ease-in-out active:scale-90"
    :class="isActive ? 'bg-gray-200' : 'bg-[#f8fafc] '"
  >
    <slot></slot>
  </div>
</template>
