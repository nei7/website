<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import ui from './Input.ui'


const props = withDefaults(
  defineProps<{
    id?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    icon?: any;
    size: keyof typeof ui.sizes;
    transparent?: boolean;
    disabled?: boolean;
  }>(),
  {
    size: "sm"
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const onInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const inputClass = twMerge(
  ui.sizes[props.size],
  props.icon ? "ps-10" : "",
  props.transparent ? "" : "ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500 shadow-sm"
);
</script>

<template>
  <div class="relative">
    <input :id="id" :disabled="disabled" :placeholder="placeholder" :class="inputClass"
      class="relative block rounded-3xl w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 placeholder-gray-400 text-gray-900"
      :type="type" @input="onInput" />
    <span v-if="icon" class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2.5">
      <component :is="icon" class="w-5 h-5 text-gray-400"></component>
    </span>
  </div>
</template>
