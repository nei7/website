<script setup lang="ts">
import { inject } from "vue";

const isOpen = inject("isOpen");
</script>

<template>
  <div @click="isOpen = !isOpen">
    <slot></slot>
  </div>
</template>
