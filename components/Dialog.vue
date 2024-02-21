<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { type Component } from "vue-demi";

const props = defineProps<{
  modelValue: boolean;
  icon?: Component;
  color?: "";
}>();

defineOptions({
  inheritAttrs: false
});

const emit = defineEmits(["update:modelValue"]);

const dialogRef = ref<HTMLDivElement>();

onClickOutside(dialogRef, () => emit("update:modelValue", false));

watch(
  () => props.modelValue,
  (isOpen) => (isOpen ? (document.body.style.overflowY = "hidden") : (document.body.style.overflowY = "auto"))
);
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
        v-if="modelValue"
        class="fixed inset-0 backdrop-blur-xl bg-white bg-opacity-30 transition-opacity z-[60]"
        @click="$emit('update:modelValue', false)"
      ></div>
    </Transition>

    <div v-if="modelValue" class="z-[70] fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
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
