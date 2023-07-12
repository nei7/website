<script setup lang="ts">
const props = defineProps<{
  type: "danger" | "warning" | "info";
}>();

const color = {
  danger: "text-red-800 bg-red-100",
  warning: "text-blue-800 bg-blue-100",
  info: "text-yellow-800 text-yellow-100",
};
</script>

<template>
  <div
    class="p-4 mb-4 text-sm rounded-lg"
    role="alert"
    :class="color[props.type]"
  >
    <slot></slot>
  </div>
</template>
