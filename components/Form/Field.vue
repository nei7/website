<script setup lang="ts">
defineProps<{
  label?: string;
  required?: boolean;
}>();

const id = uid();
provide("uid", id);
</script>
<template>
  <div class="mt-5">
    <label v-if="label" :for="id" class="text-slate-800 font-medium">
      {{ label }} <span v-if="required" class="text-red-600">*</span></label
    >
    <slot></slot>
  </div>
</template>
