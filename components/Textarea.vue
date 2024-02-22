<script setup lang="ts">
const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const onInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <textarea
    class="p-4 text-sm focus-visible:outline-none w-full rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
    @input="onInput"
  ></textarea>
</template>
