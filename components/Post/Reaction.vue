<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import useUser from "~/composables/useUser";

const props = defineProps<{
  incrementFn: () => void;
  decrementFn: () => void;
  isActive: boolean;
}>();

const { data: user } = useUser();

const onClick = useDebounceFn(() => user.value.userId && (props.isActive ? props.decrementFn() : props.incrementFn()), 300);
</script>

<template>
  <div
    class="py-3 px-4 text-sm sm:text-base bg-white rounded-full cursor-pointer transition ease-in-out active:scale-90 text-slate-600"
    :class="isActive ? 'bg-gray-100' : ''"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>
