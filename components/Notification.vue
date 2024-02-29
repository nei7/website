<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import type { Icon } from "~/types/icon";
import { useTimer } from "#imports";

const props = defineProps<{
  id: string;
  icon?: Icon;
  iconClass?: string;
  text: string;
  timeout?: number;
}>();

const { remove } = useToast();

let timer: ReturnType<typeof useTimer> | null = null;

onMounted(() => {
  if (!props.timeout) return;

  timer = useTimer(() => {
    timer?.stop();
    remove(props.id);
  }, props.timeout);
});

onUnmounted(() => timer?.stop());

function onMouseover() {
  if (timer) {
    timer.pause();
  }
}

function onMouseleave() {
  if (timer) {
    timer.resume();
  }
}
</script>

<template>
  <div
    class="min-w-64 max-w-md flex items-center p-2 border rounded-3xl shadow-lg bg-white"
    @mouseover="onMouseover"
    @mouseleave="onMouseleave"
  >
    <div class="mx-3">
      <icon :class="iconClass"></icon>
    </div>

    <div class="flex-1 text-slate-700 mr-2">
      <p>{{ text }}</p>
    </div>

    <div class="p-1 hover:bg-slate-50 rounded-xl cursor-pointer" @click="remove(id)">
      <XMarkIcon class="w-5 h-5"></XMarkIcon>
    </div>
  </div>
</template>
