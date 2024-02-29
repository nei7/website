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
          <div ref="commandPalleteRef" class="bg-white py-2 rounded-3xl w-full max-w-2xl drop-shadow-2xl px-1">
            <div class="pb-1 border-b px-5">
              <Input
                ref="inputRef"
                v-model="input"
                placeholder="Search..."
                class="roundex-2xl"
                :icon="MagnifyingGlassIcon"
                size="sm"
                transparent
              ></Input>
            </div>

            <div id="command-items" class="sm:h-full lg:h-80 overflow-y-scroll mt-1">
              <div v-if="input.length === 0 || searchItems.length > 0" class="px-3">
                <ul class="gap-5 mt-3">
                  <CommandPaletteItem
                    v-for="(item, i) in searchItems"
                    :key="i"
                    :title="item.title"
                    :description="item.description"
                    :active="selectedIndex === i"
                    @click="onItemSelected(i)"
                  >
                    <p class="font-bold text-slate-800 text-lg">{{ item.title }}</p>
                    <p class="text-slate-600 text-sm">{{ item.description }}</p>
                  </CommandPaletteItem>
                </ul>
              </div>
              <div v-else class="h-full flex items-center justify-center">
                <div>
                  <MagnifyingGlassIcon class="w-6 h-6 mx-auto mb-2 text-slate-500"></MagnifyingGlassIcon>
                  <p>Not found any item</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></Transition
  >
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { onClickOutside, useEventListener } from "@vueuse/core";
import Input from "../Input.vue";

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

watch(router.currentRoute, () => findItem());

watch(
  () => props.modelValue,
  (status) => {
    if (status) {
      document.body.style.overflowY = "hidden";

      // setTimeout(() => {
      //   const el = inputRef.value?.$el;
      //   if (el) (el.children[0] as HTMLInputElement).focus();
      // });
    } else document.body.style.overflowY = "auto";
  }
);

const findItem = () => {
  const itemIdx = props.items.findIndex((item) => item.href === router.currentRoute.value.path);
  if (itemIdx) selectedIndex.value = itemIdx;
};

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

<style>
#command-items::-webkit-scrollbar {
  width: 5px;
}

#command-items::-webkit-scrollbar-track {
  background: white;
}

#command-items::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 10px;
}
</style>
