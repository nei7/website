<script setup lang="ts">
import { ref, provide } from "vue";
import { onClickOutside } from "@vueuse/core";

const isOpen = ref(false);
const target = ref<HTMLElement>();

provide("isOpen", isOpen);

onClickOutside(target, () => (isOpen.value = false));
</script>

<template>
  <div ref="target" class="relative inline-block text-left">
    <slot></slot>
  </div>
</template>
