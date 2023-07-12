<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { FunctionalComponent } from "nuxt/dist/app/compat/capi";

defineProps<{
  open: boolean;
  icon?: FunctionalComponent;
  color?: "";
}>();

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits(["close"]);

const dialogRef = ref<HTMLDivElement>();

onClickOutside(dialogRef, () => emit("close", false));
</script>

<template>
  <Teleport to="body">
    <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->

    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        @click="$emit('close', false)"
        v-if="open"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[60]"
      ></div>
    </Transition>

    <div class="z-[70] fixed inset-0 overflow-y-auto" v-if="open">
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
            class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
            v-bind="$attrs"
            ref="dialogRef"
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
