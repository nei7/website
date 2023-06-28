<template>
  <Transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div class="relative z-50 transition-opacity" v-if="isOpen">
      <div
        class="fixed inset-0 bg-gray-200/75 dark:bg-gray-800/75 blur-xl"
      ></div>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex justify-center mt-32 p-4 sm:p-0">
          <div
            class="bg-white py-2 rounded-2xl w-full max-w-2xl"
            ref="commandPalleteRef"
          >
            <div class="pb-1 border-b px-5">
              <Input
                placeholder="Search..."
                class="roundex-2xl"
                :icon="MagnifyingGlassIcon"
                size="md"
                transparent
              ></Input>
            </div>

            <div class="px-5">
              <ul class="gap-y-5 mt-3">
                <CommandPaletteItem title="Home page" description="dwdwdwdw" />
                <CommandPaletteItem title="Home page" description="dwdwdwdw" />
                <CommandPaletteItem title="Home page" description="dwdwdwdw" />
              </ul>
            </div>
          </div>
        </div>
      </div></div
  ></Transition>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { onClickOutside, useEventListener } from "@vueuse/core";

defineProps<{
  items: {
    title: string;
    description: string;
  }[];
}>();

const isOpen = ref(false);

const commandPalleteRef = ref<HTMLElement>();

onClickOutside(commandPalleteRef, () => {
  isOpen.value = false;
});

onMounted(() => {
  useEventListener(window, "keydown", (e) => {
    switch (e.key) {
      case "/":
        isOpen.value = true;
        break;
      case "Escape":
        isOpen.value = false;
        break;
    }
  });
});
</script>
