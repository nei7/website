<script setup lang="ts">
import { inject } from "vue";

const isOpen = inject("isOpen");
</script>

<template>
  <transition
    enter-active-class="transition ease-out duration-100"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-75"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div
      v-if="isOpen"
      class="absolute right-0 w-max min-w-[8rem] z-10 mt-2 origin-top-right rounded-md bg-white ring-1 ring-gray-100 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <ul class="cursor-pointer">
          <slot></slot>
        </ul>
      </div>
    </div>
  </transition>
</template>
