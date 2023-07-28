<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { useAppStore } from "~/stores";

const props = defineProps<{
  incrementFn: () => void;
  decrementFn: () => void;
  isActive: boolean;
}>();

const user = useSupabaseUser();
const store = useAppStore();

const onClick = useDebounceFn(
  () =>
    user.value
      ? props.isActive
        ? props.decrementFn()
        : props.incrementFn()
      : store.setAuthDialog(user !== null),
  300
);
</script>

<template>
  <div
    @click="onClick"
    class="sm:py-4 sm:px-6 py-3 px-5 border rounded-3xl cursor-pointer transition ease-in-out active:scale-90"
    :class="isActive ? 'bg-gray-100' : ''"
  >
    <slot></slot>
  </div>
</template>
