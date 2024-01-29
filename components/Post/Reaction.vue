<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { useAppStore } from "~/stores";
import { useUser } from "~/stores/user";

const props = defineProps<{
  incrementFn: () => void;
  decrementFn: () => void;
  isActive: boolean;
}>();

const user = useUser();
const store = useAppStore();

const onClick = useDebounceFn(
  () => (user.isAuthenticated ? (props.isActive ? props.decrementFn() : props.incrementFn()) : store.setAuthDialog(user !== null)),
  300
);
</script>

<template>
  <div
    class="sm:py-4 sm:px-6 py-3 px-5 bg-white rounded-full cursor-pointer transition ease-in-out active:scale-90 text-slate-600"
    :class="isActive ? 'bg-gray-100' : ''"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>
