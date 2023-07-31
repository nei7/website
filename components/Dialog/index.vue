<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { FunctionalComponent } from "nuxt/dist/app/compat/capi";

defineProps<{
  open: boolean;
  icon?: FunctionalComponent;
  color?: "";
}>();

defineOptions({
  inheritAttrs: false
});

const emit = defineEmits(["close"]);

const dialogRef = ref<HTMLDivElement>();

onClickOutside(dialogRef, () => emit("close", false));
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[60]"
        @click="$emit('close', false)"
      ></div>
    </Transition>

    <div v-if="open" class="z-[70] fixed inset-0 overflow-y-auto">
      <div
        class="flex min-h-full justify-center p-4 text-center items-center sm:p-0"
      >
        <Transition
          appear
          enter-active-class="duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="duration-100 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-bind="$attrs"
            ref="dialogRef"
            class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
          >
            <div class="bg-white p-4">
              <div
                v-if="icon"
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <component :is="icon"></component>
              </div>
              <div class="text-center sm:text-left">
                <slot></slot>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>
