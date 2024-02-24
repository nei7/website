<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import ui from "./Input.ui";

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

const model = defineModel<string>();

const inputClass = twMerge(ui.sizes[props.size], props.icon && "ps-10", "", !props.transparent && ui.transparent);
</script>

<template>
  <div class="relative">
    <input
      :id="id"
      v-model="model"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="inputClass"
      class="relative block rounded-3xl w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 placeholder-gray-400 text-gray-900"
      :type="type"
    />
    <span v-if="icon" class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2.5">
      <component :is="icon" class="w-5 h-5 text-gray-400"></component>
    </span>
  </div>
</template>
