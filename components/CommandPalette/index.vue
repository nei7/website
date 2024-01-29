<template>
  <Transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="modelValue" class="relative z-[60] transition-opacity">
      <div class="fixed inset-0 bg-gray-200/75 dark:bg-gray-800/75 blur-xl"></div>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex justify-center mt-20 sm:mt-32 p-4 sm:p-0">
          <div ref="commandPalleteRef" class="bg-white py-2 rounded-xl w-full max-w-xl drop-shadow-2xl">
            <div class="pb-1 border-b px-5">
              <Input
                ref="inputRef"
                v-model="input"
                placeholder="Search..."
                class="roundex-2xl"
                :icon="MagnifyingGlassIcon"
                size="md"
                transparent
              ></Input>
            </div>

            <div v-if="input.length === 0 || searchItems.length > 0" class="px-3">
              <ul class="gap-5 mt-3">
                <CommandPaletteItem
                  v-for="(item, i) in searchItems"
                  :key="i"
                  :title="item.title"
                  :description="item.description"
                  :active="selectedIndex === i"
                  @click="onItemSelected(i)"
                />
              </ul>
            </div>
            <div v-else></div>
          </div>
        </div>
      </div></div
  ></Transition>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { onClickOutside, useEventListener } from "@vueuse/core";
import Input from "../Form/Input.vue";

const props = defineProps<{
  items: {
    title: string;
    description: string;
    href: string;
  }[];
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const commandPalleteRef = ref<HTMLElement>();
const inputRef = ref<InstanceType<typeof Input> | null>();
const selectedIndex = ref(0);
const input = ref("");
const router = useRouter();

onClickOutside(commandPalleteRef, () => emit("update:modelValue", false));

watch(
  () => props.modelValue,
  (status) => {
    if (status) {
      // setTimeout(() => {
      //   const el = inputRef.value?.$el;
      //   if (el) (el.children[0] as HTMLInputElement).focus();
      // });
    }
  }
);

onMounted(() => {
  useEventListener(window, "keydown", (e) => {
    switch (e.key) {
      case "Escape":
        emit("update:modelValue", false);
        break;

      case "ArrowUp":
        e.preventDefault();
        if (selectedIndex.value === 0) selectedIndex.value = props.items.length - 1;
        else selectedIndex.value = selectedIndex.value - 1;
        break;

      case "ArrowDown":
        e.preventDefault();
        if (selectedIndex.value === props.items.length - 1) selectedIndex.value = 0;
        else selectedIndex.value = selectedIndex.value + 1;
        break;

      case "Enter":
        e.preventDefault();
        onItemSelected(selectedIndex.value);
    }
  });
});

const onItemSelected = (index: number) => {
  const item = searchItems.value[index];
  if (item) {
    emit("update:modelValue", false);
    router.push(item.href);
  }
};

const searchItems = computed(() => {
  return props.items.filter((item) => item.title.toLowerCase().includes(input.value.toLowerCase()));
});
</script>
