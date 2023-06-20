<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import { inject, onMounted, reactive, ref, watchEffect, type Ref } from "vue";

const scrollRef = inject<Ref<HTMLDivElement>>("scrollRef");
const cordinates = reactive({ x: 0, y: 0 });
const x = ref(0),
  y = ref(0);

const onMouseMove = (e: MouseEvent) => {
  x.value = e.clientX;
  y.value = e.clientY;
};

onMounted(() => {
  scrollRef?.value.addEventListener("mousemove", onMouseMove);
});

const cursorScale = ref(20);

const isVisible = ref(true);

useEventListener("mousedown", (e) => {
  if (e.button === 0) {
    cursorScale.value = 10;
  }
});

useEventListener("mouseup", (e) => {
  cursorScale.value = 20;
});

watchEffect(() => {
  let frame: number;
  if (process.client) {
    const animate = () => {
      frame = requestAnimationFrame(animate);
      cordinates.x = x.value;
      cordinates.y = y.value;
    };

    animate();
  }

  return () => {
    cancelAnimationFrame(frame);
  };
});
</script>

<template>
  <div
    class="fixed z-50 transition-all ease-out duration-700 pointer-events-none hidden sm:block"
    :style="{
      transform: `translateX(${cordinates.x}px) translateY(${cordinates.y}px) translateZ(0) translate3d(0, 0, 0)`,
    }"
  >
    <Transition
      enter-active-class="duration-300 ease-out "
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-show="isVisible"
        :style="{ padding: cursorScale + 'px' }"
        class="border-[0.1rem] border-blue-900 rounded-full transition-all duration-200 transform -translate-x-1/2 -translate-y-1/2"
      ></div
    ></Transition>
  </div>
</template>
